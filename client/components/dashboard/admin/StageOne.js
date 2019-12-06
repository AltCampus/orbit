import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Table, Divider, Tag } from "antd";
const { Column, ColumnGroup } = Table;
import {Link} from "react-router-dom"
import { Spin, Icon } from "antd";

const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
    render: id =><Link to={`/user/${id}`} > <a>{id}</a> </Link>
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "PhoneNumber",
    dataIndex: "phoneNo",
    key: "phoneNo"
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage"
  },
  {
    title: "Social Profile",
    dataIndex: "socialProfile",
    key: "socialProfile",
    render: text => (
      <a target="_blank" href={text}>
        {text}
      </a>
    )
  },
  {
    title: "SignUp Time",
    dataIndex: "createdAt",
    key: "createdAt"
  }
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (text, record) => (
  //     <span>
  //       <a>Invite {record.name}</a>
  //       <Divider type="vertical" />
  //       <a>Delete</a>
  //     </span>
  //   )
  // }
];

class StageOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {}
    };
  }

  async componentWillMount() {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/users"
    );
    this.setState({ users: response });
  }

  renderTable = props => {
    var dataSource = this.state.users.data.users;
    console.log(dataSource);
    console.log(props);
    switch (props) {
      case "all":
        break;
      case "stageZero":
        dataSource = dataSource.filter(user => user.stage === 0);
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
      case "stageFour":
        dataSource = dataSource.filter(user => user.stage === 4);
        break;
      default:
        dataSource = dataSource.filter(user => user.stage === 0);
        break;
    }
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  };
  render() {
    console.log("Amaan", this.props.name);
    return (
      <Fragment>
        {console.log(Boolean(this.state.users.data))}
        <div>
          {!this.state.users.data ? (
             <Icon type="loading" style={{ fontSize: 100, width: "100%", paddingTop: "7rem"  }} spin />
          ) : (
            <div>
              {this.renderTable(this.props.name)}
              {console.log(this.state.users.data.users, "ASS")}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default StageOne;
