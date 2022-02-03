import { Layout, Menu, Breadcrumb } from "antd";
import Link from "next/link";
import { Component } from "react";
import store from "../../store/store";
import Logout from "../logout";
import classes from "./layout.module.css";

const { Header, Content, Footer } = Layout;

function LayoutWrapper(props) {
  const isLoggedIn = store.getState().authInfo.isLoggedIn;

  return (
    <Layout className="layout" style={{ height: "100%", width: "100%" }}>
      <Header>
        <div className={classes.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {/* {new Array(15).fill(null).map((_, index) => {
      const key = index + 1;
      return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
    })} */}
          {isLoggedIn === true && (
            <Menu.Item key={1}>
              <Logout />
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", height: "100%", width: "100%" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        {/* <div className="site-layout-content">Content</div> */}
        <main style={{ height: "100%", width: "100%", backgroundColor: "white" }}>{props.children}</main>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default LayoutWrapper;
