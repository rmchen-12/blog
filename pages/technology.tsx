import ArticleCell from 'components/front/articleCell';
import { Article, Ctx } from 'interfaces';
import _ from 'lodash';
import { toJS } from 'mobx';
import React from 'react';

export interface Props {
  articles: Article[];
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

export default class Technology extends React.Component<Props, State> {
  static async getInitialProps(ctx: Ctx) {
    const filterArticles = _.filter(
      toJS(ctx.mobxStore.articleStore.articles!),
      v => v.tags.includes("技术")
    );
    return { articles: filterArticles };
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
