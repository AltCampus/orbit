import React, { Component } from "react";
import TaskOneProgress from "./TaskProgress/TaskOneProgress";
import TaskTwoProgress from "./TaskProgress/TaskTwoProgress";
import TaskThreeProgress from "./TaskProgress/TaskThreeProgress";
import TaskFourProgress from "./TaskProgress/TaskFourProgress";

class UserProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="progress-container">
          <TaskOneProgress
            user={this.props.user}
            fetchUsers={this.props.fetchUsers}
          />
          <TaskTwoProgress
            user={this.props.user}
            fetchUsers={this.props.fetchUsers}
          />
          {this.props.user && this.props.user.quiz && (
            <TaskThreeProgress user={this.props.user} />
          )}
          {/* <TaskFourProgress /> */}
        </div>
      </>
    );
  }
}

export default UserProgress;
