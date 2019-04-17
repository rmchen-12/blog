import * as React from "react";
import { Row, Col } from "react-grid-system";
import RightContainer from "../rightContainer";
import LeftContainer from "../leftContainer";
import Header from "../header";
import Footer from "../footer";

export interface LayoutProps {}

export default class Layout extends React.Component<LayoutProps, any> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <div style={{ minHeight: "calc(100vh - 150px)" }}>
          <Row>
            <Col
              xs={7}
              offset={{ lg: 1 }}
              style={{ borderRight: "1px solid rgb(199,199,199)" }}
            >
              <LeftContainer>{children}</LeftContainer>
            </Col>
            <Col xs={3}>
              <RightContainer />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}
