import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import { taskAppContext } from "../App";
import { toast } from "react-toastify";
import { CustomLoadingButton } from "./customLoadingButton";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { serverUrl } = useContext(taskAppContext);
  const navigate = useNavigate();

  const initialValidationSchema = {
    managerName: yup.string().required(),
    mobile: yup.string().min(10).required(),
    email: yup.string().min(8).email().required(),
    shopName: yup.string().min(2).required(),
    shopAddress: yup.string().min(10).required(),
    password: yup.string().min(8).required(),
    cpassword: yup
      .string()
      .min(8)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords not matched"),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        managerName: "",
        mobile: "",
        email: "",
        shopName: "",
        shopAddress: "",
        password: "",
        cpassword: "",
      },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => signup(values),
    });

  async function signup(values) {
    setIsLoading(true);
    const response = await fetch(`${serverUrl}/shop/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    // console.log("signup response ", response);
    const data = await response.json();
    setIsLoading(false);
    // console.log("signup response data", data);
    data.message ===
    "shop User Created, use the Activation link Sent on mail for Activation"
      ? toast.success(data.message)
      : toast.error(data.message);
  }
  return (
    <>
      <div className="signup-form-container">
        <h2 className="text-center title-small">Shop Registration</h2>
        <form onSubmit={handleSubmit} className="form signup-form">
          <TextField
            id="managerName"
            type="text"
            label="manager Name"
            name="managerName"
            value={values.managerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.managerName && Boolean(errors.managerName)}
            helperText={
              touched.managerName && errors.managerName
                ? errors.managerName
                : null
            }
          />
          <TextField
            id="mobile"
            type="text"
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobile && Boolean(errors.mobile)}
            helperText={touched.mobile && errors.mobile ? errors.mobile : null}
          />
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
            id="shopName"
            type="text"
            label="shopName"
            name="shopName"
            value={values.shopName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.shopName && Boolean(errors.shopName)}
            helperText={
              touched.shopName && errors.shopName ? errors.shopName : null
            }
          />
          <TextField
            multiline
            id="shopAddress"
            label="shop Address"
            type="shopAddress"
            name="shopAddress"
            value={values.shopAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.shopAddress && Boolean(errors.shopAddress)}
            helperText={
              touched.shopAddress && errors.shopAddress
                ? errors.shopAddress
                : null
            }
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
          <TextField
            id="cpassword"
            label="Confirm Password"
            type="password"
            name="cpassword"
            value={values.cpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.cpassword && Boolean(errors.cpassword)}
            helperText={
              touched.cpassword && errors.cpassword ? errors.cpassword : null
            }
          />

          <CustomLoadingButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            buttonComponent={
              <Button type="submit" variant="contained">
                Signup
              </Button>
            }
          />

          <div className="form-menus d-flex justify-content-between">
            <button
              className="text-danger bg-transparent"
              onClick={() => navigate("/login")}
            >
              Already Have Account?
            </button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(errors)}</pre> */}
      </div>
    </>
  );
}

export { SignupForm };
