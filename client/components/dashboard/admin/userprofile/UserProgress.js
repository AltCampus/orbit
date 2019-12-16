import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Spin,
  Icon,
  Progress,
  Card,
  Button,
  Form,
  Input,
  Modal,
  InputNumber
} from 'antd';
import '../index.css';

class RenderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e, values) => {
    console.log(values, this.props.user);
    this.setState({
      visible: false
    });
  };

  handleChange = e => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = {
      score: this.state.score,
      review: this.state.review,
      taskId: this.props.user.task._id
    };
    console.log(data);
    await axios.post(
      `http://localhost:3000/api/v1/task/review/html`,
      { data },
      {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      }
    );
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const visible = this.state.visible;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Rate/Review Assignment
        </Button>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            {/* <InputNumber
              style={{ display: 'block', margin: '6px' }}
              min={0}
              max={10}
              name="score"
              value={this.state.score}
              onChange={this.handleChange}
              placeholder="score"
            /> */}
            <input
              name="score"
              value={this.state.score}
              onChange={this.handleChange}
              placeholder="score"
            />
            <input
              style={{ display: 'block', margin: '6px' }}
              placeholder="review"
              name="review"
              value={this.state.review}
              onChange={this.handleChange}
            />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

class UserProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }
  RenderTaskOneProgress = props => {
    console.log(props.name, 'FROM RENDER PROGRESS');
    if (props.task.html) {
      const html = props.task.html;
      return (
        <div>
          <p>
            {props.name} submitted his{' '}
            <a target="_blank" href={html.taskUrl}>
              assignment
            </a>{' '}
            at {new Date(html.submitTime).toLocaleString()}
          </p>
          {html.score && html.review ? (
            <div>
              <p>You have rated this assignment {html.score}/10</p>
              <p>
                Review:
                {html.review}
              </p>
            </div>
          ) : (
            <div>
              <RenderModal user={props} />
            </div>
          )}
        </div>
      );
    }
  };

  RenderTaskTwoProgress = props => {
    if (props.task.codewars) {
      const codewars = props.task.codewars;
      return (
        <div>
          <p>
            {props.name} submitted his codewars{' '}
            <a
              target="_blank"
              href={`https://www.codewars.com/users/${codewars.codewarsUsername}`}
            >
              username
            </a>{' '}
            at{' '}
          </p>
          {codewars.timeLimit ? (
            <div>
              {props.name} has {codewars.timeLimit} left.
            </div>
          ) : (
            <div>{props.name} has solved n questions.</div>
          )}
        </div>
      );
    }
  };
  RenderTaskThreeProgress = props => {
    if (props) {
      return <div></div>;
    }
  };
  RenderTaskFourProgress = props => {
    if (props) {
      return <div></div>;
    }
  };
  render() {
    console.log(this.props.user.task, 'UserProgress');
    return (
      <div className="user-task-info">
        <Card
          title="User Progress"
          headStyle={{ fontSize: '1.5rem' }}
          style={{ width: 1150, height: '75vh', borderRadius: '5px' }}
        >
          <div>
            {this.props.user.task.html.taskUrl &&
              this.RenderTaskOneProgress(this.props.user)}
            {this.props.user.task.codewars &&
              this.RenderTaskTwoProgress(this.props.user)}
            {/* {this.RenderTaskThreeProgress(this.state.user.task)}
        {this.RenderTaskFourProgress(this.state.user.task)} */}
          </div>
        </Card>
      </div>
    );
  }
}

export default UserProgress;
