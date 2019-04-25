import * as React from "react";
import { Article } from "pages/home";
import moment from "moment";
import { Icon } from "antd";

interface ArticleCellProps {
  article: Article;
}

const ArticleCell: React.FunctionComponent<ArticleCellProps> = props => {
  const { title, content, createdAt, viewCount, commentCount } = props.article;
  return (
    <React.Fragment>
      <div>
        <div className="wrapper">
          <div className="title">{title}</div>
          <div className="content">{content}</div>
          <div className="footer">
            <div className="time">
              {moment(createdAt).format("YYYY-MM-DD hh:mm")}
            </div>
            <div className="viewCount">
              <Icon type="eye" style={{ marginRight: 5 }} />
              {viewCount}
            </div>
            <div className="commentCount">
              <Icon type="edit" style={{ marginRight: 5 }} />
              {commentCount}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .wrapper {
            width: 80%;
            height: 200px;
            background-color: #eeeeee;
            border-radius: 10px;
            padding: 15px 20px;
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: start;
          }
          .title{
            font-size: 2em;
            color: #7d7d7d;
          }
          .content{
            font-size: 1.3em;
            color: #7d7d7d;
          }
          .footer{
            display: flex;
            justify-content: start;
            align-items: center;
          }
          .footer > div {
            margin-right: 20px
          }
       `}
      </style>
    </React.Fragment>
  );
};

export default ArticleCell;
