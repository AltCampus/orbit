import React from "react";
import { Layout, Menu, Icon, Avatar, Button, Switch } from "antd";

import TaskOne from "../../task/taskOne/TaskOne";
import TaskTwo from "../../task/taskTwo/TaskTwo";

const { Header, Sider, Content } = Layout;

class UserDashboard extends React.Component {
  state = {
    collapsed: false,
    broken: false,
    tabIndex: 0
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  renderTask = data => {
    switch (data) {
      case 1:
        return <TaskOne />;
        break;
      case 2:
        return <TaskTwo />;

      default:
        break;
    }
  };

  render() {
    return (
      <Layout className="wrapper">
        <Sider
          breakpoint="sm"
          onBreakpoint={broken => {
            this.setState({
              broken
            });
          }}
          trigger={null}
          collapsible
          collapsedWidth={this.state.broken ? "0" : "80"}
          collapsed={this.state.collapsed}
        >
          <div className="logo"> Alt Campus </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            <Menu.Item onClick={() => this.setState({ tabIndex: 0 })} key="0">
              <Icon type="paper-clip" />
              <span> Instructions </span>
            </Menu.Item>
            <Menu.Item onClick={() => this.setState({ tabIndex: 1 })} key="1">
              <Icon type="html5" />
              <span> HTML / CSS </span>
            </Menu.Item>
            <Menu.Item onClick={() => this.setState({ tabIndex: 2 })} key="2">
              <Icon type="code" />
              <span> CodeWars </span>
            </Menu.Item>
            <Menu.Item
              onClick={() => this.setState({ tabIndex: 3 })}
              key="3"
              disabled
            >
              <Icon type="question" />
              <span> Q / A </span>
            </Menu.Item>
            <Menu.Item
              onClick={() => this.setState({ tabIndex: 4 })}
              key="4"
              disabled
            >
              <Icon type="video-camera" />
              <span> Interview </span>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* Display container */}
        <Layout
          style={{
            borderRadius: "10px"
          }}
        >
          {/* Header  */}
          <Header
            style={{
              background: "#fff",
              padding: "0",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
              style={{
                padding: "16px"
              }}
            />
            <div
              style={{
                marginRight: "20px"
              }}
            >
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                size={50}
                style={{
                  marginRight: "6px"
                }}
              />
              <Button
                title="Logout"
                type="danger"
                shape="circle"
                icon="logout"
              />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial"
            }}
          >
            <div
              style={{
                padding: 24,
                background: "#fff",
                textAlign: "left"
              }}
            >
              {this.renderTask(this.state.tabIndex)}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default UserDashboard;
