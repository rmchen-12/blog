import * as React from 'react';
import ArticleCell from '../articleCell';
import QueueAnim from 'rc-queue-anim';
import { Article } from 'interfaces';


interface IArticleListProps {
  articles: Article[];
}

const ArticleList: React.FunctionComponent<IArticleListProps> = ({
  articles
}) => {
  return (
    <QueueAnim type="bottom">
      {articles && articles.map(v => <ArticleCell article={v} key={v._id} />)}
    </QueueAnim>
  );
};

export default ArticleList;
