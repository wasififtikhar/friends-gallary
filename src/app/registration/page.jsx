"use client";
import Link from "next/link";
import { fetchApiRegisterUser } from "../redux/slice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../helpers/common-functions";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";

const Registration = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      user_name: ``,
      email: ``,
      password: ``,
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required(`Username Required`),
      email: Yup.string()
        .email(`Invalid Email Address`)
        .required(`Email Address Required`),
      password: Yup.string().required(`Password Required`),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    dispatch(fetchApiRegisterUser(values))
      .then(unwrapResult)
      .then((response) => {
        console.log("LOGIN RESPONSE", response);
        showSuccessToastMessage(response.message ?? "");
        router.push("/login");
      })
      .catch((error) => {
        showErrorToastMessage(error.message);
      });
  };

  return (
    <>
      <div id="login">
        <h1>Register Your Account</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          {formik.touched.user_name && formik.errors.user_name && (
            <p
              style={{
                margin: "3px 0px",
                color: `red`,
                fontWeight: `lighter`,
                fontSize: `14px`,
              }}
            >
              *{formik.errors.user_name}
            </p>
          )}
          <input
            className="auth-from"
            maxLength="25"
            placeholder="Username"
            type="text"
            {...formik.getFieldProps(`user_name`)}
          />

          {formik.touched.email && formik.errors.email && (
            <p
              style={{
                margin: "3px 0px",
                color: `red`,
                fontWeight: `lighter`,
                fontSize: `14px`,
              }}
            >
              *{formik.errors.email}
            </p>
          )}
          <input
            className="auth-from"
            maxLength="25"
            placeholder="Email"
            type="email"
            {...formik.getFieldProps(`email`)}
          />

          {formik.touched.password && formik.errors.password && (
            <p
              style={{
                margin: "3px 0px",
                color: `red`,
                fontWeight: `lighter`,
                fontSize: `14px`,
              }}
            >
              *{formik.errors.password}
            </p>
          )}
          <input
            className="auth-from"
            autoComplete="off"
            placeholder="Password"
            type="password"
            {...formik.getFieldProps(`password`)}
          />
          <input type="submit" value="Register" />
          <p className="register">
            Go to <Link href={"/login"}>Login Now</Link>{" "}
          </p>
        </form>
        <Button
          variant="contained"
          style={{ backgroundColor: `black`, margin: `30px` }}
          onClick={() => router.push("/")}
        >
          GO TO HOME
        </Button>
      </div>
    </>
  );
};

export default Registration;
