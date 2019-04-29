import React from "react";
import http from "api";
import ArticleCell from "components/front/articleCell";
import { Article } from "interfaces";
import { inject } from "mobx-react";
import { Store } from "../store";

export interface Props {
  articles: Article[];
  store: Store;
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

@inject("store")
export default class Diary extends React.Component<Props, State> {
  public static async getInitialProps() {
    const res = await http.post("/admin/postArticles", { tags: ["随笔"] });
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
