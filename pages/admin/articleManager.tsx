import Link from "next/link";
import moment from "moment";
import React from "react";
import { Article } from "interfaces";
import { Icon, List, Popconfirm } from "antd";
import { inject, observer } from "mobx-react";
import { Store } from "store";

interface Props {
  articles: Article[];
  store: Store;
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

@inject("store")
@observer
export default class ArticleManage extends React.Component<Props, State> {
  readonly state: State = initialState;

  componentDidMount() {
    this.props.store.articleStore.getArticles();
  }

  onConfirm = async (id: string) => {
    this.props.store.articleStore.deleteArticle(id);
  };

  render() {
    const { articles } = this.props.store.articleStore;

    const IconText = ({ type, text, id }: any) => {
      const nodes: { [key: string]: any } = {
        delete: (
          <Popconfirm
            title={"是否删除该标签"}
            onConfirm={this.onConfirm.bind(this, id)}
          >
            <span>
              <Icon type={type} style={{ marginRight: 8 }} />
              {text}
            </span>
          </Popconfirm>
        ),
        edit: (
          <React.Fragment>
            <Icon type={type} style={{ marginRight: 8 }} />
            <Link
              href={{
                pathname: "/admin/newArticle",
                query: { id }
              }}
            >
              <a>{text}</a>
            </Link>
          </React.Fragment>
        ),
        calendar: (
          <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
          </span>
        )
      };
      return nodes[type];
    };

    return (
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: page => console.log(page),
          pageSize: 3
        }}
        dataSource={articles}
        renderItem={(item: Article) => (
          <List.Item
            key={item._id}
            actions={[
              <IconText type="delete" text="删除" id={item._id} key="delete" />,
              <IconText type="edit" text="编辑" id={item._id} key="edit" />,
              <IconText
                type="calendar"
                text={moment(item.createdAt).format("YYYY-MM-DD hh:mm")}
                key="calendar"
              />
            ]}
          >
            <List.Item.Meta
              title={`${item.title}(${item.isPublish ? "已发布" : "草稿"})`}
              description={item.content.slice(0, 30)}
            />
          </List.Item>
        )}
      />
    );
  }
}
