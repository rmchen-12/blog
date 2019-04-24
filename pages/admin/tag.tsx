import * as React from "react";
import http from "api";
import { Button, Input, Popconfirm, Tag } from "antd";
import { notice } from "components/notification";

interface Props {
  tags: string[];
}

const initialState: { tagName: string; tags: string[] } = {
  tagName: "",
  tags: []
};

type State = Readonly<typeof initialState>;

export default class Tags extends React.Component<Props, State> {
  public static async getInitialProps() {
    const res = await http.get("/admin/getTags");
    return { tags: res.data.tags };
  }

  public readonly state: State = initialState;

  public componentDidMount() {
    this.setState({ tags: this.props.tags });
  }

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tagName: e.target.value });
  };

  public refreshTags = async () => {
    const tagsRes = await http.get("/admin/getTags");
    this.setState({ tags: tagsRes.data.tags });
  };

  public createTag = async () => {
    const { tagName } = this.state;
    const res = await http.post("/admin/createTag", { tagName });
    notice(res);
    this.refreshTags();
  };

  public onConfirm = async (id: number) => {
    const res = await http.post("/admin/deleteTag", { id });
    notice(res);
    this.refreshTags();
  };

  public render() {
    const { tags } = this.state;

    return (
      <div>
        {tags &&
          (tags as string[]).map((tag: any) => (
            <Popconfirm
              title={"是否删除该标签"}
              onConfirm={this.onConfirm.bind(this, tag._id)}
              key={tag._id}
            >
              <Tag>{tag.tagName}</Tag>
            </Popconfirm>
          ))}
        <Input
          placeholder="新建标签"
          style={{
            width: 400,
            display: "block",
            margin: "10px 0"
          }}
          onChange={this.handleInputChange}
        />
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          size="small"
          onClick={this.createTag}
        >
          保存
        </Button>
        <Button size="small">取消</Button>
      </div>
    );
  }
}
