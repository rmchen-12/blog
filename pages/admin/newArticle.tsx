import React from "react";
import remark from "remark";
import renderMD from "remark-react";
import { Button, Input, Modal, Select } from "antd";
import _ from "lodash";
import { Store } from "store";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

interface Props {
  initTags: string[];
  store: Store;
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

@inject("store")
@observer
export default class NewArticle extends React.Component<Props, State> {
  readonly state: State = initialState;

  async componentDidMount() {
    const { articleStore } = this.props.store;
    const id = this.getEditArticleId();
    await articleStore.getArticles();
    const filterArticle = toJS(articleStore.articles!).filter(
      article => article._id === id
    );
    const article = _.pick(filterArticle[0], ["title", "content", "tags"]);
    this.setState({ ...article });
  }

  publish = async (type: "publish" | "save") => {
    const { content, title, tags } = this.state;

    this.props.store.articleStore.publish({
      content,
      title,
      tags,
      isPublish: type === "publish" ? true : false
    });
  };

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: e.target.value });
  };

  handleTagChange = (value: any) => {
    this.setState({ tags: value });
  };

  preview = () => this.setState({ visible: true });

  closeModal = () => this.setState({ visible: false });

  render() {
    const { title, content, tags, visible } = this.state;

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
            {this.props.store.tagStore.tags!.map((v: any) => (
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

  private getEditArticleId = () => window.location.search.split("=")[1];
}
