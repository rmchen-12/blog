import { Col, Layout, Row } from 'antd';
import React from 'react';

import AppContent from './content';
import AppFooter from './footer';
import AppHeader from './header';
import AppSider from './sider';

const { Content } = Layout;

export default class AppLayout extends React.Component<object, object> {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <AppHeader
          style={{
            backgroundColor: "#fff",
            height: "150px"
          }}
        />

        <Content
          style={{ minHeight: "calc(100vh - 200px)", backgroundColor: "#fff" }}
        >
          <Row>
            <Col xl={{ span: 16, offset: 2 }} lg={{ span: 16, offset: 2 }}>
              <AppContent>{children}</AppContent>
            </Col>
            <Col xl={4} lg={4} md={0} sm={0} xs={0}>
              <AppSider />
            </Col>
          </Row>
        </Content>

        <AppFooter
          style={{
            height: "50px",
            backgroundColor: "#fff",
            textAlign: "center",
            lineHeight: "50px"
          }}
        />
      </Layout>
    );
  }
}
