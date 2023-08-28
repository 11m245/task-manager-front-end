import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import { taskAppContext } from "../App";
import { toast } from "react-toastify";
import { CustomLoadingButton } from "./customLoadingButton";
import { useNavigate } from "react-router-dom";
import { SelectInput } from "./selectInput";

function AddTaskForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { serverUrl, operators } = useContext(taskAppContext);
  const navigate = useNavigate();
  const options = operators.map((operator) => {
    return { title: operator.name, id: operator._id, value: operator._id };
  });

  console.log("opn", options);

  const initialValidationSchema = {
    description: yup.string().required(),
    assignedUser: yup.string().required(),
    customerName: yup.string().required(),
    customerMobile: yup.string().required(),
  };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      description: "",
      assignedUser: "",
      customerName: "",
      customerMobile: "",
    },
    validationSchema: yup.object(initialValidationSchema),
    onSubmit: () => addTask(values),
  });

  async function addTask(values) {
    // console.log("add task values", values);
    setIsLoading(true);
    const response = await fetch(`${serverUrl}/task/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
      body: JSON.stringify(values),
    });
    // console.log("addTask response ", response);
    const data = await response.json();
    setIsLoading(false);
    console.log("addTask response data", data);
    data.message === "task added"
      ? toast.success(data.message)
      : toast.error(data.message);
    if (data.message === "task added") {
      resetForm();
    }
  }
  return (
    <>
      <div className="add-task-form-container">
        <h2 className="text-center title-small">Create Task</h2>
        <form onSubmit={handleSubmit} className="form add-task-form">
          <TextField
            id="customerName"
            type="text"
            label="Customer Name"
            name="customerName"
            value={values.customerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.customerName && Boolean(errors.customerName)}
            helperText={
              touched.customerName && errors.customerName
                ? errors.customerName
                : null
            }
          />
          <TextField
            id="customerMobile"
            type="text"
            label="Customer Mobile"
            name="customerMobile"
            value={values.customerMobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.customerMobile && Boolean(errors.customerMobile)}
            helperText={
              touched.customerMobile && errors.customerMobile
                ? errors.customerMobile
                : null
            }
          />
          <TextField
            id="description"
            type="text"
            label="Task Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={
              touched.description && errors.description
                ? errors.description
                : null
            }
          />
          <SelectInput
            label="Assigned User"
            name="assignedUser"
            options={options}
            value={values.assignedUser}
            onChange={handleChange}
            error={touched.assignedUser && Boolean(errors.assignedUser)}
            helperText={
              touched.assignedUser && errors.assignedUser
                ? errors.assignedUser
                : null
            }
          />
          <CustomLoadingButton
            isLoading={isLoading}
            buttonComponent={
              <Button type="submit" variant="contained">
                Create Task
              </Button>
            }
          />
        </form>
        {/* <pre>{JSON.stringify(errors)}</pre> */}
      </div>
    </>
  );
}

export { AddTaskForm };
