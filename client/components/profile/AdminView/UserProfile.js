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
  Tag,
  Modal
} from "antd";
import AcceptModal from "./AcceptModal";
const { confirm } = Modal;

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
      acceptloading: false,
      interviewloading: false,
      loading: false,
      selectionDetails: {
        batch: null,
        dateOfJoining: null
      }
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
      this.setState({ interviewloading: false });
      await this.props.fetchUser();
      message.success(res.data.message);
    } catch (error) {
      this.setState({ interviewloading: false });
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
      if (navigator.onLine) await this.props.fetchUser();
    }
  };

  handleUserAccept = async data => {
    try {
      this.setState({ acceptloading: true });
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.patch(
        `/api/v1/users/status/${this.props.user._id}`,
        {
          selectedForBatch: data.batchNumber,
          dateOfJoining: new Date(data.joiningDate)
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      this.setState({ acceptloading: false });
      await this.props.fetchUser();
      message.success(res.data.message);
    } catch (error) {
      this.setState({ acceptloading: false });
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
      if (navigator.onLine) await this.props.fetchUser();
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
      this.setState({ loading: false });
      message.error(res.data.message);
      await this.props.fetchUser();
    } catch (error) {
      this.setState({ loading: false });
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
      if (navigator.onLine) await this.props.fetchUser();
    }
  };

  acceptUserInterviewConfirm = id => {
    confirm({
      title: "Do you want to accept this user for interview?",
      onOk: () => {
        this.acceptUserInterview(id);
      }
    });
  };

  rejectUserConfirm = id => {
    confirm({
      title: "Do you want to reject this user?",
      okType: "danger",
      okText: "Reject",
      onOk: () => {
        this.handleUserReject(id);
      }
    });
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
          {user.stage === 4 && !user.canScheduleInterview && !user.interview ? (
            <Button
              type="primary"
              loading={this.state.interviewloading}
              onClick={() => this.acceptUserInterviewConfirm(user._id)}
            >
              Accept for Interview
            </Button>
          ) : (
            ""
          )}
          {user.interview && user.status === "pending" ? (
            <>
              {/* <Button
                type="primary"
                loading={this.state.acceptloading}
                onClick={() => this.handleUserAccept(user._id)}
              >
                Accept
              </Button> */}
              <AcceptModal
                loading={this.state.acceptloading}
                acceptUser={values => this.handleUserAccept(values)}
              />
            </>
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
              onClick={() => this.rejectUserConfirm(user._id)}
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
  calculateTimeTaken = user => {
    const convertInFormat = seconds => {
      return seconds > 86400 * 7 ? (
        <span className="orange-text">
          {`${parseInt(seconds / 86400)} days ${parseInt(seconds / 3600) %
            24} hours ${parseInt(seconds / 60) % 60} minutes`}
        </span>
      ) : (
        <span className="green-text">
          {`${parseInt(seconds / 86400)} days ${parseInt(seconds / 3600) %
            24} hours ${parseInt(seconds / 60) % 60} minutes`}
        </span>
      );
    };
    const timeTaken =
      user.stage === 4 ? (
        convertInFormat(
          parseInt(
            (Math.max(
              new Date(user.quiz && user.quiz.submittedTime).valueOf(),
              new Date(
                user.task.codewars &&
                  (user.task.codewars.forceSubmitTime ||
                    user.task.codewars.endTime)
              ).valueOf()
            ) -
              new Date(user.createdAt).valueOf()) /
              1000
          )
        )
      ) : (
        <span className="red-text">Not reached yet!</span>
      );
    return timeTaken;
  };

  render() {
    const {
      task = {},
      quiz,
      interview,
      canScheduleInterview,
      canTakeQuiz,
      createdAt
    } = this.props.user;
    const { html, codewars } = task;
    return (
      <>
        {this.props.user && (
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
              <Content extra={this.extraContent(this.props)}>
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Status">
                    {this.getStatus(this.props.user.status)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    <a href={`mailto:${this.props.user.email}`}>
                      {this.props.user.email}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone number">
                    <a href={`mailto:${this.props.user.phoneNo}`}>
                      {this.props.user.phoneNo}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Social Profile">
                    <a href={this.props.user.socialProfile} target="_blank">
                      {this.props.user.socialProfile}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Motivation">
                    {this.props.user.motivation}
                  </Descriptions.Item>
                  <Descriptions.Item label="Screener Information Added">
                    {this.props.user.screener ? (
                      <span className="green-text">Yes</span>
                    ) : (
                      <span className="red-text">No</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="SignUp Time">
                    {new Date(createdAt).toDateString() +
                      " " +
                      new Date(createdAt).toLocaleTimeString()}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions column={2}>
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
                        <Tag color="orange">To Be Reviewed</Tag>
                      ) : (
                        <Tag color="green">Reviewed</Tag>
                      )
                    ) : (
                      <Tag color="gold">Quiz not submitted</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Time Taken to reach stage 4">
                    {this.calculateTimeTaken(this.props.user)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Interview">
                    {interview ? (
                      new Date(interview.startTime) < new Date() ? (
                        interview.review ? (
                          <Tag color="green">Interview Reviewed</Tag>
                        ) : (
                          <Tag color="lime">Interview To be Reviewed</Tag>
                        )
                      ) : (
                        <Tag color="gold">Interview Scheduled</Tag>
                      )
                    ) : canScheduleInterview ? (
                      <Tag color="blue">Can Schedule Interview</Tag>
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
