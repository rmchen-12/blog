import http from 'api';
import { Tag } from 'interfaces';
import { Provider } from 'mobx-react';
import App, { Container } from 'next/app';
import React from 'react';

import AdminLayout from '../components/admin/layout';
import FrontLayout from '../components/front/layout';
import { initStore, Store } from '../store';

interface MyAppProps {
  Component: any;
  pageProps: any;
  page: "loign" | "admin" | "front";
  tags: Tag[];
  initialMobxState: Store;
}

export default class MyApp extends App<MyAppProps, any> {
  static async getInitialProps({ Component, router, ctx }: any) {
    let pageProps = {};

    const res = await Promise.all([
      http.get("/admin/getTags"),
      http.post("/admin/postArticles", {})
    ]);

    const mobxStore = initStore({
      tags: res[0].data.tags,
      articles: res[1].data.articles
    });
    ctx.mobxStore = mobxStore;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const page = /\/admin\/login/gi.test(router.route)
      ? "login"
      : /\/admin/gi.test(router.route)
      ? "admin"
      : "front";

    return {
      pageProps,
      page,
      initialMobxState: mobxStore
    };
  }

  private mobxStore: Store;

  constructor(props: MyAppProps) {
    super(props as any);
    const isServer = !(process as any).browser;
    const { tagStore, articleStore } = props.initialMobxState;

    this.mobxStore = isServer
      ? props.initialMobxState
      : initStore({ ...tagStore, ...articleStore });
  }

  renderLayout = (page: MyAppProps["page"], children: React.ReactNode) => {
    const layoutComponent: {
      [key: string]: any;
    } = {
      admin: <AdminLayout>{children}</AdminLayout>,
      front: <FrontLayout>{children}</FrontLayout>,
      login: children
    };
    return layoutComponent[page];
  };

  render() {
    const { Component, pageProps, page } = this.props;

    return (
      <Container>
        <Provider store={this.mobxStore}>
          {this.renderLayout(page, <Component {...pageProps} />)}
        </Provider>
      </Container>
    );
  }
}
