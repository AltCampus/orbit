import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { userStageUpgrade } from "../../../actions/users";
import {
  Card,
  Col,
  Row,
  Input,
  Button,
  message,
  Spin,
  Icon,
  Divider,
  Typography,
  Modal
} from "antd";
import UserWrapper from "../../dashboard/user/UserWrapper";
import TaskCompleted from "../taskCompleted/TaskCompleted";
import CodeWarsTimer from "./CodeWarsTimer";
import PendingTask from "../../message/PendingTask";
const { Title } = Typography;
const { confirm } = Modal;
class TaskTwo extends Component {
  state = {
    username: "",
    onGoing: null,
    timeLeft: null,
    completed: null,
    loading: false
  };
  intervalId = React.createRef();

  startTimer = () => {
    if (!this.state.timeLeft) {
      return;
    }
    this.intervalId = window.setInterval(() => {
      if (this.state.timeLeft === 0) {
        window.clearInterval(this.intervalId);
        return this.getStageData();
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    }, 1000);
  };

  async getStageData() {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        "/api/v1/tasks/2/status",

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      this.setState({
        timeLeft: parseInt(res.data.timeLeft / 1000),
        onGoing: res.data.onGoing,
        completed: res.data.completed,
        loading: false
      });
      if (res.data.stageUpdated) {
        this.props.userStageUpgrade();
      }
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
      }
      this.startTimer();
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
  }
  componentDidMount() {
    if (this.props.user.stage === 2) {
      this.getStageData();
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const res = await axios.post(
        "/api/v1/tasks/2/save",

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
      this.setState({
        loading: false,
        onGoing: true,
        timeLeft: parseInt(res.data.timeLeft / 1000)
      });
      this.startTimer();
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
  forceSubmit = async () => {
    try {
      this.setState({ loading: true });
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.delete(`/api/v1/tasks/2/end`, {
        headers: {
          authorization: token
        }
      });
      this.setState({ loading: false });
      message.success(res.data.message);
      this.props.userStageUpgrade();
    } catch (error) {
      this.setState({ loading: false });
      if (error.response) {
        message.error(error.response.data.error);
      } else {
        message.error("Something went wrong!");
      }
    }
  };
  confirmForceSubmit = () => {
    confirm({
      title: "Do you want to mark this task as completed?",
      okType: "danger",
      okText: "Mark it as completed",
      onOk: () => {
        this.forceSubmit();
      }
    });
  };

  render() {
    return (
      <UserWrapper activeKey={"2"}>
        <Title level={2} style={{ marginBottom: 0 }}>
          Task 2: CodeWars
        </Title>
        <Divider />
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
            {this.props.user.stage < 2 && <PendingTask />}
            {this.props.user.stage > 2 && <TaskCompleted />}
            {this.props.user.stage == 2 && (
              <>
                {this.state.onGoing && (
                  <>
                    <div className="codewars-control">
                      <CodeWarsTimer timeLeft={this.state.timeLeft} />
                      <div className="text margin-bt-1">
                        If you want to mark this task to be completed before the timer ends, you can do so by clicking on the button below.
                      </div>
                      <div className="flash warning margin-bt-1">
                        <span className="strong-text">Note:</span> Once you
                        marked it as completed, your progress you've made till
                        now would be saved. You would be moved to next round and
                        won't be able to continue this round. Number of katas
                        you've solved would be captured. The kata you solved
                        after marking this completed won't be counted.
                      </div>
                      <Button type="danger" onClick={this.confirmForceSubmit}>
                        Mark this task as completed
                      </Button>
                    </div>
                    
                  </>
                )}
                  <div className="task-container">
                    <Title level={4}>Instructions</Title>
                    <Row>
                      <Col>
                        <div>
                          <ul>
                            <li>
                              Create an account on{" "}
                              <a
                                href="https://codewars.com"
                                target="_blank"
                              >
                                CodeWars.
                                </a>{" "}
                              It’s a problem solving platform.
                              </li>
                            <li>
                              A problem on the platform is called a ‘Kata’.
                              </li>
                            <li>
                              This task is to test your problem solving
                              skills, critical thinking and ability to
                              learn. You have to take help from the
                              resources and solve the katas based on your
                              learning.
                            </li>
                            <li>
                              Make an account on CodeWars. Submitting your username below will start this task. You will be given 3 days to do as many katas as possible. The task will automatically be marked completed after the timer ends.
                            </li>
                            <li>
                              Start solving problems on{" "}
                              <a
                                href="https://codewars.com"
                                target="_blank"
                              >
                                https://codewars.com.
                                </a>{" "}
                              There is no minimum or maximum
                              requirement, solve as many problems as you can
                              before the timer ends.
                            </li>                            
                          </ul>
                        </div>
                        <div className="flash warning margin-bt-1">
                          Note - You should first create an account on CodeWars, submit your username here and then start solving problems there.
                        </div>
                        <div>
                          <Title level={4}>Resources</Title>
                          <ul>
                            <li>
                              You can learn basics of JS from{" "}
                              <a
                                href="http://javascript.info"
                                target="_blank"
                              >
                                http://javascript.info{" "}
                              </a>
                              or{" "}
                              <a
                                href="https://www.learn-js.org"
                                target="_blank"
                              >
                                https://www.learn-js.org/
                                  </a>{" "}
                              which ever you feel comfortable with.
                              </li>
                            <li>
                              CodeWars, the platform, might take some time
                              to getting used to. Try to figure out how to
                              use it, Google is your friend. Again, don’t
                              give up. YOU CAN DO IT.
                              </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                 { !this.state.onGoing && (
                  <>
                    <div className="url-input">
                      <form onSubmit={this.handleSubmit}>
                        <Input
                          size="large"
                          name="username"
                          placeholder="Submit your CodeWars username here..."
                          value={this.state.username}
                          onChange={this.handleChange}
                        />
                        <Button
                          className="url-submit"
                          htmlType="submit"
                          type="primary"
                        >
                          Submit
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </>
            )}
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

export default connect(mapStateToProps, { userStageUpgrade })(TaskTwo);
