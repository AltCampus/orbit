import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Avatar, Button, Steps } from "antd";
const { Step } = Steps;
import { userLogOut } from "../../../actions/users";
import SevenDayTimer from "./SevenDayTimer";

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

  const stepStyle = {
    marginBottom: 10,
    boxShadow: "0px -1px 0 0 #e8e8e8 inset"
  };
  const { user } = props;
  return (
    <Layout className="wrapper">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh"
        }}
        breakpoint="sm"
        onBreakpoint={broken => {
          setCollapsed(broken);
          setBroken(broken);
        }}
        trigger={null}
        collapsible
        collapsedWidth={broken ? "0" : "80"}
        collapsed={collapsed}
      >
        <div className="logo"> AltCampus </div>
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
              <span>
                <span>HTML / CSS</span>{" "}
                {user.stage > 1 ? (
                  <Icon
                    type="check-circle"
                    theme="filled"
                    className="menu-icon"
                  />
                ) : (
                  ""
                )}
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" disabled={user.stage < 2 ? true : false}>
            <Link to="/task/2">
              <Icon type="code" />
              <span> CodeWars </span>
              {user.stage > 2 ? (
                <Icon
                  type="check-circle"
                  theme="filled"
                  className="menu-icon"
                />
              ) : (
                ""
              )}
            </Link>
          </Menu.Item>
          <Menu.Item key="3" disabled={user.stage < 3 ? true : false}>
            <Link to="/task/3">
              <Icon type="question" />
              <span> Q / A </span>
              {user.stage > 3 ? (
                <Icon
                  type="check-circle"
                  theme="filled"
                  className="menu-icon"
                />
              ) : (
                ""
              )}
            </Link>
          </Menu.Item>
          <Menu.Item key="4" disabled={user.stage < 4 ? true : false}>
            <Link to="/task/4">
              <Icon type="video-camera" />
              <span> Interview </span>
              {user.stage === 4 ? (
                <>
                  {user.status === "accept" && (
                    <Icon
                      type="check-circle"
                      theme="filled"
                      className="menu-icon"
                    />
                  )}
                  {user.status === "reject" && (
                    <Icon
                      type="close-circle"
                      theme="filled"
                      className="menu-icon"
                    />
                  )}
                  {user.status === "pending" &&
                    (user.interview ? (
                      <Icon
                        type="carry-out"
                        theme="filled"
                        className="menu-icon"
                      />
                    ) : !user.canScheduleInterview ? (
                      <Icon
                        type="clock-circle"
                        theme="filled"
                        className="menu-icon"
                      />
                    ) : null)}
                </>
              ) : (
                ""
              )}
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
          <div className="nav-left-container">
            {user.stage !== 4 && (
              <SevenDayTimer accountCreationTime={user.createdAt} />
            )}
            <span className="profile-name">
              Howdy, <Link to="/profile">{props.user.name}</Link>
            </span>

            <Button
              className="button-logout"
              onClick={handleClick}
              title="Logout"
              type="danger"
              icon="logout"
            />
          </div>
        </Header>
        <Steps
          type="navigation"
          current={Number(props.activeKey) - 1}
          style={stepStyle}
          onChange={index => {
            index <= 3 && props.history.push(`/task/${index + 1}`);
            index > 3 && props.history.push("/profile");
          }}
        >
          <Step
            status={
              Number(user.stage) === 1
                ? "process"
                : Number(user.stage) < 1
                ? "wait"
                : "finish"
            }
            title="HTML"
          />
          <Step
            status={
              Number(user.stage) === 2
                ? "process"
                : Number(user.stage) < 2
                ? "wait"
                : "finish"
            }
            title="CodeWars"
          />
          <Step
            status={
              Number(user.stage) === 3
                ? "process"
                : Number(user.stage) < 3
                ? "wait"
                : "finish"
            }
            title="Quiz"
          />
          {user.status === "reject" && !user.interview && (
            <Step status={"error"} title="Rejected" />
          )}
          <Step
            icon={
              user.status == "reject" && !user.interview ? (
                <Icon type="video-camera" />
              ) : null
            }
            status={
              Number(user.stage) === 4
                ? user.status === "pending"
                  ? "process"
                  : user.interview
                  ? "finish"
                  : "wait"
                : Number(user.stage) < 4
                ? "wait"
                : "finish"
            }
            title="Interview"
          />
          {user.status === "reject" && user.interview && (
            <Step status={"error"} title="Rejected" />
          )}
          {user.status === "accept" && user.interview && (
            <Step status={"finish"} title="Accepted" />
          )}
        </Steps>
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
              textAlign: "left",
              marginBottom: "1rem"
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user
  };
};

export default withRouter(
  connect(mapStateToProps, { userLogOut })(UserWrapper)
);
