import React, { Component } from "react";
import axios from "axios";
import { Divider, Button, Icon, Pagination, Radio, Modal, message } from "antd";
import "./quiz.scss";
import QuizTimer from "./QuizTimer";
import TextArea from "antd/lib/input/TextArea";
import TaskCompleted from "../taskCompleted/TaskCompleted";
import QuizPagination from "./QuizPagination";

class Quiz extends Component {
  constructor(props) {
    super();
    this.state = {
      canTakeQuiz: null,
      onGoing: null,
      loading: true,
      questions: null,
      currentQuestionIndex: 0,
      timeLeft: null,
      requestOnGoing: false
    };
    this.intervalId = React.createRef();
  }
  async componentDidMount() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/quiz/status", {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({
        canTakeQuiz: res.data.canTakeQuiz,
        onGoing: res.data.onGoing,
        submitted: res.data.submitted,
        loading: false
      });
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        message.error(error.response.data.error);
      } else {
        message.error("An error occured");
      }
      this.setState({ loading: false });
    }
  }
  startTimer = () => {
    this.intervalId = window.setInterval(() => {
      if (this.state.timeLeft === 0) {
        window.clearInterval(this.intervalId);
        return this.submitQuiz();
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      if (this.state.timeLeft % 60 === 0 && !this.state.requestOnGoing) {
        this.autosaveQuiz();
      }
    }, 1000);
  };
  changeActive(index) {
    if (index >= 0 && index < this.state.questions.length) {
      this.setState({ currentQuestionIndex: index });
    }
  }
  onValueChange = e => {
    let newQuestions = this.state.questions;
    newQuestions[this.state.currentQuestionIndex].answer = e.target.value;
    this.setState({
      questions: newQuestions
    });
  };

  submitQuiz = async event => {
    const formData = {
      questions: this.state.questions.map(question => {
        return { question: question._id, answer: question.answer };
      })
    };
    console.log(formData);
    try {
      this.setState({ loading: true });

      const res = await axios.post(
        "http://localhost:3000/api/v1/quiz/current",
        {
          answers: formData.questions
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      this.setState({
        loading: false,
        submitted: true,
        questions: null,
        onGoing: false,
        canTakeQuiz: false
      });
      message.success(res.status && "Your answers has been submitted.");
    } catch (error) {
      this.setState({loading: false})
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        message.error(error.response.data.error);
      } else {
        message.error("An error occured");
      }
    }
  };

  autosaveQuiz = async event => {
    const formData = {
      questions: this.state.questions.map(question => {
        return { question: question._id, answer: question.answer };
      })
    };
    console.log(formData);
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/quiz/current",
        {
          answers: formData.questions
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      this.setState({ requestOnGoing: false });
    } catch (error) {
      this.setState({ requestOnGoing: false });
      console.log(error);
    }
  };

  quizStatus = () => {
    const total_questions = this.state.questions.length;
    const questionSolved = this.state.questions.reduce(
      (acc, question) => (question.answer ? acc + 1 : acc),
      0
    );
    const msg = `You have solved ${questionSolved} out of ${total_questions}`;
    return msg;
  };

  startQuiz = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/quiz/generate",
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      this.setState({
        questions: res.data.questions,
        timeLeft: parseInt(res.data.timeLeft / 1000),
        loading: false
      });
      this.startTimer();
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        message.error(error.response.data.error);
      } else {
        message.error("An error occured");
      }
      this.setState({ loading: false });
    }
  };

  resumeQuiz = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get("http://localhost:3000/api/v1/quiz/current", {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({
        questions: res.data.quiz.questions,
        timeLeft: parseInt(res.data.timeLeft / 1000),
        loading: false
      });
      this.startTimer();
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        message.error(error.response.data.error);
      } else {
        message.error("An error occured");
      }
      this.setState({ loading: false });
    }
  };
  showConfirm = () => {
    Modal.confirm({
      title: "Do you Want to submit the quiz?",
      content: this.quizStatus(),
      onOk: () => {
        this.submitQuiz();
      }
    });
  };

  render() {
    const currentQuestion =
      this.state.questions &&
      this.state.questions[this.state.currentQuestionIndex];
    const { options } = currentQuestion || {};
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return this.state.loading ? (
      "Loading....."
    ) : this.state.questions ? (
      <>
        <section style={{ textAlign: "center" }}>
          <QuizPagination
            active={this.state.currentQuestionIndex}
            questions={this.state.questions.map(question =>
              Boolean(question.answer)
            )}
            changeActive={index => this.changeActive(index)}
          />
          <QuizTimer time={this.state.timeLeft} />
        </section>
        <div className="container">
          <div className="middle">
            <Divider orientation="left">Question</Divider>
            <p className="question">{currentQuestion.questionTitle}</p>
            {/* <Divider orientation="left">Answer</Divider> */}
            {currentQuestion.type === "MCQ" ? (
              <Radio.Group
                onChange={this.onValueChange}
                value={currentQuestion.answer}
              >
                <Radio style={radioStyle} value={options.a}>
                  {options.a}
                </Radio>
                <Radio style={radioStyle} value={options.b}>
                  {options.b}
                </Radio>
                <Radio style={radioStyle} value={options.c}>
                  {options.c}
                </Radio>
                <Radio style={radioStyle} value={options.d}>
                  {options.d}
                </Radio>
              </Radio.Group>
            ) : (
              <TextArea
                placeholder="Enter your answer here..."
                value={currentQuestion.answer}
                onChange={this.onValueChange}
              />
            )}
          </div>
        </div>
        <div className="next-prev-container container">
          {this.state.currentQuestionIndex === 0 ? (
            <Button
              disabled="true"
              aria-disabled="true"
              onClick={() =>
                this.changeActive(this.state.currentQuestionIndex - 1)
              }
            >
              <Icon type="left" />
              Previous
            </Button>
          ) : (
            <Button
              aria-disabled="false"
              onClick={() =>
                this.changeActive(this.state.currentQuestionIndex - 1)
              }
            >
              <Icon type="left" />
              Previous
            </Button>
          )}
          {this.state.currentQuestionIndex ===
          this.state.questions.length - 1 ? (
            <Button
              disabled
              aria-disabled="true"
              onClick={() =>
                this.changeActive(this.state.currentQuestionIndex + 1)
              }
            >
              Next
              <Icon type="right" />
            </Button>
          ) : (
            <Button
              aria-disabled="false"
              onClick={() =>
                this.changeActive(this.state.currentQuestionIndex + 1)
              }
            >
              Next
              <Icon type="right" />
            </Button>
          )}
        </div>
        <div className="container">
          <Button onClick={() => this.showConfirm()}>Confirm</Button>
        </div>
      </>
    ) : this.state.canTakeQuiz ? (
      <Button onClick={() => this.startQuiz()}>Start Quiz</Button>
    ) : this.state.onGoing ? (
      <Button onClick={() => this.resumeQuiz()}>Resume Quiz</Button>
    ) : this.state.submitted ? (
      <TaskCompleted />
    ) : (
      <span>You've ran out of time.</span>
    );
  }
}

export default Quiz;
