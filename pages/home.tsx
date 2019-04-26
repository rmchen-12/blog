import React from "react";
import http from "api";
import ArticleCell from "components/front/articleCell";
import { Article } from "interfaces";

export interface Props {
  articles: Article[];
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

export default class Home extends React.Component<Props, State> {
  public static async getInitialProps() {
    const res = await http.post("/admin/postArticles", { tags: ["首页"] });
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
