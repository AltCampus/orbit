import React from "react";
import axios from "axios";
import ReviewQuizForm from "./ReviewQuizForm";
import AdminWrapper from "../dashboard/admin/AdminWrapper";
import "./RateQuiz.scss";

import { Table, Typography, Button, message, Spin, Icon } from "antd";
const { Column } = Table;
const { Text, Paragraph } = Typography;

class RateQuiz extends React.Component {
  constructor(props) {
    super();
    this.state = {
      quizId: props.match.params.id,
      quizData: {},
      answers: {},
      loading: true,
      status: {}
    };
  }

  getQuiz = async _ => {
    try {
      const res = await axios.get(`/api/v1/quiz/${this.state.quizId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({
        quizData: {
          totalScore: res.data.totalScore,
          maximumScore: res.data.maximumScore
        },

        loading: false,
        status: res.data.status,
        answers: res.data.answers.reduce(
          (acc, val) => ({
            ...acc,
            [val.question._id]: {
              questionTitle: val.question.questionTitle,
              answer: val.answerSubmitted,
              correctAnswer:
                val.question.options &&
                val.question.options[val.question.answer],
              type: val.question.type,
              maximumPoint: val.question.point,
              point:
                val.score ||
                (val.question.type === "subjective"
                  ? 0
                  : val.answerSubmitted ===
                    val.question.options[val.question.answer]
                  ? val.question.point
                  : 0)
            }
          }),
          {}
        )
      });
    } catch (error) {
      this.setState({ quizId: null, loading: false });
      message.error("Some error occured");
    }
  };

  componentDidMount = async () => {
    await this.getQuiz();
  };

  // EditQuestionModal
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      answers: this.state.answers.map(answer =>
        name === answer.question.id ? { ...answer, score: value } : answer
      )
    });
  };
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const requestBody = values;
      try {
        this.setState({ loading: true });
        const response = await axios.post(
          `/api/v1/quiz/${this.state.quizId}`,
          requestBody,
          {
            headers: {
              authorization: JSON.parse(localStorage.authToken)
            }
          }
        );
        await this.getQuiz();

        message.success("Your review for quiz has been updated");
        this.setState({
          loading: false
        });
      } catch (error) {
        if (error.response) {
          return message.error(error.response.message);
        }
        if (!navigator.onLine) {
          return message.error("You are not connected to internet!");
        }
        this.setState({ loading: false });
        message.error("Some error occured");
        this.setState({ visible: false });
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <AdminWrapper>
        <div>
          <Button
            shape="circle"
            icon="arrow-left"
            onClick={() => window.history.back()}
          />
          {this.state.loading ? (
            <div className="loading-div">
              <Spin
                indicator={
                  <Icon
                    type="loading"
                    style={{ fontSize: 100, margin: "3rem auto" }}
                  />
                }
              />
            </div>
          ) : (
            <>
              {this.state.status.onGoing &&
                "User is currently taking the quiz."}
              {this.state.status.timeOut && (
                <Text type="danger">User has missed to submit the quiz</Text>
              )}
              {this.state.status.submitted && (
                <>
                  {this.state.quizData.totalScore == undefined &&
                  this.state.quizData.maximumScore == undefined ? (
                    <>
                      <Paragraph type="warning">
                        You still have to rate this user
                      </Paragraph>
                    </>
                  ) : (
                    <>
                      <Paragraph type="success">
                        You have rated this quiz Submission{" "}
                        {this.state.quizData.totalScore} points out of{" "}
                        {this.state.quizData.maximumScore}
                      </Paragraph>
                    </>
                  )}
                  {this.state.quizId && (
                    <ReviewQuizForm
                      wrappedComponentRef={this.saveFormRef}
                      onCreate={this.handleCreate}
                      handleChange={this.handleChange}
                      answers={this.state.answers}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </AdminWrapper>
    );
  }
}

export default RateQuiz;
