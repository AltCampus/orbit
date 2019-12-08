import React from "react";
import axios from "axios";

import { Table, Divider, Tag } from "antd";
const { Column } = Table;

class QuestionList extends React.Component {
  state = {
    data: []
  };
  componentDidMount = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/questions/", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      console.log(res);
      this.setState({ data: res.data.questions });
    } catch (error) {}
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
              render={(text, record) => (
                <span>
                  <a>Edit</a>
                  <Divider type="vertical" />
                  <a>Delete</a>
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
