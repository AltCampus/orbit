import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Menu, Icon } from "antd";

import AdminWrapper from "./AdminWrapper";
import ToggleStage from "./ToggleStage";

class DisplayApplicants extends React.Component {
  state = {
    current: "all"
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <AdminWrapper activeKey={"0"}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Menu.Item key="all">
            <Icon type="appstore" />
            All Applicants
          </Menu.Item>
          <Menu.Item key="stageOne">
            <Icon type="html5" />
            Stage One
          </Menu.Item>
          <Menu.Item key="stageTwo">
            <Icon type="code" />
            Stage Two
          </Menu.Item>
          <Menu.Item key="stageThree">
            <Icon type="question-circle" />
            Stage Three
          </Menu.Item>
          <Menu.Item key="toBeReviewed">
            <Icon type="question-circle" />
            To Be Reviewed
          </Menu.Item>
          <Menu.Item key="stageFour">
            <Icon type="video-camera" />
            Stage Four
          </Menu.Item>
          <Menu.Item key="Accepted/Rejected">
            <Icon type="team" />
            Accepted/Rejected
          </Menu.Item>
        </Menu>
        <div className="content">
          <ToggleStage name={this.state.current} />
        </div>
      </AdminWrapper>
    );
  }
}

export default DisplayApplicants;
