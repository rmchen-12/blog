import { Divider, Input } from 'antd';
import { toJS } from 'mobx';
import { inject } from 'mobx-react';
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import { Store } from 'store';

interface Props {
  store?: Store;
}

@inject("store")
export default class RightContainer extends React.PureComponent<Props, any> {
  public render() {
    const { articles } = this.props.store!.articleStore;
    return (
      <div className="container">
        <QueueAnim>
          <div key="1">
            <Input.Search placeholder="请输入关键字搜索" />
          </div>
          <div key="2">
            <Divider />
          </div>
          <div key="3">
            我的微信号
            <img
              src={"../../../../../static/wxqrcode.jpeg"}
              alt="wxqrcode"
              width="100%"
            />
          </div>
          <div key="4">
            <Divider />
          </div>
          <div key="5">近期文章</div>
          {articles &&
            toJS(articles.slice(0, 20)).map(v => (
              <div className="link" key={v._id}>
                {v.title.slice(0, 10)}
                {v.title.length > 10 && "..."}
              </div>
            ))}
        </QueueAnim>
        <style>
          {`
            .container{
                border-left: 1px solid #efefef;
                margin: 20px 0 0 20px;
                padding-left: 20px;
            }
            .link{
                font-size: 10px;
                margin: 10px 0;
                cursor: pointer;
                color: #7d7d7d;
            }
            .link:hover{
                color:#4682B4;
            }
          `}
        </style>
      </div>
    );
  }
}
