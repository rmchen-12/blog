import React from "react";
import AppContent from "./content";
import AppFooter from "./footer";
import AppHeader from "./header";
import AppSider from "./sider";
import { Col, Layout, Row } from "antd";

const { Content } = Layout;

export default class AppLayout extends React.Component<object, object> {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <AppHeader
          style={{
            backgroundColor: "#fff",
            padding: "0 100px",
            height: "150px"
          }}
        />

        <Content
          style={{
            minHeight: "calc(100vh - 200px)"
          }}
        >
          <Row>
            <Col xl={16} xxl={{ span: 12, offset: 4 }}>
              <AppContent>{children}</AppContent>
            </Col>
            <Col xl={8} xxl={4}>
              <AppSider />
            </Col>
          </Row>
        </Content>

        <AppFooter
          style={{
            height: 50,
            backgroundColor: "#fff"
          }}
        />
      </Layout>
    );
  }
}
