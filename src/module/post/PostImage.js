import { ErrorFallback } from "components/error";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    border: 1px solid ${(props) => props.theme.grayLight};
  }
`;

const PostImage = ({ url = "", alt = "unsplash", className = "", to = "" }) => {
  if (to)
    return (
      <PostImageStyles className={`post-image ${className}`}>
        <Link to={`/${to}`} className="rounded-2xl">
          <img src={url} alt={alt} />
        </Link>
      </PostImageStyles>
    );
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={url} alt={alt} />
    </PostImageStyles>
  );
};

export default withErrorBoundary(PostImage, {
  FallbackComponent: ErrorFallback,
});
