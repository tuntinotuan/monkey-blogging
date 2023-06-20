import { Field } from "components/field";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  /* .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  } */
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({});
  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form action="" className="form" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              <IconEyeClose className="input-icon"></IconEyeClose>
            </Input>
          </Field>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
