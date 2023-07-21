import { Button } from "components/button";
import { ErrorFallback } from "components/error";
import { ImageAvatar } from "components/image";
import { InputSearchHeader } from "components/input";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
  {
    url: "/help",
    title: "Help",
  },
];

const HeaderStyles = styled.header`
  padding: 40px 0;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
  }
  .search {
    position: relative;
    margin-left: auto;
    margin-right: 20px;
    padding: 15px 25px;
    border: 1px solid #eee;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
`;

function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </Link>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold"
                      : "dark:text-white dark:font-thin"
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <InputSearchHeader></InputSearchHeader>
          {!userInfo ? (
            <Button style={{ maxWidth: 150 }} height="56px" to={"/sign-up"}>
              Sign Up
            </Button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="dark:text-white">Welcome to, </span>
              <strong className="text-primary">
                {getLastName(userInfo?.displayName)}
              </strong>
              <ImageAvatar></ImageAvatar>
              <Button height="56px" to="/dashboard">
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default withErrorBoundary(Header, {
  FallbackComponent: ErrorFallback,
});
