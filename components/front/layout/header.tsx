import React from "react";
import Link from "next/link";
import { Col, Row } from "antd";
import { withRouter, WithRouterProps } from "next/router";
import { Tag } from "interfaces";

interface HeaderProps extends WithRouterProps {
  tags: Tag[];
  style: React.CSSProperties;
}

const ROUTES: { [key: string]: string } = {
  首页: "home",
  技术: "technology",
  随笔: "diary",
  关于: "about"
};

const Header = ({ router, tags, style }: HeaderProps) => {
  return (
    <div style={style}>
      <div style={{ fontSize: "60px", color: "#7d7d7d", fontWeight: 600 }}>
        RMCHEN
      </div>
      <Row type="flex" justify="end">
        {tags.map((v, index) => (
          <Col span={2} style={{ cursor: "pointer" }} key={index}>
            <Link href={ROUTES[v.tagName]}>
              <a
                style={{
                  fontSize: "20px",
                  color: RegExp(ROUTES[v.tagName]).test(router!.pathname)
                    ? "#4682B4"
                    : "#7d7d7d"
                }}
              >
                {v.tagName}
              </a>
            </Link>
          </Col>
        ))}
      </Row>
      <style>
        {`
          a{
            color: #7d7d7d;
          }
          a:hover{
            color: #4682B4;
          }
        `}
      </style>
    </div>
  );
};

export default withRouter(Header);
