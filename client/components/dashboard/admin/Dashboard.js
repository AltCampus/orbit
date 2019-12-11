import React from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import Questionnaire from "../../questionnaire/Questionnaire";

import DisplayApplicants from "./DisplayApplicants";

const { Header, Sider, Content } = Layout;

class AdminDashboard extends React.Component {
  state = {
    collapsed: false,
    broken: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout className="wrapper">
        <Sider
          breakpoint="sm"
          onBreakpoint={broken => {
            this.setState({ broken });
          }}
          trigger={null}
          collapsible
          collapsedWidth={this.state.broken ? "0" : "80"}
          collapsed={this.state.collapsed}
        >
          <div className="logo">Alt Campus</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="layout" />
              <span>All applicants</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="code" />
              <span>Add Question</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            borderRadius: "10px"
          }}
        >
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              background: "#fff",
              minHeight: 280
            }}
          >
            <DisplayApplicants />
            <Questionnaire />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminDashboard;
