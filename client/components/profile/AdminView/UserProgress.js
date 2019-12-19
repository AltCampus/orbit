import React, { Component } from "react";
import TaskOneProgress from "./TaskProgress/TaskOneProgress";
import TaskTwoProgress from "./TaskProgress/TaskTwoProgress";
import TaskThreeProgress from "./TaskProgress/TaskThreeProgress";
import TaskFourProgress from "./TaskProgress/TaskFourProgress";


export class UserProgress extends Component {
  state = {
    loading: false,
    visible: false
  };

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
          <TaskOneProgress />
          <TaskTwoProgress />
          <TaskThreeProgress />
          <TaskFourProgress />
        </div>
      </>
    );
  }
}

export default UserProgress;
