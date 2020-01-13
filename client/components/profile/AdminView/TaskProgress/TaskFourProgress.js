import React, { useReducer } from "react";
import {
  Button,
  Avatar,
  Card,
  Icon,
  Progress,
  Descriptions,
  Modal,
  Input,
  message,
  Form,
  InputNumber,
  Checkbox
} from "antd";
import axios from "axios";

const { Meta } = Card;

const { TextArea } = Input;
const InterviewReviewForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Interview Review"
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

const TaskFourProgress = ({ user, fetchUser }) => {
  const { interview } = user;
  const [modalVisible, setModalVisible] = React.useState(false);
  const modalFormRef = React.createRef(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const saveReview = () => {
    const { form } = modalFormRef.current.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return message.error("All field required!");
      }
      try {
        hideModal();
        const response = await axios.put(
          `/api/v1/interviews/review/${interview._id}`,
          { review: values.review, score: values.score },
          {
            headers: {
              authorization: JSON.parse(localStorage.authToken)
            }
          }
        );
        message.success("Your review has been updated");
        await fetchUser();
      } catch (error) {
        if (error.response) {
          return message.error(error.response.data.error);
        }
        message.error("Some error occured");
      }
    });
  };

  const saveFormRef = formRef => {
    modalFormRef.current = formRef;
  };

  return (
    <Card
      style={{ width: 300 }}
      className="ant-card-interview"
      cover={<div></div>}
      actions={
        user.interview &&
        new Date(interview.endTime) < new Date() && [
          <Button type="link" onClick={showModal}>
            <Icon type="edit" key="edit" />
            Add Review
          </Button>
        ]
      }
    >
      {user.canScheduleInterview ? (
        <span className="orange-text">
          User has been approved to Schedule Interview
        </span>
      ) : user.interview ? (
        <>
          {new Date(interview.endTime) < new Date() ? (
            <InterviewReviewForm
              wrappedComponentRef={saveFormRef}
              visible={modalVisible}
              onCreate={saveReview}
              onCancel={hideModal}
              score={interview.score}
              review={interview.review}
            />
          ) : (
            <span className="orange-text">Interview is yet to take place</span>
          )}
          <Descriptions>
            <Descriptions.Item label="Interview Date">
              {new Date(interview.startTime).toDateString()}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Interview Time">{`${new Date(
              interview.startTime
            ).toLocaleTimeString()} - ${new Date(
              interview.endTime
            ).toLocaleTimeString()}`}</Descriptions.Item>
          </Descriptions>
          {interview.score != null && (
            <Descriptions>
              <Descriptions.Item label="Score">
                {interview.score}
              </Descriptions.Item>
            </Descriptions>
          )}
          {interview.review != null && (
            <Descriptions>
              <Descriptions.Item label="Review">
                {interview.review}
              </Descriptions.Item>
            </Descriptions>
          )}
        </>
      ) : (
        <span className="red-text">
          User has not been approved to Schedule Interview yet
        </span>
      )}
    </Card>
  );
};

export default TaskFourProgress;
