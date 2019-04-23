import * as React from "react";
import http from "api";
import remark from "remark";
import renderMD from "remark-react";
import { Button, Input, Modal, Select } from "antd";
import { notice } from "components/notification";
import _ from "lodash";

interface NewArticleState {
  visible: boolean;
  content: string;
  title: string;
  tags: string[] | undefined;
}

const TextArea = Input.TextArea;
const Option = Select.Option;

export default class NewArticle extends React.Component<any, NewArticleState> {
  public static async getInitialProps({}) {
    const res = await http.get("/admin/getTags");
    return { initTags: res.data.tags };
  }

  public state = {
    visible: false,
    content: "",
    title: "",
    tags: undefined
  };

  public async componentDidMount() {
    const { search } = window.location;
    const id = search.split("=")[1];
    const res = await http.post("/admin/getArticle", { id });
    const article = _.pick(res.data.article, ["title", "content", "tags"]);
    this.setState({ ...article });
  }

  public publish = async () => {
    const { content, title, tags } = this.state;
    const res = await http.post("/admin/addArticle", {
      content,
      title,
      tags,
      isPublish: 1
    });
    notice(res);
  };

  public handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  public handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: e.target.value });
  };

  public handleTagChange = (value: any) => {
    this.setState({ tags: value });
  };

  public preview = () => this.setState({ visible: true });

  public closeModal = () => this.setState({ visible: false });

  public render() {
    const { initTags } = this.props;

    const { visible, content } = this.state;
    return (
      <div>
        <h2>新建文章</h2>
        <div>
          <h3>标题</h3>
          <Input
            size="small"
            placeholder="请输入文章标题"
            onChange={this.handleTitleChange}
          />
          <h3>正文</h3>
          <TextArea
            style={{ height: `calc(100vh - 400px)` }}
            onChange={this.handleContentChange}
          />
          <h3>选择标签</h3>
          <Select
            mode="multiple"
            placeholder="请选择文章标签"
            style={{ width: 400, display: "block", marginBottom: "10px" }}
            size="small"
            onChange={this.handleTagChange}
          >
            {initTags.map((v: any) => (
              <Option key={v._id}>{v.tagName}</Option>
            ))}
          </Select>
          <Button
            size="small"
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.preview}
          >
            预览
          </Button>
          <Button size="small" type="primary" style={{ marginRight: 10 }}>
            保存到草稿
          </Button>
          <Button
            size="small"
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.publish}
          >
            发布
          </Button>
          <Modal
            title="预览文章"
            visible={visible}
            footer={null}
            onCancel={this.closeModal}
            width={"900px"}
          >
            {
              remark()
                .use(renderMD)
                .processSync(content).contents
            }
          </Modal>
        </div>
        <style>
          {`
            h3{
                margin-top:8px;
            }
            `}
        </style>
      </div>
    );
  }
}
