import * as React from "react";
import AppContent from "./content";
import AppFooter from "./footer";
import AppHeader from "./header";
import AppSider from "./sider";
import { Col, Layout, Row } from "antd";
import { Tag } from "pages/_app";

interface AppLayoutProps {
  tags: Tag[];
}

const { Header, Footer, Content } = Layout;

export default class AppLayout extends React.Component<AppLayoutProps, any> {
  public render() {
    const { children, tags } = this.props;
    return (
      <Layout>
        <AppHeader tags={tags} />

        <Content
          style={{
            minHeight: "calc(100vh - 100px)"
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

        <Footer
          style={{
            height: 50,
            background: "rgb(122,122,122)"
          }}
        >
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}
