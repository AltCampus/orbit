import React from "react";
import axios from "axios";
import EditQuestionModal from "./EditQuestionModal";

import {
  Table,
  Divider,
  Tag,
  Modal,
  Form,
  InputNumber,
  Checkbox,
  message
} from "antd";
import NewQuestionModal from "./NewQuestionModal";
import AdminWrapper from "../dashboard/admin/AdminWrapper";
const { Column } = Table;

class QuestionList extends React.Component {
  state = {
    visible: false,
    editingQuestionId: null,
    editingData: {},
    editingInitialData: {},
    data: []
  };

  deleteQuestion = async id => {
    try {
      const res = await axios.delete(`/api/v1/questions/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      message.info("Question has been deleted");
      await this.getQuestion();
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  getQuestion = async _ => {
    try {
      const res = await axios.get("/api/v1/questions/", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({ data: res.data.questions });
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  componentDidMount = async () => {
    await this.getQuestion();
  };

  // EditQuestionModal
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      editingData: {
        ...this.state.editingData,
        [name]: value
      }
    });
  };

  handleCheckbox = e => {
    const { name, checked } = e.target;
    this.setState({
      editingData: {
        ...this.state.editingData,
        [name]: checked
      }
    });
  };

  editQuestion = async id => {
    try {
      const res = await axios.get(`/api/v1/questions/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({
        editingQuestionId: id,
        editingData: {
          questionTitle: res.data.question.questionTitle,
          point: res.data.question.point,
          questionType: res.data.question.type,
          time: res.data.question.time,
          questionDescription: res.data.question.questionDescription,
          answer: res.data.question.answer,
          isRandom: res.data.question.isRandom,
          isActive: res.data.question.isActive,
          options: {
            a: res.data.question.options && res.data.question.options.a,
            b: res.data.question.options && res.data.question.options.b,
            c: res.data.question.options && res.data.question.options.c,
            d: res.data.question.options && res.data.question.options.d
          }
        },
        editingInitialData: {
          questionTitle: res.data.question.questionTitle,
          point: res.data.question.point,
          questionType: res.data.question.type,
          answer: res.data.question.answer,
          isRandom: res.data.question.isRandom,
          isActive: res.data.question.isActive,
          options: {
            a: res.data.question.options && res.data.question.options.a,
            b: res.data.question.options && res.data.question.options.b,
            c: res.data.question.options && res.data.question.options.c,
            d: res.data.question.options && res.data.question.options.d
          }
        },
        visible: true
      });
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      editingQuestionId: null,
      editingData: {},
      editingInitialData: {}
    });
  };
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const requestBody = {
        questionTitle: values.questionTitle,
        questionDescription: values.questionDescription,
        time: values.time,
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
        const response = await axios.put(
          `/api/v1/questions/${this.state.editingQuestionId}`,
          requestBody,
          {
            headers: {
              authorization: JSON.parse(localStorage.authToken)
            }
          }
        );

        message.success("Your question has been updated");
        this.getQuestion();
        form.resetFields();
        this.setState({
          visible: false,
          editingQuestionId: null,
          editingData: {},
          editingInitialData: {}
        });
      } catch (error) {
        if (error.response) {
          return message.error(error.response.message);
        }
        if (!navigator.onLine) {
          return message.error("You are not connected to internet!");
        }
        message.error("Something went wrong!");
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <AdminWrapper activeKey={"1"}>
        <NewQuestionModal getQuestion={this.getQuestion} />
        <div style={{ margin: "1rem 0" }}>
          {this.state.data && (
            <Table dataSource={this.state.data}>
              <Column title="Question" dataIndex="questionTitle" key="_id" />
              <Column title="Type" dataIndex="type" key="age" />
              <Column title="Point" dataIndex="point" key="address" />
              <Column title="Time(in seconds)" dataIndex="time" key="time" />
              <Column
                title="Is Active"
                dataIndex="isActive"
                key="isActive"
                render={isActive =>
                  isActive ? (
                    <span className="green-text">Active</span>
                  ) : (
                    <span className="red-text">Not Active</span>
                  )
                }
              />
              {/* <Column title="Is Active" dataIndex="isActive" key="address" />
            <Column title="Is Random" dataIndex="isRandom" key="address" /> */}
              <Column
                title="Action"
                key="action"
                render={record => (
                  <span>
                    <a onClick={() => this.editQuestion(record._id)}>Edit</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.deleteQuestion(record._id)}>
                      Delete
                    </a>
                  </span>
                )}
              />
            </Table>
          )}
          {this.state.editingQuestionId && (
            <EditQuestionModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleChange={this.handleChange}
              handleCheckbox={this.handleCheckbox}
              editingData={this.state.editingData}
            />
          )}
        </div>
      </AdminWrapper>
    );
  }
}

export default QuestionList;
