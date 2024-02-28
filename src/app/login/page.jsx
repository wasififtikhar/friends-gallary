"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchApiLoginUser } from "../redux/slice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../helpers/common-functions";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const loginUser = {
      email: email,
      password: password,
    };
    const payload = loginUser;
    setEmail("");
    setPassword("");

    console.log("From login page", payload);

    dispatch(fetchApiLoginUser(payload))
      .then(unwrapResult)
      .then((response) => {
        console.log("RESPONSE", response.message);
        if (response.message == `Crediential Error`) {
          showErrorToastMessage(response.message);
        } else {
          showSuccessToastMessage(response.message ?? "");
          router.push("/apiUsers");
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        showErrorToastMessage(error.message);
      });
  };

  return (
    <>
      <div id="login">
        <h1>Login Your Account</h1>
        <form className="login-form">
          <input
            className="auth-from"
            autoFocus
            maxLength="25"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            value={email}
            required
          />
          <input
            className="auth-from"
            autoComplete="off"
            maxLength="8"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            required
          />
          <input type="submit" value="Log in" onClick={handleSubmit} />
          <p className="register">
            Not a member <Link href="/registration">Register Now</Link>{" "}
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

export default Login;
