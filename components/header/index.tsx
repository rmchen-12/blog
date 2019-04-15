import * as React from "react";
import header from "./index.less";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = props => {
  return <div className={header.container}>header</div>;
};

export default Header;
