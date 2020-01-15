import React, { Component, Fragment } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Icon, Tag, Typography } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    fixed: "left",
    // textWrap: "word-break",

    sorter: (objA, objB) => objA.name.localeCompare(objB.name),
    sortDirections: ["ascend", "descend"],
    render: (id, data) => (
      <div
        style={{
          wordWrap: "break-word",
          wordBreak: "break-word",
          width: "max-content"
        }}
      >
        {" "}
        <Link to={`/user/${data._id}`}> {id}</Link>
      </div>
    )
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "_id"
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      { text: "Accepted", value: "accept" },
      { text: "Pending", value: "pending" },
      { text: "Rejected", value: "reject" }
    ],

    onFilter: (value, record) => record.status === value,
    render: status => {
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
    }
  },
  {
    title: "PhoneNumber",
    dataIndex: "phoneNo",
    key: "phoneNo"
  },
  {
    title: "Stage",
    dataIndex: "stage",
    filters: [
      { text: "stage 1", value: 1 },
      { text: "stage 2", value: 2 },
      { text: "stage 3", value: 3 },
      { text: "stage 4", value: 4 }
    ],

    onFilter: (value, record) => record.stage === value,
    sorter: (objA, objB) => objA.stage - objB.stage,
    sortDirections: ["ascend", "descend"]
  },
  {
    title: "Score",
    dataIndex: "totalScore",
    key: "totalScore",
    sorter: (objA, objB) => objA.totalScore - objB.totalScore,
    sortDirections: ["ascend", "descend"]
  },
  {
    title: "Social Profile",
    dataIndex: "socialProfile",
    key: "socialProfile",
    render: profileLink => (
      <a target="_blank" href={profileLink}>
        {profileLink}
      </a>
    )
  },
  {
    title: "SignUp Time",
    dataIndex: "createdAt",
    key: "createdAt",

    sorter: (objA, objB) =>
      Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt)),
    sortDirections: ["descend"],
    render: time => (
      <div
        style={{
          wordWrap: "break-word",
          wordBreak: "break-word",
          width: "max-content"
        }}
      >
        {new Date(time).toDateString() +
          " " +
          new Date(time).toLocaleTimeString()}
      </div>
    )
  },
  {
    title: "Time Taken to Reach Stage 4",
    dataIndex: "createdAt",
    key: "timeTakenToReachStage",
    filters: [
      { text: "Not completed yet", value: 0 },
      { text: "Less than a week", value: 1 },
      { text: "More than a week", value: 2 }
    ],
    onFilter: (value, user) => {
      console.log(
        user.stage === 4 &&
          parseInt(
            Math.max(
              new Date(user.quiz && user.quiz.submittedTime).valueOf(),
              new Date(
                user.task.codewars && user.task.codewars.endTime
              ).valueOf()
            ) - new Date(user.createdAt).valueOf()
          ),
        86400 * 7 * 1000
      );
      return (
        (user.stage === 4
          ? parseInt(
              Math.max(
                new Date(user.quiz && user.quiz.submittedTime).valueOf(),
                new Date(
                  user.task.codewars && user.task.codewars.endTime
                ).valueOf()
              ) - new Date(user.createdAt).valueOf()
            ) >
            86400 * 7 * 1000
            ? 2
            : 1
          : 0) === value
      );
    },
    // sorter: (objA, objB) =>
    //   Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt)),
    // sortDirections: ["descend"],
    render: (time, user) => {
      const convertInFormat = seconds => {
        return `${parseInt(seconds / 86400)} days ${parseInt(seconds / 3600) %
          24} hours ${parseInt(seconds / 60) % 60} minutes`;
      };
      const timeTaken =
        user.stage === 4
          ? convertInFormat(
              parseInt(
                (Math.max(
                  new Date(user.quiz && user.quiz.submittedTime).valueOf(),
                  new Date(
                    user.task.codewars && user.task.codewars.endTime
                  ).valueOf()
                ) -
                  new Date(time).valueOf()) /
                  1000
              )
            )
          : "Not completed yet!";
      return (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            width: "max-content"
          }}
        >
          {timeTaken}
        </div>
      );
    }
  },
  {
    title: "Task 1 Status",
    dataIndex: "task.html",
    filters: [
      { text: "Not Submitted yet", value: 0 },
      { text: "To Be Reviewed", value: 1 },
      { text: "Reviewed", value: 2 }
    ],
    onFilter: (value, user) => {
      const { html } = user.task;
      return (html.submitTime ? (html.score == null ? 1 : 2) : 0) === value;
    },
    render: html => {
      if (html.submitTime) {
        if (html.score == null) {
          return <Tag color="orange">To Be Reviewed</Tag>;
        } else {
          return <Tag color="green">Reviewed</Tag>;
        }
      } else {
        return <Tag color="volcano">Not submitted yet</Tag>;
      }
    }
  },
  {
    title: "Task 2 Status",
    dataIndex: "task.codewars",
    filters: [
      { text: "Not Submitted yet", value: 0 },
      { text: "Timer OnGoing", value: 1 },
      { text: "To Be Reviewed", value: 2 },
      { text: "Reviewed", value: 3 }
    ],
    onFilter: (value, user) => {
      const { codewars } = user.task;
      return (
        (codewars
          ? new Date(codewars.endTime) < new Date()
            ? codewars.score == null
              ? 2
              : 3
            : 1
          : 0) === value
      );
    },
    render: codewars => {
      if (codewars) {
        if (new Date(codewars.endTime) < new Date()) {
          if (codewars.score == null) {
            return <Tag color="orange">To Be Reviewed</Tag>;
          } else {
            return <Tag color="green">Reviewed</Tag>;
          }
        } else {
          return <Tag color="gold">Timer OnGoing</Tag>;
        }
      } else {
        return <Tag color="volcano">Not submitted yet</Tag>;
      }
    }
  },
  {
    title: "Quiz Status",
    dataIndex: "quiz",
    filters: [
      { text: "Not taken quiz yet", value: 0 },
      { text: "Quiz not submitted", value: 1 },
      { text: "To Be Reviewed", value: 2 },
      { text: "Reviewed", value: 3 }
    ],
    onFilter: (value, user) => {
      const { quiz, canTakeQuiz } = user;

      return (
        (canTakeQuiz
          ? 0
          : quiz.submittedTime
          ? quiz.totalScore == null
            ? 2
            : 3
          : 1) === value
      );
    },
    render: (quiz, user) => {
      if (user.canTakeQuiz) {
        return <Tag color="volcano">Not taken quiz yet</Tag>;
      } else {
        if (quiz.submittedTime) {
          if (quiz.totalScore == null) {
            return <Tag color="orange">To Be Reviewed</Tag>;
          } else {
            return <Tag color="green">Reviewed</Tag>;
          }
        } else {
          return <Tag color="gold">Quiz not submitted</Tag>;
        }
      }
    }
  },
  {
    title: "Interview Status",
    dataIndex: "interview",
    filters: [
      { text: "Not Accepted for Interview", value: 0 },
      { text: "Can Schedule Interview", value: 1 },
      { text: "Interview Scheduled", value: 2 },
      { text: "Interview To Be Reviewed", value: 3 },
      { text: "Interview Reviewed", value: 4 }
    ],
    onFilter: (value, user) => {
      const { interview, canScheduleInterview } = user;

      return (
        (interview
          ? new Date(interview.startTime) < new Date()
            ? interview.review
              ? 4
              : 3
            : 2
          : canScheduleInterview
          ? 1
          : 0) === value
      );
    },
    render: (interview, user) => {
      if (interview) {
        if (new Date(interview.startTime) < new Date()) {
          return interview.review ? (
            <Tag color="green">Interview Reviewed</Tag>
          ) : (
            <Tag color="lime">Interview To Be Reviewed</Tag>
          );
        } else {
          return <Tag color="gold">Interview Scheduled</Tag>;
        }
      } else {
        if (user.canScheduleInterview) {
          return <Tag color="blue">Can Schedule Interview</Tag>;
        } else {
          return <Tag color="volcano">Not Accepted for Interview</Tag>;
        }
      }
    }
  }
];

class ToggleStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  async componentDidMount() {
    const response = await axios.get("/api/v1/users/", {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("authToken"))
      }
    });
    this.setState({
      users: response.data.users
    });
  }

  getItemId = props => {
    props.forEach(user => {
      return user._id;
    });
  };

  renderTable = props => {
    var dataSource = this.state.users;
    switch (props) {
      case "all":
        break;
      case "stageOne":
        dataSource = dataSource.filter(user => user.stage === 1);
        break;
      case "stageTwo":
        dataSource = dataSource.filter(user => user.stage === 2);
        break;
      case "stageThree":
        dataSource = dataSource.filter(user => user.stage === 3);
        break;
      case "toBeReviewed":
        dataSource = dataSource.filter(
          user =>
            user.stage === 4 &&
            user.status === "pending" &&
            !user.canScheduleInterview &&
            !user.interview
        );
        break;
      case "stageFour":
        dataSource = dataSource.filter(
          user =>
            user.stage === 4 &&
            user.status === "pending" &&
            (user.interview || user.canScheduleInterview)
        );
        break;
      case "Accepted/Rejected":
        dataSource = dataSource.filter(user => user.status !== "pending");
        break;
      default:
        break;
    }
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} rowKey="_id" />
      </div>
    );
  };
  render() {
    return (
      <Fragment>
        <div>
          {!this.state.users ? (
            <Icon
              type="loading"
              style={{ fontSize: 100, width: "100%", paddingTop: "7rem" }}
              spin
            />
          ) : (
            <div>{this.renderTable(this.props.name)}</div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default ToggleStage;
