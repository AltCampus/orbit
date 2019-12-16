import React from "react";
import axios from "axios";

import { Table, Divider, Tag, message } from "antd";
const { Column } = Table;

class QuestionList extends React.Component {
  state = {
    data: []
  };
  componentDidMount = async () => {
    await this.getQuestion();
  };
  getQuestion = async _ => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/questions/", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({ data: res.data.questions });
    } catch (error) {
      message.error("Some error occured");
    }
  };
  deleteQuestion = async id => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/questions/${id}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      message.info("Question has been deleted");
      await this.getQuestion();
    } catch (error) {
      message.error("An error occured");
    }
  };
  render() {
    return (
      <div className="search-result-list">
        {this.state.data && (
          <Table dataSource={this.state.data}>
            <Column title="Question" dataIndex="questionTitle" key="_id" />
            <Column title="Type" dataIndex="type" key="age" />
            <Column title="Point" dataIndex="point" key="address" />
            {/* <Column title="Is Active" dataIndex="isActive" key="address" />
            <Column title="Is Random" dataIndex="isRandom" key="address" /> */}
            <Column
              title="Action"
              key="action"
              render={record => (
                <span>
                  <a>Edit</a>
                  <Divider type="vertical" />
                  <a onClick={() => this.deleteQuestion(record._id)}>Delete</a>
                </span>
              )}
            />
          </Table>
        )}
      </div>
    );
  }
}

export default QuestionList;
