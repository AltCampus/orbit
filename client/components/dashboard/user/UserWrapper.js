import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Avatar, Button, Anchor } from "antd";
import { userLogOut } from "../../../actions/users";

const { Header, Sider, Content } = Layout;

function UserWrapper(props) {
  const [broken, setBroken] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = () => {
    props.userLogOut(() => props.history.push("/"));
  };

  return (
    <Layout className="wrapper">
      <Sider
        breakpoint="sm"
        onBreakpoint={broken => {
          setBroken(broken);
        }}
        trigger={null}
        collapsible
        collapsedWidth={broken ? "0" : "80"}
        collapsed={collapsed}
      >
        <div className="logo"> Alt Campus </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.activeKey]}
        >
          <Menu.Item key="0">
            <Link to="/">
              <Icon type="paper-clip" />
              <span> Instructions </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/task/1">
              <Icon type="html5" />
              <span> HTML / CSS </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/task/2">
              <Icon type="code" />
              <span> CodeWars </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/task/3">
              <Icon type="question" />
              <span> Q / A </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/task/4">
              <Icon type="video-camera" />
              <span> Interview </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/profile">
              <Icon type="user" />
              <span> Your Profile </span>
            </Link>
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
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={toggle}
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
              onClick={handleClick}
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
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(connect(null, { userLogOut })(UserWrapper));
