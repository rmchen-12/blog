import * as React from "react";

export interface LeftContainerProps {}

export default class LeftContainer extends React.PureComponent<
  LeftContainerProps,
  any
> {
  public render() {
    return <div>{this.props.children}</div>;
  }
}
