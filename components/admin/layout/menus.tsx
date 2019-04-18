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
    name: "添加标签",
    key: "2",
    icon: <Icon type="upload" />
  },
  {
    name: "添加标签",
    key: "3",
    icon: <Icon type="video-camera" />
  }
];

const Menus: React.FunctionComponent<any> = () => {
  const onMenuClick = ({ key }: { key: string }) =>
    Router.push(`/admin/${key}`);

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["tag"]}
      onClick={onMenuClick}
    >
      {MENUS.map(v => (
        <Menu.Item key={v.key}>
          {v.icon}
          <span>{v.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Menus;
