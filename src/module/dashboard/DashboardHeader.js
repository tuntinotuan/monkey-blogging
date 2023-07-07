import { Button } from "components/button";
import ToggleDarkMode from "components/toggle/ToggleDarkMode";
import { useAuth } from "contexts/auth-context";
import useDarkMode from "hooks/useDarkMode";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { imageSunflower } from "utils/constants";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
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
      <ToggleDarkMode
        on={darkMode}
        onClick={() => setDarkMode(!darkMode)}
      ></ToggleDarkMode>
      <Button to="/manage/add-post" className="header-button" height="52px">
        Write new post
      </Button>
      <NavLink to="/profile" className="header-avatar">
        <img src={userInfo?.avatar || imageSunflower} alt="" />
      </NavLink>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
