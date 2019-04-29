import ArticleCell from 'components/front/articleCell';
import { Article, Ctx } from 'interfaces';
import _ from 'lodash';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
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
@observer
export default class Home extends React.Component<Props, State> {
  static async getInitialProps(ctx: Ctx) {
    const filterArticles = _.filter(
      toJS(ctx.mobxStore.articleStore.articles!),
      v => v.tags.includes("首页")
    );
    return { articles: filterArticles };
  }

  readonly state: State = initialState;

  render() {
    const { articles } = this.props;

    return (
      <div>
        {articles && articles.map(v => <ArticleCell article={v} key={v._id} />)}
      </div>
    );
  }
}
