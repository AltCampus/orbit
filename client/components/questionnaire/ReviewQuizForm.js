import React from "react";
import axios from "axios";

import { Typography, Modal, Form, InputNumber, Button, Divider } from "antd";
const { Text, Paragraph } = Typography;

const ReviewQuizForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const radioStyle = {
        display: "block",
        height: "30px",
        lineHeight: "30px",
        marginBottom: "3px"
      };
      const { onCreate, form, answers } = this.props;
      const { getFieldDecorator } = form;
      return (
        // <Modal
        //   visible={visible}
        //   title="Add question"
        //   okText="Create"
        //   onCancel={onCancel}
        //   onOk={onCreate}
        //   okText="Save"
        // >
        <Form layout="vertical" onSubmit={onCreate}>
          {Object.keys(answers).map((questionId, index) => (
            <div className="answer-container">
              <Divider orientation="left">Question</Divider>
              <Text className="question" strong>
                {index + 1}. {answers[questionId].questionTitle}
              </Text>
              {answers[questionId].questionDescription && (
                <div className="review-question-description" dangerouslySetInnerHTML={{ __html: answers[questionId].questionDescription}}>
                </div>
              )}
              <Text strong underline>
                {" "}
                Answer Submitted:-
              </Text>
              <Paragraph className="answer-submitted">
                {answers[questionId].answer}
                {!answers[questionId].answer && (
                  <Text type="danger">
                    User has not answered this question.
                  </Text>
                )}
              </Paragraph>
              {answers[questionId].type === "MCQ" && (
                <>
                  <Text mark>
                    Correct Answer: {answers[questionId].correctAnswer}
                  </Text>
                </>
              )}
              <div>Max points - {answers[questionId].maximumPoint}</div>
              <Form.Item label="Point: ">
                {getFieldDecorator(questionId, {
                  initialValue: answers[questionId].point
                })(
                  <InputNumber
                    min={0}
                    max={answers[questionId].maximumPoint}
                    name="point"
                  />
                )}
              </Form.Item>
            </div>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        // </Modal>
      );
    }
  }
);

export default ReviewQuizForm;
