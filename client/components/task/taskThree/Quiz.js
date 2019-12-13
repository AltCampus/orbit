import React, { Component } from "react";
import { Divider, Button, Icon, Pagination } from "antd";
import QuizPagination from "./QuizPagination";
import "./quiz.scss";
import TextArea from "antd/lib/input/TextArea";

class Quiz extends Component {
  constructor(props) {
    super();
    this.state = {
      questions: [
        {
          options: {
            a: "commit",
            b: "-m",
            c: '"Commit Message"',
            d: "status"
          },
          _id: "5df39817c9d4a928abfadab9",
          questionTitle: "Add: Question 4",
          type: "MCQ"
        },
        {
          options: {
            a: "dsjfndsjfj",
            b: "ndjnjsdnfjsdnj",
            c: "njdcnjsandjns",
            d: "jndjsnfjdns"
          },
          _id: "5df394d8352af21e12f621f0",
          questionTitle: "question 1",
          type: "MCQ"
        },
        {
          options: {
            a: "Java",
            b: "JS",
            c: "Python",
            d: "Python"
          },
          _id: "5df11e9bbac3473ccefee26a",
          questionTitle: "Which is the language we are teaching at AltCampus?",
          type: "MCQ"
        },
        {
          options: {
            a: "jsfdnfjn",
            b: "jndjsnjfnsa",
            c: "jnfjsndjfnsdj",
            d: "jncjsdnjvnsd"
          },
          _id: "5df397999a46232708e31452",
          questionTitle: "question 2",
          type: "MCQ"
        },
        {
          options: {
            a: "logical ",
            b: "illogical",
            c: "stupid",
            d: "nonsense"
          },
          _id: "5df397c19a46232708e31454",
          questionTitle: "question 3",
          type: "subjective"
        }
      ],
      currentQuestion: 4
    };
  }
  componentDidMount() {}
  changeActive(index) {
    if (index >= 0 && index <= this.state.questions.length) {
      this.setState({ currentQuestion: index - 1 });
    }
  }

  render() {
    return (
      <>
        <section style={{ textAlign: "center" }}>
          <QuizPagination
            questions={this.state.questions.length}
            active={this.state.currentQuestion}
            changeActive={index => this.changeActive(index)}
          />
        </section>
        <div className="container">
          <div className="middle">
            <Divider orientation="left">Question</Divider>
            <p className="question">
              {this.state.questions[this.state.currentQuestion].questionTitle}
            </p>
            {/* <Divider orientation="left">Answer</Divider> */}
            {this.state.questions[this.state.currentQuestion].type === "MCQ" ? (
              <></>
            ) : (
              <TextArea />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
