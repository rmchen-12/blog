import  React from "react";
import Menus from "./menus";
import { Icon, Layout } from "antd";

const { Header, Sider, Content } = Layout;

export default class AdminLayout extends React.Component<any, any> {
  public state = {
    collapsed: false
  };

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  public render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menus />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
        <style>
          {`
            .trigger {
              font-size: 18px;
              line-height: 64px;
              padding: 0 24px;
              cursor: pointer;
              transition: color .3s;
            }
            .trigger:hover {
              color: #1890ff;
            }
            .logo {
              height: 32px;
              background: rgba(255,255,255,.2);
              margin: 16px;
            }
         `}
        </style>
      </Layout>
    );
  }
}
