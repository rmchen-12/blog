import ArticleList from 'components/front/articleList';
import WithArticles from 'components/hoc/withArticle';
import { Article } from 'interfaces';
import { inject } from 'mobx-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { Store } from 'store';

const DynamicComponentWithCustomLoading = dynamic(
  import("components/front/articleList"),
  {
    loading: () => <p>...</p>
  }
);

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
