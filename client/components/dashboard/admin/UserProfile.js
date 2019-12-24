import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
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
import AdminWrapper from './AdminWrapper';
import './index.css';
import UserProfileWrapper from './userprogress/UserProfileWrapper';

class RenderModal extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e, values) => {
    console.log(values);
    this.setState({
      visible: false
    });
  };

  handleChange = e => {
    console.log(e.target)
    const { name, value } = e.target;
    console.log(name,value)
    this.setState({ [name]: value });
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state)
    const data = {
      score: this.state.score,
      review: this.state.review
    }
    await axios.post(
      `http://localhost:3000/api/v1/task/review/`,
      { data},
      {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      }
    );
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
           <input name="score"
              value={this.state.score}
              onChange={this.handleChange}
              placeholder="score" />
            <textarea
              style={{ display: 'block', margin: '6px' }}
              placeholder="review"
              name="review"
              value={this.state.review}
              onChange={this.handleChange}
            />
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isFetching: false
    };
  }

  RenderTaskOneProgress = props => {
    console.log(props);
    if (props.html) {
      const html = props.html;
      return (
        <div>
          <p>
            {this.state.user.name} submitted his{' '}
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
              <RenderModal taskId={props.id} />
            </div>
          )}
        </div>
      );
    }
  };

  RenderTaskTwoProgress = props => {
    if (props.codewars) {
      const codewars = props.codewars;
      return (
        <div>
          <p>
            {this.state.user.name} submitted his codewars{' '}
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
              {this.state.user.name} has {codewars.timeLimit} left.
            </div>
          ) : (
            <div>{this.state.user.name} has solved n questions.</div>
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
    return (
      <AdminWrapper>
        {!this.state.user ? (
          <Icon
            type="loading"
            style={{ fontSize: 100, width: '100%', paddingTop: '7rem' }}
            spin
          />
        ) : (
          <div className="user-container">
            <div className="user-info">
              <Card
                headStyle={{ fontSize: '1.5rem' }}
                title={this.state.user.name}
                style={{ width: 550, height: '75vh', borderRadius: '5px' }}
              >
                <p className="card-child">{this.state.user.email}</p>
                <p className="card-child">
                  Phone Number:{this.state.user.phoneNo}
                </p>
                <a
                  className="card-child"
                  target="_blank"
                  href={this.state.user.socialProfile}
                >
                  {this.state.user.socialProfile}
                </a>
                <p className="card-child">
                  Motivation:{this.state.user.motivation}
                </p>
                <p className="card-child">Stage:{this.state.user.stage}</p>
                <p className="card-child">
                  SignUp Time:
                  {new Date(this.state.user.createdAt).toLocaleString()}
                </p>
              </Card>
            </div>
            <div className="user-task-info">
              <Card
                title="User Progress"
                headStyle={{ fontSize: '1.5rem' }}
                style={{ width: 1150, height: '75vh', borderRadius: '5px' }}
              >
                <div>
                  {this.state.user.task &&
                    this.RenderTaskOneProgress(this.state.user.task)}
                  {this.state.user.task &&
                    this.RenderTaskTwoProgress(this.state.user.task)}
                  {/* {this.RenderTaskThreeProgress(this.state.user.task)}
                  {this.RenderTaskFourProgress(this.state.user.task)} */}
                </div>
              </Card>
            </div>
          </div>
        )}
        <UserProfileWrapper/>
      </AdminWrapper>
    );
  }

  async componentDidMount() {
    this.setState({ isFetching: true });
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/${this.props.match.params.id}`,
      {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      }
    );
    console.log('CDM', response.data.user);
    this.setState({ user: response.data.user, isFetching: false });
  }
}

export default withRouter(UserProfile);
