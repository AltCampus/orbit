import React, { Component } from "react";
import TaskOneProgress from "./TaskProgress/TaskOneProgress";
import TaskTwoProgress from "./TaskProgress/TaskTwoProgress";
import TaskThreeProgress from "./TaskProgress/TaskThreeProgress";
import TaskFourProgress from "./TaskProgress/TaskFourProgress";

class UserProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false
    };
  }

  showScoreModal = () => {
    this.setState({
      visible: true
    });
  };

  showReviewModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  render() {
    const { visible, loading } = this.state;

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
