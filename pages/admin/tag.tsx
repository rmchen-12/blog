import { Button, Input, Popconfirm, Tag } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Store } from 'store';

interface Label {
  _id: string;
  tagName: string;
  url: string;
}

interface Props {
  tags: Label[];
  store: Store;
}

const initialState = {
  tagName: "",
  url: "",
  tags: [] as Label[]
};

type State = Readonly<typeof initialState>;

@inject("store")
@observer
export default class Tags extends React.Component<Props, State> {
  readonly state: State = initialState;

  componentDidMount() {
    this.props.store.tagStore.getTags();
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tagName: e.target.value });
  };

  handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: e.target.value });
  };

  createTag = async () => {
    await this.props.store.tagStore.createTag(
      this.state.tagName,
      this.state.url
    );
    await this.props.store.tagStore.getTags();
  };

  onConfirm = async (id: string) => {
    this.props.store.tagStore.deleteTag(id);
  };

  render() {
    const { tags } = this.props.store.tagStore;

    return (
      <div>
        {tags &&
          tags.map((tag: any) => (
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
        <Input
          placeholder="标签URL"
          style={{
            width: 400,
            display: "block",
            margin: "10px 0"
          }}
          onChange={this.handleUrlChange}
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
