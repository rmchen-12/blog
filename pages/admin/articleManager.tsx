import * as React from "react";
import http from "api";
import { Icon, List, Popconfirm } from "antd";
import { notice } from "components/notification";
import Link from "next/link";
import moment from "moment";

interface Props {
  articles: Article[];
}

interface Article {
  _id: number;
  title: string;
  content: string;
  tags: string[];
  isPublish: boolean;
  createdAt: string;
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

export default class ArticleManage extends React.Component<Props, State> {
  public static async getInitialProps() {
    const res = await http.post("/admin/postArticles", {});
    return { articles: res.data.articles };
  }

  public readonly state: State = initialState;

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
