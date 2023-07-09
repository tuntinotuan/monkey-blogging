import Heading from "components/layout/Heading";
import React from "react";
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

export default DashboardMainItem;
