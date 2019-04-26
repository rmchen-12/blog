import  React from "react";

interface FooterProps {
  style: React.CSSProperties;
}

const Footer: React.FunctionComponent<FooterProps> = ({ style }) => {
  return <div style={style}>footer</div>;
};

export default Footer;
