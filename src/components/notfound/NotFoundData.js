import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const NotFoundDataStyles = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  img {
    ${(props) =>
      props.size === "medium" &&
      css`
        width: 250px;
      `};
  }
  h1 {
    font-size: 70px;
    font-weight: 700;
    color: ${(props) => props.theme.primary};
    ${(props) =>
      props.size === "medium" &&
      css`
        font-size: 42px;
      `};
  }
  p {
    font-size: 22px;
    font-weight: 500;
    ${(props) =>
      props.size === "medium" &&
      css`
        font-size: 14px;
      `};
  }
`;

const NotFoundData = ({ size = "big" }) => {
  return (
    <NotFoundDataStyles size={size}>
      <img srcSet="/universe-notfound.png 2x" alt="" />
      <h1>No results found</h1>
      <div className="dark:text-white text-center">
        <p>We couldn't find what you searched for.</p>
        <p>Try searching again.</p>
      </div>
    </NotFoundDataStyles>
  );
};

NotFoundData.propTypes = {
  size: PropTypes.oneOf(["big", "medium"]).isRequired,
};

export default NotFoundData;
