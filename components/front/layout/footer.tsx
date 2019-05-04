import { Divider, Icon } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface FooterProps {
  style: React.CSSProperties;
}

const Footer: React.FunctionComponent<FooterProps> = ({ style }) => {
  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #ededed"
        }}
      >
        <div>@{dayjs().format("YYYY")}</div>
        <Divider type="vertical" />
        <Icon type="github" style={{ cursor: "pointer" }} />
        <Divider type="vertical" />
        <Icon type="wechat" style={{ cursor: "pointer" }} />
        <Divider type="vertical" />
        博客总访问量：12121212次
      </div>
    </div>
  );
};

export default Footer;
