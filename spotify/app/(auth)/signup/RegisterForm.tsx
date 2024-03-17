"use client";
import Link from "next/link";
import React, { useState } from "react";
import EnterPassword from "./EnterPassword";
import EnterEmail from "./EnterEmail";
const RegisterForm = () => {
  const [Step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeStep = (givenStep: "email" | "password") => {
    setStep(givenStep);
  };

  const components = {
    email: (
      <EnterEmail changeStep={changeStep} email={email} setEmail={setEmail} />
    ),
    password: (
      <EnterPassword 
        Password={password}
        ConfirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    ),
  };

  return components[Step];
};

export default RegisterForm;
