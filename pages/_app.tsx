import * as React from "react";
import App, { Container } from "next/app";
import { ScreenClassProvider } from "react-grid-system";
import Layout from "../components/layout";

export interface MyAppProps {}

export default class MyApp extends App<MyAppProps, any> {
  public render() {
    const { Component } = this.props;
    return (
      <Container>
        <ScreenClassProvider>
          <Layout>
            <Component />
          </Layout>
        </ScreenClassProvider>
      </Container>
    );
  }
}
