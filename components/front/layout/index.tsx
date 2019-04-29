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
            padding: "0 100px",
            height: "150px"
          }}
        />

        <Content style={{ minHeight: "calc(100vh - 200px)" }}>
          <Row>
            <Col lg={{ span: 20, offset: 2 }} xl={{ span: 16, offset: 2 }}>
              <AppContent>{children}</AppContent>
            </Col>
            <Col lg={{ span: 0 }} xl={4}>
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
