import { Button } from "components/button";
import { ErrorFallback } from "components/error";
import { ImageAvatar } from "components/image";
import ToggleDarkModeV2 from "components/toggle/ToggleDarkModeV2";
import useDarkMode from "hooks/useDarkMode";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

const DashboardHeader = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <DashboardHeaderStyles className="dark:bg-darkMain">
      <ToggleDarkModeV2
        on={darkMode}
        onClick={() => setDarkMode(!darkMode)}
      ></ToggleDarkModeV2>
      <Button to="/manage/add-post" className="header-button" height="52px">
        Write new post
      </Button>
      <ImageAvatar></ImageAvatar>
    </DashboardHeaderStyles>
  );
};

export default withErrorBoundary(DashboardHeader, {
  FallbackComponent: ErrorFallback,
});
