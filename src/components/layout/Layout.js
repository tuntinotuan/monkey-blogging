import React from "react";
import Header from "./Header";
import { ButtonToTop } from "components/button";

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <ButtonToTop kind="primary"></ButtonToTop>
      {children}
    </div>
  );
};

export default Layout;
