import ArticleList from 'components/front/articleList';
import WithArticles from 'components/hoc/withArticle';
import { Article } from 'interfaces';
import { inject } from 'mobx-react';
import React from 'react';

export interface Props {
  articles: Article[];
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

@inject("store")
class Technology extends React.Component<Props, State> {
  public readonly state: State = initialState;

  public render() {
    const { articles } = this.props;
    return <ArticleList articles={articles} />;
  }
}

export default WithArticles(Technology, "技术");
