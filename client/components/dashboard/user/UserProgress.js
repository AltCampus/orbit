import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './index.css';

import { Icon, Card } from 'antd';

import UserWrapper from '../../dashboard/user/UserWrapper';

class UserProgress extends Component {
  state = {
    task: {}
  };

  IsAccepted = () => {
    if (this.props.user.stage === 0) {
      return (
        <div>
          <h1>
            Application Status: Rejected{' '}
            <Icon
              className="close-circle"
              type="close-circle"
              theme="twoTone"
            />
          </h1>
        </div>
      );
    } else if (this.props.user.stage === 5) {
      return (
        <div>
          <h1>
            Application Status: Accepted{' '}
            <Icon
              className="check-circle"
              type="check-circle"
              theme="twoTone"
            />
          </h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            Application Status: Pending{' '}
            <Icon
              className="clock-circle"
              type="clock-circle"
              theme="twoTone"
            />
          </h1>
        </div>
      );
    }
  };

  RenderStageOneCard = () => {
    if (this.state.task.html) {
      const html = this.state.task.html
      return (
        <div>
          <h1>HTML/CSS Assignment</h1>
          <p className="padding-top">
            You have submitted the task at {new Date(html.submitTime).toLocaleString()}
          </p>
          {!html.score ? (
            <div>
              <p className="padding-top">
                Your task has not been reviewed yet.
              </p>
            </div>
          ) : (
            <div>
              <p className="padding-top"> Your task has been reviewed.</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h1>HTML/CSS Assignment</h1>
          <p>Task has not been initiated yet.</p>
        </div>
      );
    }
  };
  RenderStageTwoCard = () => {
    console.log(this.state)
    if (this.state.task.codewars) {
      const codewars = this.state.task.codewars
      return (
        <div>
          <h1>CodeWars Assignment</h1>
          <p>
            You Have Submitted your codewars username i.e{' '}
            {codewars.codewarsUsername}
          </p>
          <p>
            Your countdown for this task was started at{' '}
            {new Date(codewars.startTime).toLocaleString()}
          </p>
          {/* The time limit will turn to zero i.e falsy value */}
          {codewars.timeLimit ? (
            <div>
              <p>You have {(codewars.timeLimit)/60} minutes left.</p>{' '}
            </div>
          ) : (
            <div>
              <p>Your time limit for this task is over.</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h1>CodeWars Assignment</h1>
          <p>Task has not been initiated yet.</p>
        </div>
      );
    }
  };
  RenderStageThreeCard = () => {
    return (
      <div>
        <h1>Q/A</h1>
      </div>
    );
  };
  RenderStageFourCard = () => {
    return (
      <div>
        <h1>Interview</h1>
      </div>
    );
  };

  render() {
    return (
      <>
        <UserWrapper activeKey={'5'}>
          {!this.props ? (
            <Icon
              type="loading"
              style={{ fontSize: 100, width: '100%', paddingTop: '7rem' }}
              spin
            />
          ) : (
            <div>
              <header className="display-flex">{this.IsAccepted()}</header>
              <div className="user-info-container">
                <p>{this.props.user.name}</p>
                <p>Email: {this.props.user.email}</p>
                <p>Current Stage: {this.props.user.stage}</p>
                <p>Motivation: {this.props.user.motivation}</p>
              </div>
              {this.props ? (
                <div className="card-parent-container">
                  <div className="card-container">
                    {this.RenderStageOneCard()}
                  </div>
                  <div className="card-container">
                    {this.RenderStageTwoCard()}
                  </div>
                  <div className="card-container">
                    {this.RenderStageThreeCard()}
                  </div>
                  <div className="card-container">
                    {this.RenderStageFourCard()}
                  </div>
                </div>
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          )}
        </UserWrapper>
      </>
    );
  }
  async componentDidMount() {
    const taskResponse = await axios.get(
      `http://localhost:3000/api/v1/user/task/${this.props.user.task}`,
      {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      }
    );
    this.setState({ task: taskResponse.data.task });
  }
}

const mapStateToProps = state => {
  return { user: state.currentUser.user };
};

export default connect(mapStateToProps)(UserProgress);
