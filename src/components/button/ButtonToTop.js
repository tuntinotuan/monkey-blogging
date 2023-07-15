import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/error";

const ButtonToTopStyles = styled.button`
  position: fixed;
  visibility: hidden;
  opacity: 0;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100rem;
  background-color: white;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in;
  ${(props) =>
    props.kind === "primary" &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  ${(props) =>
    props.offset >= 500 &&
    css`
      visibility: visible;
      opacity: 1;
    `};
`;

const ButtonToTop = ({ type, kind, ...props }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleScrollToTop = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  if (typeof document === "undefined")
    return <ButtonToTopStyles></ButtonToTopStyles>;
  return ReactDOM.createPortal(
    <ButtonToTopStyles
      type={type}
      kind={kind}
      offset={offset}
      onClick={handleScrollToTop}
      {...props}
    >
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.42382 0.332554L0.773825 5.99538C0.680097 6.08839 0.605703 6.19905 0.554934 6.32097C0.504166 6.44289 0.478027 6.57366 0.478027 6.70574C0.478027 6.83782 0.504166 6.96859 0.554934 7.09051C0.605703 7.21243 0.680097 7.32308 0.773825 7.41609C0.961188 7.60244 1.21464 7.70703 1.47882 7.70703C1.74301 7.70703 1.99646 7.60244 2.18382 7.41609L7.18382 2.46362L12.1338 7.41609C12.3212 7.60244 12.5746 7.70703 12.8388 7.70703C13.103 7.70703 13.3565 7.60244 13.5438 7.41609C13.6383 7.32343 13.7135 7.21293 13.765 7.091C13.8165 6.96906 13.8433 6.83811 13.8438 6.70574C13.8433 6.57337 13.8165 6.44242 13.765 6.32048C13.7135 6.19854 13.6383 6.08804 13.5438 5.99538L7.89382 0.332554C7.80018 0.230998 7.68652 0.149949 7.56003 0.094514C7.43353 0.0390793 7.29692 0.01046 7.15882 0.01046C7.02072 0.01046 6.88411 0.0390793 6.75761 0.094514C6.63111 0.149949 6.51746 0.230998 6.42382 0.332554Z"
          fill={`${kind === "primary" ? "#fff" : "#84878B"}`}
        />
      </svg>
    </ButtonToTopStyles>,
    document.querySelector("body")
  );
};

ButtonToTop.propTypes = {
  type: PropTypes.string,
  kind: PropTypes.string,
};

ButtonToTop.defaultProps = {
  type: "button",
  kind: "default",
};

export default withErrorBoundary(ButtonToTop, {
  FallbackComponent: ErrorFallback,
});
