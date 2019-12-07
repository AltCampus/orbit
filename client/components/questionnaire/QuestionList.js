import React from "react";
import axios from "axios";

import { Table, Divider, Tag } from "antd";
const { Column } = Table;

class QuestionList extends React.Component {
  state={
    data={
    }
  }
  componentDidMount = async () => {
    try{
      const res = await axios.get("http://localhost:3000/api/v1/question", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authToken"))
        }
      });
    }catch(error){
      
    }
  };
  render() {
    return (
      <div className="search-result-list">
        <Table dataSource={data}>
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
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
      </div>
    );
  }
}

export default QuestionList;
