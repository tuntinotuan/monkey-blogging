import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const Textarea = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }
  textarea:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  textarea::-webkit-input-placeholder {
    color: #84878b;
  }
  textarea::-moz-input-placeholder {
    color: #84878b;
  }
`;

const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({ name, control, defaultValue: "" });
  return (
    <Textarea>
      <textarea id={name} type={type} {...field} {...props} />
    </Textarea>
  );
};

export default Input;
