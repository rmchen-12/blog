import _ from 'lodash';
import React from 'react';
import { Article, Ctx } from 'interfaces';
import { inject, observer } from 'mobx-react';
import { Store } from '../../store';
import { toJS } from 'mobx';


export interface Props {
  articles: Article[];
  store: Store;
}

const initialState = {
  articles: [] as Article[]
};

type State = Readonly<typeof initialState>;

export default function WithArticles(BaseComponent: any, label: string) {
  BaseComponent = inject("store")(BaseComponent);

  class WithArticles extends React.Component<Props, State> {
    static async getInitialProps(ctx: Ctx) {
      let baseComponentProps = {};

      if (BaseComponent.getInitialProps) {
        baseComponentProps = await BaseComponent.getInitialProps(ctx);
      }

      const filterArticles = _.filter(
        toJS(ctx.mobxStore.articleStore.articles!),
        v => v.tags.includes(label)
      );
      return { articles: filterArticles, ...baseComponentProps };
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return inject("store")(observer(WithArticles));
}
