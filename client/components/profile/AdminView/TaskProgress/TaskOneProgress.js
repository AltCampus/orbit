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

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
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
              {getFieldDecorator("score", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a score"
                  }
                ]
              })(<InputNumber min={0} max={10} />)}
            </Form.Item>
            <Form.Item label="Review">
              {getFieldDecorator("review", {
                rules: [
                  {
                    required: true,
                    message: "Please write a review"
                  }
                ]
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
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_KK8u4YJawDr4MLwxsrB71MHU7XT3J31mJWU_CxuSYBS4tt_K"
          />
        }
        actions={[
          <Button href={`${htmlTask.taskUrl}`} target="_blank" type="link">
            <Icon type="code-sandbox" key="setting" />
          </Button>,
          <Button type="link" onClick={() => this.showModal()}>
            <Icon type="edit" key="edit" />
          </Button>
        ]}
      >
        <div style={{ marginBottom: "20px" }}>
          <Meta title="Progress" />
          <Progress percent={100} size="small" />
        </div>
        {htmlTask.taskUrl ? (
          <div>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
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
