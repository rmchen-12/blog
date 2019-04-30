import ArticleList from 'components/front/articleList';
import React from 'react';
import WithArticles from 'components/hoc/withArticle';
import { Article } from 'interfaces';
import { inject } from 'mobx-react';
import { Store } from 'store';

export interface Props {
  articles: Article[];
  store: Store;
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

@inject("store")
class Home extends React.Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { articles } = this.props;

    return <ArticleList articles={articles} />;
  }
}

export default WithArticles(Home, "首页");
