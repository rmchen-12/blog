import  React from "react";
import http from "api";
import remark from "remark";
import renderMD from "remark-react";
import { Button, Input, Modal, Select } from "antd";
import { notice } from "components/notification";
import _ from "lodash";

interface Props {
  initTags: string[];
}

const initialState = {
  visible: false,
  content: "",
  title: "",
  tags: [] as string[]
};

type State = Readonly<typeof initialState>;

const TextArea = Input.TextArea;
const Option = Select.Option;

export default class NewArticle extends React.Component<Props, State> {
  public static async getInitialProps({}) {
    const res = await http.get("/admin/getTags");
    return { initTags: res.data.tags };
  }

  public readonly state: State = initialState;

  public async componentDidMount() {
    const { search } = window.location;
    const id = search.split("=")[1];
    const res = await http.post("/admin/getArticle", { id });
    const article = _.pick(res.data.article, ["title", "content", "tags"]);
    this.setState({ ...article });
  }

  public publish = async (type: "publish" | "save") => {
    const { content, title, tags } = this.state;
    const res = await http.post("/admin/addArticle", {
      content,
      title,
      tags,
      isPublish: type === "publish" ? 1 : 0
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
    const { title, content, tags, visible } = this.state;
    const { initTags } = this.props;
    console.log(tags);

    return (
      <div>
        <h2>编辑文章</h2>
        <div>
          <h3>标题</h3>
          <Input
            size="small"
            placeholder="请输入文章标题"
            value={title}
            onChange={this.handleTitleChange}
          />
          <h3>正文</h3>
          <TextArea
            style={{ height: `calc(100vh - 400px)` }}
            value={content}
            onChange={this.handleContentChange}
          />
          <h3>选择标签</h3>
          <Select
            mode="multiple"
            placeholder="请选择文章标签"
            style={{ width: 400, display: "block", marginBottom: "10px" }}
            size="small"
            defaultValue={tags}
            onChange={this.handleTagChange}
          >
            {initTags.map((v: any) => (
              <Option value={v.tagName} key={v.tagName}>
                {v.tagName}
              </Option>
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
          <Button
            size="small"
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.publish.bind(this, "save")}
          >
            保存到草稿
          </Button>
          <Button
            size="small"
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.publish.bind(this, "publish")}
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
