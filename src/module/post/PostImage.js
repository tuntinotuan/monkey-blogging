import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

const PostImage = ({
  url = "",
  alt = "unsplash",
  className = "",
  to = null,
}) => {
  if (to)
    return (
      <Link to={to}>
        <PostImageStyles className={`post-image ${className}`}>
          <img src={url} alt={alt} />
        </PostImageStyles>
      </Link>
    );
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={url} alt={alt} />
    </PostImageStyles>
  );
};

export default PostImage;
