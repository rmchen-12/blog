import { Article } from 'interfaces';
import QueueAnim from 'rc-queue-anim';
import * as React from 'react';

import ArticleCell from './articleCell';

interface IArticleListProps {
  articles: Article[];
}

const ArticleList: React.FunctionComponent<IArticleListProps> = ({
  articles
}) => {
  return (
    <QueueAnim type="bottom" duration={1000} interval={300}>
      {articles && articles.map(v => <ArticleCell article={v} key={v._id} />)}
    </QueueAnim>
  );
};

export default ArticleList;
