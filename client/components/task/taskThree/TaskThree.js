import React, { Component } from "react";
import { Divider, Button, Icon, Pagination } from "antd";
import { connect } from "react-redux";
import UserWrapper from "../../dashboard/user/UserWrapper";
import Quiz from "./Quiz";
import TaskCompleted from "../taskCompleted/TaskCompleted";
import PendingTask from "../../message/PendingTask";

class TaskThree extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <UserWrapper activeKey={"3"}>
        {this.props.user.user.stage === 3 ? (
          <Quiz />
        ) : this.props.user.user.stage < 3 ? (
          <PendingTask />
        ) : (
          <TaskCompleted />
        )}
      </UserWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.currentUser
});

export default connect(mapStateToProps)(TaskThree);
