import React, { useState } from "react";
import AuthenticationPage from "./AuthenticationPage";
import { Field } from "components/field";
import { useForm } from "react-hook-form";
import { Label } from "components/label";
import { Input } from "components/input";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Button } from "components/button";

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm();
  const [togglePassword, setTogglePassword] = useState(false);
  const handleSignIn = async (values) => {
    if (!isValid) return;
  };

  return (
    <AuthenticationPage>
      <form action="" className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            name="email"
            type="email"
            placeholder="Please enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type={togglePassword ? "text" : "password"}
            placeholder="Please enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => setTogglePassword(true)}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={() => setTogglePassword(false)}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <Button
          type="submit"
          style={{
            maxWidth: 250,
            margin: "0 auto",
          }}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
