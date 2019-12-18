import React from "react";
import axios from "axios";

import { Typography, Modal, Form, InputNumber } from "antd";
const { Text } = Typography;

const ReviewQuizModal = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      console.log(this.props);
      const radioStyle = {
        display: "block",
        height: "30px",
        lineHeight: "30px",
        marginBottom: "3px"
      };
      const { visible, onCancel, onCreate, form, answers } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add question"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            {Object.keys(answers).map(questionId => (
              <div className="answer-container">
                <Text strong>{answers[questionId].questionTitle}</Text>
                <Text code>Answer Submitted: {answers[questionId].answer}</Text>
                {answers[questionId].type === "MCQ" && <Text mark>Correct Answer: {answers[questionId].correctAnswer}</Text>}
                <Form.Item>
                  {getFieldDecorator(questionId, {
                    initialValue: answers[questionId].point
                  })(<InputNumber min={0} max={answers[questionId].maximumPoint} name="point" />)}
                </Form.Item>
              </div>
            ))}
          </Form>
        </Modal>
      );
    }
  }
);

export default ReviewQuizModal;
