import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import { connect } from "react-redux";

function TaskCompleted({ title, stage }) {
  return (
    <Result
      status="success"
      title={title}
      subTitle="You've already submitted this task"
      extra={[
        <Link to={`/task/${stage}`}>
          <Button type="primary">Go to next task</Button>
        </Link>,
        <Link to={`/profile`}>
          <Button key="profile">My Profile</Button>
        </Link>
      ]}
    />
  );
}

const mapStateToProps = state => {
  return { stage: state.currentUser.user.stage };
};
export default connect(mapStateToProps)(TaskCompleted);
