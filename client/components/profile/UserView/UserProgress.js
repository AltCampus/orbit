import React, { Component } from "react";
import { message, Card, Input } from "antd";
import axios from "axios";
import TaskOneProgress from "./TaskProgress/TaskOneProgress";
import TaskTwoProgress from "./TaskProgress/TaskTwoProgress";
import TaskThreeProgress from "./TaskProgress/TaskThreeProgress";
import TaskFourProgress from "./TaskProgress/TaskFourProgress";
import { connect } from "react-redux";
import { userStageUpgrade } from "../../../actions/users";

const { Meta } = Card;

const { TextArea } = Input;

export class UserProgress extends Component {
  state = {
    loading: false,
    progress: {}
  };
  componentDidMount() {
    this.getTaskData();
  }
  async getTaskData() {
    try {
      this.setState({ loading: true });
      const response = await axios.get("/api/v1/tasks/all/status", {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({ progress: response.data, loading: false });
      if (response.data.stageUpdated) {
        this.props.userStageUpgrade();
      }
    } catch (error) {
      this.setState({ loading: false });
      if (error.response) {
        message.error(error.response.errror);
      } else {
        message.error("Failed to fetch task status");
      }
    }
  }

  render() {
    return (
      <>
        <div className="progress-container">
          <TaskOneProgress
            loading={this.state.loading}
            htmlTask={this.state.progress.html || {}}
          />
          <TaskTwoProgress
            loading={this.state.loading}
            codewarsTask={this.state.progress.codewars || {}}
          />
          <TaskThreeProgress
            loading={this.state.loading}
            quiz={this.state.progress.quiz || {}}
          />
          <TaskFourProgress
            loading={this.state.loading}
            quiz={this.state.progress.quiz || {}}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user
  };
};

export default connect(mapStateToProps, { userStageUpgrade })(UserProgress);
