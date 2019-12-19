import React, { Component } from "react";
import axios from "axios";
import {
  PageHeader,
  Statistic,
  Descriptions,
  Button,
  message,
  Alert
} from "antd";

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  acceptUserInterview = async id => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.patch(
        `http://localhost:3000/api/v1/users/interview/${id}`,
        null,
        {
          headers: {
            authorization: token
          }
        }
      );
      message.success(res.data.message);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  handleUserAccept = async id => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.patch(
        `http://localhost:3000/api/v1/users/status/${id}`,
        null,
        {
          headers: {
            authorization: token
          }
        }
      );
      message.success(res.data.message);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  handleUserReject = async id => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.delete(
        `http://localhost:3000/api/v1/users/status/${id}`,
        {
          headers: {
            authorization: token
          }
        }
      );
      message.error(res.data.message);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  extraContent = ({ user }) => {
    if (user.status === "reject") return;
    return (
      <div
        style={{
          display: "flex",
          width: "max-content",
          justifyContent: "flex-end"
        }}
      >
        <Statistic
          title="Stage"
          value={user.stage}
          style={{
            marginRight: 32
          }}
        />
        <Statistic
          title="Score"
          value={10}
          style={{
            marginRight: 32
          }}
        />
        <div
          style={{
            marginRight: 32
          }}
        >
          {user.stage > 3 && !user.canScheduleInterview ? (
            <Button
              type="primary"
              onClick={() => this.acceptUserInterview(user._id)}
            >
              Accept for Interview
            </Button>
          ) : (
            ""
          )}
          {user.interview ? (
            <Button
              type="primary"
              onClick={() => this.handleUserAccept(user._id)}
            >
              Accept
            </Button>
          ) : (
            <Alert
              style={{ display: "inline-block", marginRight: "10px" }}
              message="Interview is not scheduled yet "
              type="info"
              showIcon
            />
          )}
          {user.stage > 3 ? (
            <Button
              type="danger"
              onClick={() => this.handleUserReject(user._id)}
            >
              Reject
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  componentDidMount = async () => {
    this.setState({ user: this.props.user });
  };

  render() {
    return (
      <>
        {this.state.user && (
          <section>
            <PageHeader
              style={{
                border: "1px solid rgb(235, 237, 240)"
              }}
              onBack={() => window.history.back()}
              avatar={{
                src:
                  "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
              }}
              title={this.props.user.name}
            >
              <Content extra={this.extraContent(this.state)}>
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Name">
                    {this.props.user.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Social Profile">
                    <a href={this.props.user.socialProfile} target="_blank">
                      {this.props.user.socialProfile}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone number">
                    <a href={`mailto:${this.props.user.phoneNo}`}>
                      {this.props.user.phoneNo}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    <a href={`mailto:${this.props.user.email}`}>
                      {this.props.user.email}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Motivation">
                    {this.props.user.motivation}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    {this.props.user.status}
                  </Descriptions.Item>
                </Descriptions>
              </Content>
            </PageHeader>
          </section>
        )}
      </>
    );
  }
}

export default UserProfile;
