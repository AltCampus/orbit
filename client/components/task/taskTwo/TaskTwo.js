import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateToken, getCurrentUser } from "../../../actions/users";
import { Card, Col, Row, Input, Button, message } from "antd";
import UserWrapper from "../../dashboard/user/UserWrapper";
import TaskCompleted from "../taskCompleted/TaskCompleted";
import CodeWarsTimer from "./CodeWarsTimer";
class TaskTwo extends Component {
  state = {
    username: "",
    onGoing: null,
    timeLeft: null,
    completed: null
  };
  intervalId = React.createRef();

  startTimer = () => {
    if(!this.state.timeLeft) {
      return;
    }
    this.intervalId = window.setInterval(() => {
      if (this.state.time === 0) {
        window.clearInterval(this.intervalId);
        return this.getStageData();
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    }, 1000);
  };

  async getStageData() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/tasks/two/status",
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      this.setState({
        timeLeft: parseInt(res.data.timeLeft/1000),
        onGoing: res.data.onGoing,
        completed: res.data.completed
      });
      if (res.data.stageUpdated) {
        this.props.getCurrentUser();
      }
      if(this.intervalId) {
        window.clearInterval(this.intervalId);       
      }
      this.startTimer()
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
    }
  }
  componentDidMount() {
    if (this.props.user.stage === 2) {
      this.getStageData();
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tasks/two/save",
        {
          username: this.state.username
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      message.success(
        res.status && "Your codewars username has been submitted."
      );
      this.props.getCurrentUser();
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
    }
  };

  render() {
    return (
      <UserWrapper activeKey={"2"}>
        {this.props.user.stage > 2 ? (
          <TaskCompleted />
        ) : this.state.onGoing ? (
          <CodeWarsTimer />
        ) : (
          <>
            <div className="task-container">
              <Row gutter={16}>
                <Col span={25}>
                  <Card title="Task Two" bordered={false}>
                    <div>
                      <ul>
                        <li>
                          <p>
                            Kudos on solving your first task. Task Two is
                            learning based. You need to create an account on
                            <a href="https://www.codewars.com/" target="_blank">
                              <mark>CodeWars</mark>
                            </a>
                            and solve the katas based on your learning from the
                            resources.
                          </p>
                        </li>
                        <li>
                          <p>
                            This task is to test your problem solving skills,
                            critical thinking and ability to learn. You have to
                            take help from the resources and solve the katas
                            based on your learning. This task has a deadline of
                            three days.
                          </p>
                        </li>
                        <li>
                          <p>
                            One can use the resources below to help you with the
                            task.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2>Resources</h2>
                      <ul>
                        <li>
                          <a href="https://medium.freecodecamp.org/learn-html-in-5-minutes-ccd378d2ab72">
                            <mark>JavaScript.info</mark>
                          </a>
                        </li>
                        <li>
                          <a href="https://learn.shayhowe.com/html-css/building-your-first-web-page/">
                            <mark>resources 2</mark>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.abeautifulsite.net/how-to-make-rounded-images-with-css">
                            <mark>resources</mark>
                          </a>
                        </li>
                      </ul>
                      <div className="image-container">
                        <img
                          src="https://www.indiemakers.tools/media/images/codewars.jpg"
                          alt="task"
                          border="0"
                        ></img>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="url-input">
              <Input
                size="large"
                name="username"
                placeholder="Submit your CodeWars username here..."
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Button
                className="url-submit"
                onClick={this.handleSubmit}
                type="primary"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </UserWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user
  };
};

export default connect(mapStateToProps, { getCurrentUser })(TaskTwo);
