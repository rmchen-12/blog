import * as React from "react";
import { Row, Col } from "antd";
import Link from "next/link";

interface HeaderProps {}

const ROUTES: { [key: string]: string } = {
  home: "首页",
  technology: "技术",
  diary: "随笔",
  about: "关于"
};

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div>
      <Row>
        {Object.keys(ROUTES).map(v => (
          <Col span={4} style={{ cursor: "pointer" }} key={v}>
            <Link href={v} as={v}>
              <a>{ROUTES[v]}</a>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Header;
