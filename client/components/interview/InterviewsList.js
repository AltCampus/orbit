import React, { Component } from "react";
import axios from "axios";
import { Table, Icon, message, Typography, Divider, Tabs } from "antd";
const { TabPane } = Tabs;
const { Title } = Typography;
import { Link } from "react-router-dom";
import AdminWrapper from "../dashboard/admin/AdminWrapper";

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

    sorter: (objA, objB) => new Date(objA.startTime) - new Date(objB.startTime),
    sortDirections: ["descend", "ascend"],
    render: (id, data) => (
      <span>{`${new Date(data.startTime).toDateString()}, ${new Date(
        data.startTime
      ).toLocaleTimeString()} - ${new Date(
        data.endTime
      ).toLocaleTimeString()}`}</span>
    )
  },

  {
    title: "SignUp Time",
    dataIndex: "user.createdAt",
    key: "_id",

    sorter: (objA, objB) =>
      Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt)),
    sortDirections: ["descend", "ascend"],
    render: time => new Date(time).toLocaleString()
  }
];

class InterviewsList extends Component {
  constructor(props) {
    super();
    this.state = {
      dataSource: null,
      activeKey: "1"
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/api/v1/interviews/scheduled", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({
        allData: res.data.scheduledInterviews,
        dataSource: null
      });
      this.setActiveTab(this.state.activeKey);
    } catch (error) {
      console.error(error);
      message.error("Failed to load interviews list");
    }
  }
  setActiveTab(key) {
    if (key === "1") {
      this.setState({
        activeKey: "1",
        dataSource: this.state.allData
          .filter(interview => new Date(interview.startTime) > new Date())
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      });
    }
    if (key === "2") {
      this.setState({
        activeKey: "2",
        dataSource: this.state.allData
          .filter(interview => new Date(interview.startTime) < new Date())
          .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
      });
    }
  }
  render() {
    return (
      <AdminWrapper activeKey={"3"}>
        <Title level={2}>Scheduled Interviews </Title>
        <Divider />
        <Tabs
          defaultActiveKey={this.state.activeKey}
          onChange={key => this.setActiveTab(key)}
        >
          <TabPane tab="Upcoming Interviews" key="1"></TabPane>
          <TabPane tab="Recent Interviews" key="2"></TabPane>
        </Tabs>
        {this.state.dataSource && (
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            rowKey="_id"
          />
        )}
      </AdminWrapper>
    );
  }
}

export default InterviewsList;
