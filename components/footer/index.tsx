import * as React from "react";
import { Container, Row, Col } from "react-grid-system";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <Container fluid style={{ height: 50 }}>
      <Row>
        <Col>footer</Col>
      </Row>
    </Container>
  );
};

export default Footer;
