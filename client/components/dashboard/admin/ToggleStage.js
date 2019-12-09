import React, { Component, Fragment } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Icon } from "antd";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "_id",
    render: (id, data) => <Link to={`/user/${data._id}`}> {id}</Link>
  },
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "PhoneNumber",
    dataIndex: "phoneNo",
    key: "phoneNo"
  },
  {
    title: "Stage",
    dataIndex: "stage"
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
    render: time => new Date(time).toLocaleString()
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
    const response = await axios.get("http://localhost:3000/api/v1/users/get");
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
      case "stageZero":
        dataSource = dataSource.filter(user => user.stage === 0);
        break;
      case "ToggleStage":
        dataSource = dataSource.filter(user => user.stage === 1);
        break;
      case "stageTwo":
        dataSource = dataSource.filter(user => user.stage === 2);
        break;
      case "stageThree":
        dataSource = dataSource.filter(user => user.stage === 3);
        break;
      case "stageFour":
        dataSource = dataSource.filter(user => user.stage === 4);
        break;
      default:
        dataSource = dataSource.filter(user => user.stage === 0);
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
