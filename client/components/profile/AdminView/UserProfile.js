import React, { Component } from "react";
import axios from "axios";
import {
  PageHeader,
  Statistic,
  Descriptions,
  Button,
  message,
  Alert,
  Icon,
  Tag
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
      user: "",
      acceptloading: false,
      interviewloading: false,
      loading: false
    };
  }

  acceptUserInterview = async id => {
    try {
      this.setState({ interviewloading: true });
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.patch(`/api/v1/users/interview/${id}`, null, {
        headers: {
          authorization: token
        }
      });
      this.setState({ user: res.data.user, interviewloading: false });
      message.success(res.data.message);
    } catch (error) {
      this.setState({ interviewloading: false });
      if (error.response) {
        message.error(error.response.data.message);
      }
    }
  };

  handleUserAccept = async id => {
    try {
      this.setState({ acceptloading: true });
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.patch(`/api/v1/users/status/${id}`, null, {
        headers: {
          authorization: token
        }
      });
      this.setState({ user: res.data.user, acceptloading: false });
      message.success(res.data.message);
    } catch (error) {
      this.setState({ acceptloading: false });
      if (error.response) {
        message.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  handleUserReject = async id => {
    try {
      this.setState({ loading: true });
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.delete(`/api/v1/users/status/${id}`, {
        headers: {
          authorization: token
        }
      });
      this.setState({ user: res.data.user, loading: false });
      message.error(res.data.message);
    } catch (error) {
      this.setState({ loading: false });
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
          value={user.totalScore}
          style={{
            marginRight: 32
          }}
        />
        <div
          style={{
            marginRight: 32
          }}
        >
          {user.stage > 3 && !user.canScheduleInterview && !user.interview ? (
            <Button
              type="primary"
              loading={this.state.interviewloading}
              onClick={() => this.acceptUserInterview(user._id)}
            >
              Accept for Interview
            </Button>
          ) : (
            ""
          )}
          {user.interview && user.status === "pending" ? (
            <Button
              type="primary"
              loading={this.state.acceptloading}
              onClick={() => this.handleUserAccept(user._id)}
            >
              Accept
            </Button>
          ) : user.canScheduleInterview ? (
            <Alert
              style={{ display: "inline-block", marginRight: "10px" }}
              message="Interview is not scheduled yet "
              type="info"
              showIcon
            />
          ) : (
            ""
          )}
          {user.stage > 3 && user.status === "pending" ? (
            <Button
              type="danger"
              loading={this.state.loading}
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
  getStatus = status => {
    switch (status) {
      case "pending":
        return <span className="orange-text">Pending</span>;
      case "accept":
        return <span className="green-text">Accepted</span>;
      case "reject":
        return <span className="red-text">Rejected</span>;
      default:
        return status;
    }
  };

  componentDidMount = async () => {
    this.setState({ user: this.props.user });
  };

  render() {
    const {
      task = {},
      quiz,
      interview,
      canScheduleInterview,
      canTakeQuiz
    } = this.props.user;
    const { html, codewars } = task;
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
                <Descriptions size="small" column={3}>
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
                    {this.getStatus(this.props.user.status)}
                  </Descriptions.Item>
                  <Descriptions.Item label="HTML Task">
                    {html.submitTime ? (
                      html.score == null ? (
                        <Tag color="orange">To Be Reviewed</Tag>
                      ) : (
                        <Tag color="green">Reviewed</Tag>
                      )
                    ) : (
                      <Tag color="volcano">Not submitted yet</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Codewars Task">
                    {codewars ? (
                      new Date(codewars.endTime) < new Date() ? (
                        codewars.score == null ? (
                          <Tag color="orange">To Be Reviewed</Tag>
                        ) : (
                          <Tag color="green">Reviewed</Tag>
                        )
                      ) : (
                        <Tag color="gold">Timer OnGoing</Tag>
                      )
                    ) : (
                      <Tag color="volcano">Not submitted yet</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Quiz">
                    {canTakeQuiz ? (
                      <Tag color="volcano">Not taken quiz yet</Tag>
                    ) : quiz.submittedTime ? (
                      quiz.totalScore == null ? (
                        <Tag color="green">Reviewed</Tag>
                      ) : (
                        <Tag color="orange">To Be Reviewed</Tag>
                      )
                    ) : (
                      <Tag color="gold">Quiz not submitted</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Interview">
                    {interview ? (
                      new Date(interview.startTime) < new Date() ? (
                        <Tag color="green">Interview Took Placed</Tag>
                      ) : (
                        <Tag color="lime">Interview Scheduled</Tag>
                      )
                    ) : canScheduleInterview ? (
                      <Tag color="gold">Can Schedule Interview</Tag>
                    ) : (
                      <Tag color="volcano">Not Accepted for Interview</Tag>
                    )}
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
