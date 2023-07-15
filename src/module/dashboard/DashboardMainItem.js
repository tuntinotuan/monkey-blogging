import { ErrorFallback } from "components/error";
import Heading from "components/layout/Heading";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const DashboardMainItemStyles = styled.div``;

const DashboardMainItem = ({ title = "Any", children, ...props }) => {
  return (
    <DashboardMainItemStyles {...props}>
      <Heading>{title}</Heading>
      <div className="grid-layout mb-10">{children}</div>
    </DashboardMainItemStyles>
  );
};

export default withErrorBoundary(DashboardMainItem, {
  FallbackComponent: ErrorFallback,
});
