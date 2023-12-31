import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { taskAppContext } from "../App";
import { CustomLoadingButton } from "./customLoadingButton";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { serverUrl, setUserInfo } = useContext(taskAppContext);
  const navigate = useNavigate();
  const initialValidationSchema = {
    email: yup.string().min(8).email(),
    password: yup.string().min(8),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => login(values),
    });

  const login = async (values) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${serverUrl}/shop/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        toast.success(data.message);
        navigate(data.isOperator ? "/operator" : "/shop");
        setUserInfo({
          name: data.userInfo.name,
          shopName: data.userInfo.shopName,
          role: data.isOperator ? "operator" : "shop",
        });
      } else {
        const data = await response.json();
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="login-form-container">
        <h2 className="text-center title-small">Login</h2>
        <form onSubmit={handleSubmit} className="form login-form">
          <TextField
            id="email"
            type="text"
            label="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />

          <CustomLoadingButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            buttonComponent={
              <Button type="submit" variant="contained">
                Login
              </Button>
            }
          />
          <div className="form-menus d-flex justify-content-between">
            <button
              className="text-danger bg-transparent"
              onClick={() => navigate("forgot")}
            >
              Forgot password?
            </button>
            <button
              className="text-primary bg-transparent"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="demo-login-buttons d-flex justify-content-between">
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={() =>
                login({ email: "operator1@gmail.com", password: "12345678" })
              }
            >
              Operator1
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() =>
                login({ email: "sivaraj2siva@gmail.com", password: "12345678" })
              }
            >
              Shop
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export { LoginForm };
