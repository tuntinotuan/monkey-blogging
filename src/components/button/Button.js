import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${(props) => props.height || "70px"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
      box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.05);
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  &:disabled {
    opacity: 0.5;
    cursor: wait;
    /* pointer-events: none; */
  }
`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {TriggerConfig} type Type of button 'button' | 'submit'
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["secondary", "ghost", "or default is primary"]),
};

export default Button;
