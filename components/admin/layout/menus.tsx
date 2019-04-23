import * as React from "react";
import { Menu, Icon } from "antd";
import Router from "next/router";

const MENUS = [
  {
    name: "添加标签",
    key: "tag",
    icon: <Icon type="user" />
  },
  {
    name: "新建文章",
    key: "newArticle",
    icon: <Icon type="upload" />
  },
  {
    name: "文章管理",
    key: "articleManager",
    icon: <Icon type="video-camera" />
  }
];

class Menus extends React.PureComponent<object, any> {
  public componentDidMount() {
    MENUS.forEach(v => {
      Router.prefetch(`/${v.key}`);
    });
  }

  public onMenuClick = ({ key }: { key: string }) =>
    Router.push(`/admin/${key}`);

  public render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["tag"]}
        onClick={this.onMenuClick}
      >
        {MENUS.map(v => (
          <Menu.Item key={v.key}>
            {v.icon}
            <span>{v.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default Menus;
