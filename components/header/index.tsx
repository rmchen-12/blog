import * as React from "react";
import { Container, Row, Col } from "react-grid-system";
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
    <Container fluid style={{ height: "auto" }}>
      <Row style={{ height: 50, background: "rgb(199,199,199)" }}>
        <Col />
      </Row>
      <Row style={{ height: 50, background: "#87CEFF" }} align="center">
        <Col lg={6} offset={{ lg: 3 }}>
          <Row>
            {Object.keys(ROUTES).map(v => (
              <Col style={{ cursor: "pointer" }} key={v}>
                <Link href={v} as={v}>
                  <a>{ROUTES[v]}</a>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
