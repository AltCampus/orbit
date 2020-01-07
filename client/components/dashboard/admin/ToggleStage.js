import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Icon } from "antd";

import { getApplicantsList } from "../../../actions/admin_dashboard.js";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "_id"
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (objA, objB) => objA.name.localeCompare(objB.name),
    sortDirections: ["ascend", "descend"],
    render: (id, data) => <Link to={`/user/${data._id}`}> {id}</Link>
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      { text: "accept", value: "accept" },
      { text: "pending", value: "pending" },
      { text: "reject", value: "reject" }
    ],

    onFilter: (value, record) => record.status === value
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
    render: time => new Date(time).toLocaleString()
  }
];

// React functional component
const ToggleStage = props => {

  useEffect(() => {
    props.getApplicantsList();

  }, []);

  const getItemId = props => {
    props.forEach(user => {
      return user._id;
    });
  };

  const renderTable = name => {
    var dataSource = props.applicants;
    switch (name) {
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
          user => user.stage === 4 || user.stage === 3 || user.stage === 2
        );
        dataSource = dataSource.filter(user => !user.task.html.score);
        dataSource = dataSource.filter(user => user.task.codewars);
        dataSource = dataSource.filter(user => !user.task.codewars.score);
        dataSource = dataSource.filter(user => user.quiz);
        dataSource = dataSource.filter(user => !user.quiz.score);
        // dataSource = dataSource.filter(user => console.log("user"))
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
    return (
      <Fragment>
        <div>
          {!props.applicants ? (
            <Icon
              type="loading"
              style={{ fontSize: 100, width: "100%", paddingTop: "7rem" }}
              spin
            />
          ) : (
            <div>{renderTable(props.name)}</div>
          )}
        </div>
      </Fragment>
    );
  }

const mapStateToProps = state => {
  const { applicants } = state.admin_applicants;
  return {
    applicants
  }
}

export default connect(mapStateToProps, { getApplicantsList })(ToggleStage);
