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


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Review"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Score">
              {getFieldDecorator('score', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter a score'
                  }
                ]
              })(<InputNumber min={0} max={10} />)}
            </Form.Item>
            <Form.Item label="Review">
              {getFieldDecorator('review', {
                rules: [
                  {
                    required: true,
                    message: 'Please write a review'
                  }
                ]
              })(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      visible: false,
    };
  }

  showModal = () => {
    console.log(this.props.user.task._id);
    console.log(this.props.fetchUsers);
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const data = {
        score: values.score,
        review: values.review,
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

      console.log('Received values of form: ', values);
      console.log(this.state);
      this.props.fetchUsers();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <p>
          {this.props.user.name} submitted his{' '}
          <a target="_blank" href={this.props.user.task.html.taskUrl}>
            assignment
          </a>{' '}
          at {new Date(this.props.user.task.html.submitTime).toLocaleString()}
        </p>
        {!this.props.user.task.html.review ? (
          <div>
            <Button type="primary" onClick={this.showModal}>
              Rate/Review Assignment
            </Button>
          </div>
        ) : (
          <div>
            {this.updateReviewState}
            <p>You have rated this assignment {this.props.user.task.html.score}/10</p>
            <p>
              Review:
              {this.props.user.task.html.review}
            </p>
            <Button type="primary" onClick={this.showModal}>
              Edit Review
            </Button>
          </div>
        )}

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
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
    console.log(this.props.fetchUsers, 'FROM RENDER PROGRESS');
    if (props.task.html) {
      return (
        <div>
          <ReviewPage user={props} fetchUsers={this.props.fetchUsers} />
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
            {this.props.user.task &&
              this.props.user.task.html.taskUrl &&
              this.RenderTaskOneProgress(this.props.user)}
            {this.props.user.task &&
              this.props.user.task.codewars &&
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
