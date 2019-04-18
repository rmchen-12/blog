import * as React from "react";
import App, { Container } from "next/app";
import FrontLayout from "../components/front/layout";
import AdminLayout from "../components/admin/layout";

export default class MyApp extends App<any, any> {
  public static async getInitialProps({ Component, router, ctx }: any) {
    const page = router.route.startsWith("/admin") ? "admin" : "front";
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, page };
  }

  public renderLayout = (page: string, children: React.ReactNode) =>
    page === "admin" ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <FrontLayout>{children}</FrontLayout>
    );

  public render() {
    const { Component, pageProps, page } = this.props;

    return (
      <Container>
        {this.renderLayout(page, <Component {...pageProps} />)}
      </Container>
    );
  }
}
