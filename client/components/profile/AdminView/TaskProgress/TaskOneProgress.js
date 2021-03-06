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

const HtmlReviewForm = Form.create({ name: "form_in_modal" })(
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
                initialValue: this.props.score
              })(<InputNumber min={0} max={10} />)}
            </Form.Item>
            <Form.Item label="Review">
              {getFieldDecorator("review", {
                rules: [
                  {
                    required: true,
                    message: "Please write a review"
                  }
                ],
                initialValue: this.props.review
              })(<TextArea type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class TaskOneProgress extends Component {
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
        review: values.review,
        taskId: this.props.user.task._id
      };
      await axios.post(
        `/api/v1/task/review/html`,
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
    const htmlTask = this.props.user.task.html;
    const { visible, loading } = this.state;
    return (
      <Card
        className="ant-card-html"
        style={{ width: 300 }}
        cover={<div></div>}
        actions={[
          <Button href={`${htmlTask.taskUrl}`} target="_blank" type="link">
            <Icon type="code-sandbox" key="setting" />
          </Button>,
          <Button type="link" onClick={() => this.showModal()}>
            <Icon type="edit" key="edit" />
          </Button>
        ]}
      >
        {htmlTask.taskUrl ? (
          <div>
            <HtmlReviewForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              score={htmlTask.score}
              review={htmlTask.review}
            />
            <Descriptions>
              <Descriptions.Item label="Submission Date">
                {new Date(htmlTask.submitTime).toLocaleString().split(",")[0]}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Submission Time">
                {new Date(htmlTask.submitTime).toLocaleString().split(",")[1]}
              </Descriptions.Item>
            </Descriptions>
            {htmlTask.score ? (
              <div>
                <Descriptions>
                  <Descriptions.Item label="Score">
                    {htmlTask.score}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item label="Review">
                    {htmlTask.review}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            ) : (
              ""
            )}{" "}
            {/* <ReviewPage user={this.props.user} fetchUsers={this.props.fetchUsers} /> */}
          </div>
        ) : (
          ""
        )}
      </Card>
    );
  }
}

export default TaskOneProgress;
