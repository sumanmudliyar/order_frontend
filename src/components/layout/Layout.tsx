import React from "react";
import { Link } from "react-router-dom";
import * as sharedStyled from "../../style/sharedStyle";

import Header from "../Header/Header";

Header;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <sharedStyled.mainComponent>{children}</sharedStyled.mainComponent>
    </div>
  );
};

export default Layout;
