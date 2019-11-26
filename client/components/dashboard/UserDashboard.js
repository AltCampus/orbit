import React from "react";
import "antd/dist/antd.css";
import "./dashboard.scss";
import { Layout, Menu, Icon } from "antd";

const { Header, Sider, Content } = Layout;

class UserDashboard extends React.Component {
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
      <Layout className='wrapper'>
        <Sider
          breakpoint='sm'
          onBreakpoint={broken => {
            this.setState({ broken });
          }}
          trigger={null}
          collapsible
          collapsedWidth={this.state.broken ? "0" : "80"}
          collapsed={this.state.collapsed}
        >
          <div className='logo'>Alt Campus</div>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
            <Menu.Item key='1'>
              <Icon type='layout' />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key='2' disabled>
              <Icon type='code' />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key='3' disabled>
              <Icon type='question' />
              <span>nav 3</span>
            </Menu.Item>
            <Menu.Item key='4' disabled>
              <Icon type='video-camera' />
              <span>nav 4</span>
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
              className='trigger'
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default UserDashboard;
