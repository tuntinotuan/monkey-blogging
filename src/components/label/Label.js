import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/error";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  user-select: none;
  ${(props) =>
    props.htmlFor !== "" &&
    css`
      cursor: pointer;
    `};
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} className="dark:text-darkTextA0" {...props}>
      {children}
    </LabelStyles>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default withErrorBoundary(Label, {
  FallbackComponent: ErrorFallback,
});
