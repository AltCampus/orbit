import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Col, Row, Input, Button, message } from "antd";

import { getCurrentUser } from "../../../actions/users";

class TaskOne extends Component {
  state = {
    url: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tasks/one/save",
        {
          url: this.state.url
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      message.success(res.status && "Your Project has been submitted.");
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
      <>
        <div className="task-container">
          <Row gutter={16}>
            <Col span={25}>
              <Card title="Task One" bordered={false}>
                <div>
                  <h1 className="heading">
                    <strong> Welcome </strong> to task one of the application
                    process.
                  </h1>
                  <ul>
                    <li>
                      <p>
                        Task one is simple. All you have to do is convert the
                        layout in the image into HTML format.
                      </p>
                    </li>
                    <li>
                      <p>
                        You need to complete the assignment on
                        <a href="https://codesandbox.io/" target="_blank">
                          <mark>CodeSandbox</mark>
                        </a>
                        and submit the URL link below.
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
                        <mark>freecodecamp</mark>
                      </a>
                    </li>
                    <li>
                      <a href="https://learn.shayhowe.com/html-css/building-your-first-web-page/">
                        <mark>shayhowe</mark>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.abeautifulsite.net/how-to-make-rounded-images-with-css">
                        <mark>abeautifulsite</mark>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="image-container">
                  <img
                    src="https://i.ibb.co/chGQtD8/task.png"
                    alt="task"
                    border="0"
                  ></img>
                </div>
              </Card>
            </Col>
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
              onClick={this.handleSubmit}
              type="primary"
            >
              Submit
            </Button>
          </form>
        </div>
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

export default connect(mapStateToProps, { getCurrentUser })(TaskOne);
