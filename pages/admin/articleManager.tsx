import * as React from "react";
import http from "api";
import { Icon, List, Popconfirm } from "antd";
import { notice } from "components/notification";
import Link from "next/link";

interface ArticleManageState {
  articles: {
    _id: number;
    title: string;
    content: string;
    tags: string[];
  };
}

export default class ArticleManage extends React.Component<
  any,
  ArticleManageState
> {
  public static async getInitialProps() {
    const res = await http.get("/admin/getArticles");
    return { articles: res.data.articles };
  }

  public state = {
    articles: this.props.articles
  };

  public componentDidMount() {
    const { articles } = this.props;
    this.setState({ articles });
  }

  public onConfirm = async (id: number) => {
    const deleteRes = await http.post("/admin/deleteArticle", { id });
    const res = await http.get("/admin/getArticles");
    this.setState({ articles: res.data.articles });
    notice(deleteRes);
  };

  public render() {
    const { articles } = this.state;
    const IconText = ({ type, text, id }: any) =>
      type === "delete" ? (
        <Popconfirm
          title={"是否删除该标签"}
          onConfirm={this.onConfirm.bind(this, id)}
        >
          <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
          </span>
        </Popconfirm>
      ) : (
        <React.Fragment>
          <Icon type={type} style={{ marginRight: 8 }} />
          <Link href={{ pathname: "/admin/newArticle", query: { id } }}>
            <a>{text}</a>
          </Link>
        </React.Fragment>
      );
    return (
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: page => console.log(page),
          pageSize: 3
        }}
        dataSource={articles}
        renderItem={(item: ArticleManageState["articles"]) => (
          <List.Item
            key={item._id}
            actions={[
              <IconText type="delete" text="删除" id={item._id} key="delete" />,
              <IconText type="edit" text="编辑" id={item._id} key="edit" />
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.content.slice(0, 30)}
            />
          </List.Item>
        )}
      />
    );
  }
}
