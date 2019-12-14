import React from "react";
import axios from "axios";
import { Icon, Menu, Dropdown, message, Button } from "antd";

import UserWrapper from "../../dashboard/user/UserWrapper";
import TaskCompleted from "../taskCompleted/TaskCompleted";

class ScheduleInterview extends React.Component {
  state = {
    date: [],
    time: [],
    selectedData: {},
    scheduleData: {}
  };
  getDate = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/interviews/", {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("authToken"))
      }
    });
    this.setState({
      date: res.data.data.map(date => date.date),
      scheduleData: res.data.data
    });
  };
  componentDidMount = async () => {
    await this.getDate();
  };

  filterTime = i => {
    const timeObj = this.state.scheduleData.filter(
      data => data.date === this.state.date[i]
    );
    const time = timeObj.map(data => data.time);
    this.setState({
      time,
      selectedData: { ...this.state.selectedData, date: this.state.date[i] }
    });
  };

  handleTime = i => {
    this.setState({
      selectedData: { ...this.state.selectedData, time: this.state.time[i] }
    });
    console.log(this.state.selectedData);
  };

  handleSubmit = async () => {
    let { time, date } = this.state.selectedData;
    const filterDate = this.state.scheduleData.filter(
      data => data.date === date
    );
    const filterTime = filterDate.filter(data => data.time === time);
    const interview = await axios.put(
      `http://localhost:3000/api/v1/interviews/${filterTime[0]._id}`,
      null,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authToken"))
        }
      }
    );
    console.log(interview);
    message.success("Interview sheduled");
  };

  render() {
    const dateMenu = (
      <Menu>
        {this.state.date.map((date, i) => {
          return (
            <Menu.Item key={i}>
              <a onClick={() => this.filterTime(i)}>{date}</a>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    const timeMenu = (
      <Menu>
        {this.state.time.map((time, i) => {
          return (
            <Menu.Item key={i}>
              <a onClick={() => this.handleTime(i)}>{time}</a>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <UserWrapper>
        {this.state.date && (
          <Dropdown overlay={dateMenu}>
            <a className="ant-dropdown-link" href="#">
              {!this.state.selectedData.date
                ? "Select Date"
                : this.state.selectedData.date}{" "}
              <Icon type="down" />
            </a>
          </Dropdown>
        )}
        {this.state.time && (
          <Dropdown overlay={timeMenu}>
            <a className="ant-dropdown-link" href="#">
              {!this.state.selectedData.time
                ? "Select Time"
                : this.state.selectedData.time}{" "}
              <Icon type="down" />
            </a>
          </Dropdown>
        )}
        {this.state.selectedData.time && this.state.selectedData.date ? (
          <Button onClick={this.handleSubmit}>Schedule Interview</Button>
        ) : (
          ""
        )}
      </UserWrapper>
    );
  }
}

export default ScheduleInterview;
