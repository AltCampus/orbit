import React, { Component } from 'react';
import axios from 'axios';

import {
  Button,
  Card,
  Icon,
  Progress,
  Descriptions,
  Modal,
  Input,
  Form,
  InputNumber
} from 'antd';

const { Meta } = Card;

const { TextArea } = Input;

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
          </Form>
        </Modal>
      );
    }
  }
);

class RenderCodeWarsProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      katasSolved: null
    };
  }

  fetchKatas = async props => {
    try {
      console.log(props);
      const response = await axios.post(
        `http://localhost:3000/api/v1/tasks/two/katas`,
        { props },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      console.log(response.data);
      this.setState({ katasSolved: response.data.data.katasSolved });
    } catch (err) {
      console.log(err, 'P1');
    }
    try {
      await axios.post(
        `http://localhost:3000/api/v1/task/review/codewars/katas`,
        { katasSolved: this.state.katasSolved },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
    } catch (err) {
      console.log(err, 'P2');
    }
  };

  componentDidMount() {
    console.log('CDM', this.props);
    this.fetchKatas(this.props.props);
  }

  render() {
    console.log(this.props);
    if (this.state.isFetching) {
      return <div>Loading</div>;
    } else {
      return (
        <Descriptions>
          <Descriptions.Item label="Kata's Solved">
            {this.state.katasSolved}
          </Descriptions.Item>
        </Descriptions>
      );
    }
  }
}

class TaskTwoProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      user: null
    };
  }

  showModal = () => {
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
        taskId: this.props.user.task._id
      };
      console.log(data);
      await axios.post(
        `http://localhost:3000/api/v1/task/review/codewars`,
        { data },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );

      this.props.fetchUsers();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    if (this.props.user.task.codewars) {
      const codewars = this.props.user.task.codewars;
      const { visible, loading } = this.state;
      return (
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="data:image/jpeg;base64,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"
            />
          }
          actions={[
            <Button
              href={`https://www.codewars.com/users/${codewars.codewarsUsername}`}
              target="_blank"
              type="link"
            >
              <Icon type="code" key="setting" />
            </Button>,
            <Button type="link" onClick={() => this.showModal()}>
              <Icon type="edit" key="edit" />
            </Button>
          ]}
        >
          <div style={{ marginBottom: '20px' }}>
            <Meta title="Progress" />
            <Progress percent={100} size="small" />
          </div>
          {codewars.codewarsUsername ? (
            <div>
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              />
              <Descriptions>
                <Descriptions.Item label="Submission Date">
                  {new Date(codewars.startTime).toLocaleString().split(',')[0]}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="Submission Time">
                  {new Date(codewars.startTime).toLocaleString().split(',')[1]}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="End Date">
                  {new Date(codewars.endTime).toLocaleString().split(',')[0]}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="End Time">
                  {new Date(codewars.endTime).toLocaleString().split(',')[1]}
                </Descriptions.Item>
              </Descriptions>
              {codewars.katasSolved ? (
                <div>
                  <Descriptions>
                    <Descriptions.Item label="Kata's Solved">
                      {codewars.katasSolved}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              ) : (
                <div>
                  {codewars.endTime > new Date().toISOString() ? (
                    <div>Time Limit is not over yet.</div>
                  ) : (
                    <div>{<RenderCodeWarsProgress props={this.props} />}</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            ''
          )}

          {codewars.score ? (
            <div>
              <Descriptions>
                <Descriptions.Item label="Score">
                  {codewars.score}
                </Descriptions.Item>
              </Descriptions>
            </div>
          ) : (
            ''
          )}
        </Card>
      );
    } else {
      return(
        <div></div>
      )
    }
  }
}

export default TaskTwoProgress;
