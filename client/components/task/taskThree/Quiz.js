import React, { Component } from "react";
import axios from "axios";
import {
  Divider,
  Button,
  Icon,
  Pagination,
  Radio,
  Modal,
  message,
  Typography,
  Spin
} from "antd";
import { connect } from "react-redux";
import { userStageUpgrade } from "../../../actions/users";
import QuizTimer from "./QuizTimer";
import TextArea from "antd/lib/input/TextArea";
import TaskCompleted from "../taskCompleted/TaskCompleted";
import QuizPagination from "./QuizPagination";
const { Text, Title } = Typography;

class Quiz extends Component {
  constructor(props) {
    super();
    this.state = {
      canTakeQuiz: null,
      quizTimeLength: null,
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
    this.getStatus();
  }
  getStatus = async () => {
    try {
      const res = await axios.get("/api/v1/quiz/status", {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      if (res.data.stageUpgraded) {
        this.props.userStageUpgrade();
      }
      this.setState({
        canTakeQuiz: res.data.canTakeQuiz,
        quizTimeLength: res.data.quizTimeLength,
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
        message.error("Something went wrong!");
      }
      this.setState({ loading: false });
    }
  };
  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }
  startTimer = () => {
    this.intervalId = window.setInterval(async () => {
      if (this.state.timeLeft === 0) {
        window.clearInterval(this.intervalId);
        await this.autosaveQuiz();
        return await this.getStatus();
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
      this.autosaveQuiz();
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
    try {
      this.setState({ loading: true });

      const res = await axios.post(
        "/api/v1/quiz/current",
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
      this.props.userStageUpgrade();
      message.success(res.status && "Your answers has been submitted.");
    } catch (error) {
      this.setState({ loading: false });
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  autosaveQuiz = async event => {
    const formData = {
      questions: this.state.questions.map(question => {
        return { question: question._id, answer: question.answer };
      })
    };
    try {
      const res = await axios.put(
        "/api/v1/quiz/current",
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
    }
  };

  startQuiz = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get("/api/v1/quiz/generate", {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
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
        message.error("Something went wrong!");
      }
      this.setState({ loading: false });
    }
  };

  resumeQuiz = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get("/api/v1/quiz/current", {
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
        message.error("Something went wrong!");
      }
      this.setState({ loading: false });
    }
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
    return (
      <>
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
                <Divider orientation="left"></Divider>
                <h2 className="question">Q. {currentQuestion.questionTitle}</h2>
                {currentQuestion.questionDescription && (
                  <div className="review-question-description" dangerouslySetInnerHTML={{ __html: currentQuestion.questionDescription}}>
                    
                  </div>
                )}
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
                    autoSize={{ maxRows: 10, minRows: 4 }}
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
              {this.state.questions.filter(question => Boolean(question.answer))
                .length === this.state.questions.length ? (
                <Button onClick={() => this.submitQuiz()}>Submit</Button>
              ) : (
                <Text type="danger">
                  Submit button would be available here once you answer all the
                  questions.
                </Text>
              )}
            </div>
          </>
        ) : this.state.canTakeQuiz ? (
          <div className="quiz-info">
            <Text strong>
              Time Limit: {parseInt(this.state.quizTimeLength / 60)} minutes
              {this.state.quizTimeLength % 60 !== 0 &&
                ` and ${this.state.quizTimeLength % 60} seconds`}
            </Text>
            <Title level={4}>Instructions</Title>
            <ul>
              <li>All questions are compulsory to answer.</li>
              <li>
                Once you start the questionnaire, you will be given{" "}
                {parseInt(this.state.quizTimeLength / 60)} minutes
                {this.state.quizTimeLength % 60 !== 0 &&
                  ` and ${this.state.quizTimeLength % 60} seconds`}{" "}
                to complete it.
              </li>
              <li>
                Please keep a notebook and pen handy while doing this
                questionnaire.
              </li>
            </ul>
            <Button onClick={() => this.startQuiz()}>
              Start Questionnaire
            </Button>
          </div>
        ) : this.state.onGoing ? (
          <div className="quiz-info">
            <Text strong>You still have time to resume quiz.</Text>
            <Text type="danger">Timer is running.</Text>
            <Button onClick={() => this.resumeQuiz()}>Resume Quiz</Button>
          </div>
        ) : this.state.submitted ? (
          <TaskCompleted />
        ) : (
          <span>You've ran out of time.</span>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user
  };
};

export default connect(mapStateToProps, { userStageUpgrade })(Quiz);
