import * as React from "react";
import { Tag } from "antd";
import http from "../../api";

export default class Tab extends React.Component<any, any> {
  public static async getInitialProps() {
    const res = await http.get("/admin/getTags");
    return { tags: res.data.tags };
  }

  public render() {
    console.log(this.props.tags);
    const { tags } = this.props;

    return (
      <div>
        {tags.map((tag: any) => (
          <Tag key={tag._id}>{tag.tagName}</Tag>
        ))}
      </div>
    );
export default class IApp extends React.Component<any, any> {
  public render() {
    return <div>3</div>;
  }
}
