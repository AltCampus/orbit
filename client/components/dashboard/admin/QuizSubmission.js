import React from "react";
import axios from "axios";
import ReviewQuizModal from "./ReviewQuizModal";

import { Table, Typography, Button, message } from "antd";
const { Column } = Table;
const { Text } = Typography;

class QuizSubmission extends React.Component {
  constructor(props) {
    super();
    this.state = {
      visible: false,
      quizId: props.quizId,
      quizData: {},
      answers: {},
      loading: true,
      status: {}
    };
  }

  getQuiz = async _ => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/quiz/${this.state.quizId}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
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
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  openModal = () => {
    this.setState({ visible: true });
  };
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const requestBody = values;
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/quiz/${this.state.quizId}`,
          requestBody,
          {
            headers: {
              authorization: JSON.parse(localStorage.authToken)
            }
          }
        );

        message.success("Your review for quiz has been updated");
        this.setState({
          visible: false
        });
      } catch (error) {
        if (error.response) {
          return message.error(error.response.message);
        }
        if (!navigator.onLine) {
          return message.error("You are not connected to internet!");
        }
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
      <div>
        {this.state.loading ? (
          "Loading..."
        ) : (
          <>
            {this.state.status.onGoing && "User is currently taking the quiz."}
            {this.state.status.timeOut && (
              <Text type="danger">User has missed to submit the quiz</Text>
            )}
            {this.state.status.submitted && (
              <>
                {this.state.quizData.totalScore == undefined &&
                this.state.quizData.maximumScore == undefined ? (
                  <>
                    <Text type="warning">You still have to rate this user</Text>
                    <Button onClick={this.openModal}>Rate</Button>
                  </>
                ) : (
                  <>
                    <Text type="success">
                      You have rated this quiz Submission{" "}
                      {this.state.quizData.totalScore} points out of{" "}
                      {this.state.quizData.maximumScore}
                    </Text>
                    <Button onClick={this.openModal}>Edit</Button>
                  </>
                )}
                {this.state.quizId && (
                  <ReviewQuizModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
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
    );
  }
}

export default QuizSubmission;
