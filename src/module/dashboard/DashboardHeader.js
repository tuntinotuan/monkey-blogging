import { Button } from "components/button";
import { ErrorFallback } from "components/error";
import ToggleDarkModeV2 from "components/toggle/ToggleDarkModeV2";
import { useAuth } from "contexts/auth-context";
import useDarkMode from "hooks/useDarkMode";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { imageSunflower } from "utils/constants";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
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
      <NavLink to="/profile" className="header-avatar">
        <img src={userInfo?.avatar || imageSunflower} alt="" />
      </NavLink>
    </DashboardHeaderStyles>
  );
};

export default withErrorBoundary(DashboardHeader, {
  FallbackComponent: ErrorFallback,
});
