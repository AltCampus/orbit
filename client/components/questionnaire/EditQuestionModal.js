import React from "react";
import axios from "axios";

import {
  Table,
  Divider,
  Tag,
  Modal,
  Input,
  Form,
  Radio,
  InputNumber,
  Checkbox,
  message
} from "antd";
const { TextArea } = Input;

const EditQuestionModal = Form.create({ name: "form_in_modal" })(
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
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Edit question"
          okText="Update"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Question">
              {getFieldDecorator("questionTitle", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!"
                  }
                ],
                initialValue: this.props.editingData.questionTitle
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Question Description">
              {getFieldDecorator("questionDescription", {
                initialValue: this.props.editingData.questionDescription
              })(<TextArea rows={4} />)}
            </Form.Item>
            <Form.Item label="Enter time alloted for this question (in seconds)">
              {getFieldDecorator("time", {
                initialValue: this.props.editingData.time
              })(<InputNumber min={1} max={999} name="time" />)}
            </Form.Item>
            <Form.Item label="Enter number of point for answering question correctly">
              {getFieldDecorator("point", {
                initialValue: this.props.editingData.point
              })(<InputNumber min={1} max={50} name="point" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("isActive", {
                initialValue: this.props.editingData.isActive
              })(
                <Checkbox
                  name="isActive"
                  checked={this.props.editingData.isActive}
                  onChange={this.props.handleCheckbox}
                >
                  Is Question Active?
                </Checkbox>
              )}
            </Form.Item>{" "}
            <Form.Item>
              {getFieldDecorator("isRandom", {
                initialValue: true
              })(
                <Checkbox
                  name="isRandom"
                  checked={this.props.editingData.isRandom}
                  onChange={this.props.handleCheckbox}
                >
                  Is Question Random?
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("questionType", {
                initialValue: this.props.editingData.questionType
              })(
                <Radio.Group name="questionType">
                  <Radio value="MCQ" onChange={this.props.handleChange}>
                    MCQ
                  </Radio>
                  <Radio value="subjective" onChange={this.props.handleChange}>
                    Subjective
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {this.props.editingData.questionType === "MCQ" ? (
              <>
                <Form.Item label="Correct Answer">
                  {getFieldDecorator("answer", {
                    initialValue: this.props.editingData.answer
                  })(
                    <Radio.Group name="answer">
                      <Radio value={"a"}>A</Radio>
                      <Radio value={"b"}>B</Radio>
                      <Radio value={"c"}>C</Radio>
                      <Radio value={"d"}>D</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item label="Option A">
                  {getFieldDecorator("optionA", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option A!"
                      }
                    ],
                    initialValue: this.props.editingData.options.a
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Option B">
                  {getFieldDecorator("optionB", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option B!"
                      }
                    ],
                    initialValue: this.props.editingData.options.b
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Option C">
                  {getFieldDecorator("optionC", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option C!"
                      }
                    ],
                    initialValue: this.props.editingData.options.c
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Option D">
                  {getFieldDecorator("optionD", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option D!"
                      }
                    ],
                    initialValue: this.props.editingData.options.d
                  })(<Input />)}
                </Form.Item>
              </>
            ) : null}
          </Form>
        </Modal>
      );
    }
  }
);

export default EditQuestionModal;
