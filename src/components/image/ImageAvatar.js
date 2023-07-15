import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { imageSunflower } from "utils/constants";

const ImageAvatarStyles = styled.div`
  .header-avatar {
    display: block;
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

const ImageAvatar = ({ to = "/profile" }) => {
  const { userInfo } = useAuth();
  return (
    <ImageAvatarStyles>
      <NavLink to={to} className="header-avatar">
        <img
          src={userInfo?.avatar || imageSunflower}
          alt={userInfo?.avatar}
          className="border dark:border-gray-800"
        />
      </NavLink>
    </ImageAvatarStyles>
  );
};

export default ImageAvatar;
