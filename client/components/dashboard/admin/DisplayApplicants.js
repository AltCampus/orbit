import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Menu, Icon } from "antd";

import StageOne from "./StageOne";

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
      <Fragment>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Menu.Item key="stageZero">
            <Icon type="close-circle" />
            Stage Zero
          </Menu.Item>
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
          <Menu.Item key="stageFour">
            <Icon type="video-camera" />
            Stage Four
          </Menu.Item>
        </Menu>
        <div className="content">
          <StageOne name={this.state.current} />
        </div>
      </Fragment>
    );
  }
}

export default DisplayApplicants;
