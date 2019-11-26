import React from "react";
import "antd/dist/antd.css";
import "./../dashboard.scss";
import { Layout, Menu, Icon, Avatar } from "antd";

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
            <Menu.Item key='2'>
              <Icon type='code' />
              <span>nav 2</span>
            </Menu.Item>
          </Menu>
          {/* <div className='gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row'>
            <Avatar
              src='https://via.placeholder.com/150x150'
              className='gx-size-40 gx-pointer gx-mr-3'
              alt=''
            />
            <span className='gx-avatar-name'>
              Rob Farnandies
              <i className='icon icon-chevron-down gx-fs-xxs gx-ml-2' />
            </span>
          </div> */}
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
