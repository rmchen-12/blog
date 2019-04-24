import * as React from "react";
import http from "api";
import Router from "next/router";
import { Button, Divider, Form, Icon, Input, message } from "antd";
import { FormComponentProps } from "antd/lib/form";

const initialState = {
  formType: "login"
};

type State = Readonly<typeof initialState>;

class Login extends React.Component<FormComponentProps, State> {
  public readonly state: State = initialState;

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { formType } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      formType === "login"
        ? http.post("/admin/login", { ...values }).then((res: any) => {
            res.data.code === 1
              ? Router.push("/admin")
              : message.error(res.data.message);
          })
        : http.post("/admin/signUp", { ...values }).then((res: any) => {
            res.data.code === 1
              ? Router.push("/admin")
              : message.error(res.data.message);
          });
    });
  };

  public renderLogin = () => {
    this.setState({ formType: "login" });
  };

  public renderRegister = () => {
    this.setState({ formType: "signUp" });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formType } = this.state;
    return (
      <div style={{ width: "100vw", height: "100vh", background: "	#4682B4" }}>
        <Form
          style={{
            position: "absolute",
            minWidth: 300,
            left: "50%",
            top: "50%",
            transform: "translate3d(-50%,-50%,0)",
            padding: "20px 20px 0 20px",
            border: "1px solid #d9d9d9",
            background: "#fff",
            borderRadius: "10px"
          }}
          onSubmit={this.onSubmit}
        >
          <Form.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <a onClick={this.renderLogin}>登录</a>
            <Divider type="vertical" />
            <a onClick={this.renderRegister}>注册</a>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="输入密码"
              />
            )}
          </Form.Item>
          {formType === "signUp" && (
            <Form.Item>
              {getFieldDecorator("rePassword", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="再次输入密码"
                />
              )}
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {formType === "login" ? "登录" : "注册"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<FormComponentProps>()(Login);
