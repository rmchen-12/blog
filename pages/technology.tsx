import * as React from "react";
import http from "api";
import ArticleCell from "components/front/articleCell";

export interface Props {
  articles: Article[];
}

export interface Article {
  _id: number;
  title: string;
  content: string;
  tags: string[];
  isPublish: boolean;
  createdAt: string;
  viewCount: number;
  commentCount: number;
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

export default class Technology extends React.Component<Props, State> {
  public static async getInitialProps() {
    const res = await http.post("/admin/postArticles", { tags: ["技术"] });
    return { articles: res.data.articles };
  }

  public readonly state: State = initialState;

  public render() {
    const { articles } = this.props;
    return (
      <div>
        {articles && articles.map(v => <ArticleCell article={v} key={v._id} />)}
      </div>
    );
  }
}
