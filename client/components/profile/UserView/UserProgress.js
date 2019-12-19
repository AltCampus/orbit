import React, { Component } from "react";
import {
  message,
  Card,
  Input
} from "antd";
import axios from "axios";
import TaskOneProgress from "./TaskProgress/TaskOneProgress";
import TaskTwoProgress from "./TaskProgress/TaskTwoProgress";
import TaskThreeProgress from "./TaskProgress/TaskThreeProgress";
import TaskFourProgress from "./TaskProgress/TaskFourProgress";

const { Meta } = Card;

const { TextArea } = Input;

export class UserProgress extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    this.getTaskData();
  }
  async getTaskData() {
    try{

      this.setState({loading: true});
      const response = await axios.get("http://localhost:3000/api/v1/task/all/status", {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({response: response.data , loading:false})
    } catch (error) {
      console.log(error)
      this.setState({loading: false})
      if(error.response) {
        message.error(error.response.errror)
      }else {
        message.error("Failed to fetch task status")
      }
    }
    
  }

  render() {
    return (
      <>
        <div className="progress-container">
          <TaskOneProgress />
          <TaskTwoProgress />
          <TaskThreeProgress />
          <TaskFourProgress />
        </div>
      </>
    );
  }
}

export default UserProgress;
