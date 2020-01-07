import React, { Component } from "react";
import axios from "axios";
import { Table, Icon, message } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Email",
    dataIndex: "user.email",
    key: "_id"
  },
  {
    title: "Name",
    // dataIndex: "user",
    // sorter: (objA, objB) => objA.name.localeCompare(objB.name),
    // sortDirections: ['ascend', 'descend'],
    render: (id, data) => (
      <Link to={`/user/${data.user._id}`}> {data.user.name}</Link>
    )
  },
  {
    title: "Time",
    dataIndex: "startTime",
    render: (id, data) => (
      <span>{new Date(data.startTime).toLocaleString()}</span>
    )
  },

  {
    title: "SignUp Time",
    dataIndex: "user.createdAt",
    key: "_id",

    sorter: (objA, objB) =>
      Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt)),
    sortDirections: ["descend"],
    render: time => new Date(time).toLocaleString()
  }
];

class InterviewsList extends Component {
  constructor(props) {
    super();
    this.state = {
      dataSource: null
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/api/v1/interviews/scheduled", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({ dataSource: res.data.scheduledInterviews });
    } catch (error) {
      console.error(error);
      message.error("Failed to load interviews list");
    }
  }
  render() {
    return (
      <div>
        {this.state.dataSource && (
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            rowKey="_id"
          />
        )}
      </div>
    );
  }
}

export default InterviewsList;
