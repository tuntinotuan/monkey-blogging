import { Button } from "components/button";
import { IconSearch } from "components/icon";
import { useAuth } from "contexts/auth-context";
import { debounce } from "lodash";
import React, { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
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
  const [params] = useSearchParams();
  const keywordSearch = params.get("keyword");
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const SearchKeywordHandler = debounce((e) => {
    if (e.type !== "click" && e.key !== "Enter") return;
    navigate(`/search?keyword=${filter}`);
  }, 500);
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
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
              defaultValue={keywordSearch}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={SearchKeywordHandler}
            />
            <span
              className="search-icon cursor-pointer"
              onClick={SearchKeywordHandler}
            >
              <IconSearch></IconSearch>
            </span>
          </div>
          {!userInfo ? (
            <Button style={{ maxWidth: 150 }} height="56px" to={"/sign-up"}>
              Sign Up
            </Button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>Welcome to, </span>
              <strong className="text-primary">
                {getLastName(userInfo?.displayName)}
              </strong>
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

export default Header;
