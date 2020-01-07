import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Col, Row, Input, Button, message, Spin, Icon } from "antd";
import UserWrapper from "../../dashboard/user/UserWrapper";
import TaskCompleted from "../taskCompleted/TaskCompleted";

import { userStageUpgrade } from "../../../actions/users";

class TaskOne extends Component {
  state = {
    url: "",
    loading: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const url = this.state.url;
    const csbRegex = /https?:\/\/([a-z0-9]+[.])*csb[.]app/;

    if (url.indexOf("https://codesandbox.io/s") !== 0 && !csbRegex.test(url)) {
      return message.error("Invalid Sandbox Url!");
    }
    try {
      const res = await axios.post(
        "/api/v1/tasks/1/save",

        {
          url: this.state.url
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      message.success(res.status && "Your Project has been submitted.");
      this.setState({ loading: false });

      this.props.userStageUpgrade();
    } catch (error) {
      this.setState({ loading: false });

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
      <>
        <UserWrapper activeKey={"1"}>
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
              {this.props.user.stage > 1 && <TaskCompleted />}
              {this.props.user.stage === 1 && (
                <>
                  <div className="task-container">
                    <Row gutter={16}>
                      <Card title="Task One" bordered={false}>
                        <div>
                          <ul>
                            <li>
                              <p>
                                In this folder there is an image called
                                "html-css-assignment.png".
                              </p>
                            </li>
                            <li>
                              <p>
                                All you have to do is convert the layout given
                                in the PNG image into HTML/CSS format on this
                                CodeSandbox platform -
                                <a
                                  href="https://codesandbox.io"
                                  target="_blank"
                                >
                                  https://codesandbox.io
                                </a>
                              </p>
                            </li>
                            <li>
                              <p>
                                You won’t need any JavaScript. You can use the
                                following sandbox, as the starting point -
                                <a
                                  target="_blank"
                                  href="https://codesandbox.io/s/github/codesandbox-app/static-template"
                                >
                                  https://codesandbox.io/s/github/codesandbox-app/static-template
                                </a>
                              </p>
                            </li>
                            <li>
                              <p>
                                Write all the HTML/CSS code there and submit us
                                the link of the sandbox in response.
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2>Resources</h2>
                          <ul>
                            <li>
                              <a
                                href="https://medium.freecodecamp.org/learn-html-in-5-minutes-ccd378d2ab72"
                                target="_blank"
                              >
                                <mark>freecodecamp</mark>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://learn.shayhowe.com/html-css/building-your-first-web-page/"
                                target="_blank"
                              >
                                <mark>shayhowe</mark>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.abeautifulsite.net/how-to-make-rounded-images-with-css"
                                target="_blank"
                              >
                                <mark>abeautifulsite</mark>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <a
                            href="https://i.ibb.co/7WqkWMD/html-css-assignment.png"
                            download
                            target="_blank"
                          >
                            <Button type="primary" icon="download">
                              Download
                            </Button>
                          </a>
                        </div>
                      </Card>
                    </Row>
                  </div>
                  <div className="url-input">
                    <form onSubmit={this.handleSubmit}>
                      <Input
                        size="large"
                        placeholder="Submit your codesandbox URL here..."
                        type="url"
                        name="url"
                        value={this.state.url}
                        pattern="https://.*"
                        required
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
        </UserWrapper>
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

export default connect(mapStateToProps, { userStageUpgrade })(TaskOne);
