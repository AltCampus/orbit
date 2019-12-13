import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  message,
  InputNumber,
  Checkbox
} from "antd";
import axios from "axios";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        questionType: "MCQ",
        isActive: true,
        isRandom: true
      };
    }

    onCreate = {};
    handleChange = e => {
      console.log(e.target);
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    };

    handleCheckbox = e => {
      console.log(e);
      const { name, checked } = e.target;
      this.setState({
        [name]: checked
      });
    };

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
          title="Add question"
          okText="Create"
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
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Enter number of point for answering question correctly">
              {getFieldDecorator("point", {
                initialValue: 10
              })(<InputNumber min={1} max={50} name="point" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("isActive", {
                initialValue: true
              })(
                <Checkbox
                  name="isActive"
                  checked={this.state.isActive}
                  onChange={this.handleCheckbox}
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
                  checked={this.state.isRandom}
                  onChange={this.handleCheckbox}
                >
                  Is Question Random?
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("questionType", {
                initialValue: "MCQ"
              })(
                <Radio.Group name="questionType">
                  <Radio value="MCQ" onChange={this.handleChange}>
                    MCQ
                  </Radio>
                  <Radio value="subjective" onChange={this.handleChange}>
                    Subjective
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {this.state.questionType === "MCQ" ? (
              <>
                <Form.Item label="Correct Answer">
                  {getFieldDecorator("answer", {
                    initialValue: "a"
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
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Option B">
                  {getFieldDecorator("optionB", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option B!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Option C">
                  {getFieldDecorator("optionC", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option C!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Option D">
                  {getFieldDecorator("optionD", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the option D!"
                      }
                    ]
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

class Questionnaire extends React.Component {
  state = {
    visible: false
  };
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
      if (values) console.log("Received values of form: ", values);
      const requestBody = {
        questionTitle: values.questionTitle,
        type: values.questionType,
        point: values.point,
        isActive: values.isActive,
        isRandom: values.isRandom
      };
      const options = {
        a: values.optionA,
        b: values.optionB,
        c: values.optionC,
        d: values.optionD
      };

      if (values.questionTitle && values.questionTitle.length < 6) {
        return message.error("Invalid Question Title");
      }
      if (typeof values.isActive !== "boolean") {
        return message.error(
          "Invalid value provided for question active or not"
        );
      }
      if (typeof values.isRandom !== "boolean") {
        return message.error(
          "Invalid value provided for question random or not"
        );
      }
      if (!Number.isInteger(values.point) || !values.point > 0) {
        return message.error("Invalid Point");
      }
      if (!["MCQ", "subjective"].includes(values.questionType)) {
        return message.error("Invalid Question Type");
      }
      if (
        values.questionType === "MCQ" &&
        !["a", "b", "c", "d"].includes(values.answer)
      ) {
        return message.error("Invalid Option for mcq");
      }
      if (
        values.questionType === "MCQ" &&
        !(options && options.a && options.b && options.c && options.d)
      ) {
        return message.error(
          "You must provide value for all 4 options if type of question is MCQ"
        );
      }
      if (values.questionType === "MCQ") {
        requestBody.answer = values.answer;
        requestBody.options = options;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/questions/",
          requestBody,
          {
            headers: {
              authorization: JSON.parse(localStorage.authToken)
            }
          }
        );

        message.success("Your question has been added");
        form.resetFields();
        this.setState({ visible: false });
      } catch (error) {
        if (error.response) {
          return message.error(error.response.message);
        }
        if (navigator.online) {
          return message.error("You are not connected to internet!");
        }
        message.error("Some error occured");
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New Collection
        </Button>
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

export default Questionnaire;
