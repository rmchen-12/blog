import * as React from "react";
import AdminLayout from "../components/admin/layout";
import App, { Container } from "next/app";
import FrontLayout from "../components/front/layout";
import http from "api";

export interface Tag {
  tagName: string;
}

interface MyAppProps {
  Component: any;
  pageProps: any;
  page: "loign" | "admin" | "front";
  tags: Tag[];
}

export default class MyApp extends App<MyAppProps, any> {
  public static async getInitialProps({ Component, router, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const page = /\/admin\/login/gi.test(router.route)
      ? "login"
      : /\/admin/gi.test(router.route)
      ? "admin"
      : "front";

    const res = await http.get("/admin/getTags");

    return {
      pageProps,
      page,
      tags: res.data.tags
    };
  }

  public renderLayout = (
    page: MyAppProps["page"],
    tags: MyAppProps["tags"],
    children: React.ReactNode
  ) => {
    const layoutComponent: {
      [key: string]: any;
    } = {
      admin: <AdminLayout>{children}</AdminLayout>,
      front: <FrontLayout tags={tags}>{children}</FrontLayout>,
      login: children
    };
    return layoutComponent[page];
  };

  public render() {
    const { Component, pageProps, page, tags } = this.props;

    return (
      <Container>
        {this.renderLayout(page, tags, <Component {...pageProps} />)}
      </Container>
    );
  }
}
