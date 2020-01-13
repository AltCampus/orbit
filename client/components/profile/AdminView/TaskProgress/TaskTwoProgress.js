import React, { Component } from "react";
import axios from "axios";

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
} from "antd";

const { Meta } = Card;

const { TextArea } = Input;

const CodewarsReviewForm = Form.create({ name: "form_in_modal" })(
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
              {getFieldDecorator("score", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a score"
                  }
                ],
                initialValue: this.props.initialValue
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
      const response = await axios.post(
        `/api/v1/tasks/two/katas`,
        { props: props.user },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      this.setState({ katasSolved: response.data.data.katasSolved });
    } catch (err) {}
    // try {
    //   await axios.post(
    //     `http://localhost:3000/api/v1/task/review/codewars/`,
    //     { data: props},
    //     {
    //       headers: {
    //         authorization: JSON.parse(localStorage.authToken)
    //       }
    //     }
    //   );
    // } catch (err) {
    //   console.log(err, 'P2');
    // }
  };

  componentDidMount() {
    this.fetchKatas(this.props.props);
  }

  render() {
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
      await axios.post(
        `/api/v1/task/review/codewars`,
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
          className="ant-card-codewars"
          style={{ width: 300 }}
          cover={<div></div>}
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
          {codewars.codewarsUsername ? (
            <div>
              <CodewarsReviewForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                initialValue={codewars.score}
              />
              <Descriptions>
                <Descriptions.Item label="Submission Date">
                  {new Date(codewars.startTime).toLocaleString().split(",")[0]}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="Submission Time">
                  {new Date(codewars.startTime).toLocaleString().split(",")[1]}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="End Date">
                  {new Date(codewars.endTime).toLocaleString().split(",")[0]}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="End Time">
                  {new Date(codewars.endTime).toLocaleString().split(",")[1]}
                </Descriptions.Item>
              </Descriptions>
              {codewars.katasSolved != null ? (
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
            ""
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
            ""
          )}
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
}

export default TaskTwoProgress;
