import * as React from "react";
import Header from "../header";
import Footer from "../footer";

export interface LayoutProps {}

export default class Layout extends React.Component<LayoutProps, any> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}
