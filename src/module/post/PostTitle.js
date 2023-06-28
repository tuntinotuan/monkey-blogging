import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyles = styled.div`
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;

const PostTitle = ({ children, className = "", size = "normal", to = "" }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <Link to={`/${to}`}>{children}</Link>
    </PostTitleStyles>
  );
};

export default PostTitle;
