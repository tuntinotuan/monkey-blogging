import React, { Fragment, useState } from "react";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "components/icon";

const InputPasswordToggle = ({ control, ...props }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <Fragment>
      <Input
        name="password"
        type={togglePassword ? "text" : "password"}
        placeholder="Please enter your password"
        control={control}
        {...props}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
