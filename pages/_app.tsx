import * as React from "react";
import App, { Container } from "next/app";
import FrontLayout from "../components/front/layout";
import AdminLayout from "../components/admin/layout";

export default class MyApp extends App<any, any> {
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

    return { pageProps, page };
  }

  public renderLayout = (page: string, children: React.ReactNode) => {
    const layoutComponent: { [key: string]: any } = {
      admin: <AdminLayout>{children}</AdminLayout>,
      front: <FrontLayout>{children}</FrontLayout>,
      login: children
    };
    return layoutComponent[page];
  };

  public render() {
    const { Component, pageProps, page } = this.props;

    return (
      <Container>
        {this.renderLayout(page, <Component {...pageProps} />)}
      </Container>
    );
  }
}
