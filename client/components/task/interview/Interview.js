import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, message, Button } from "antd";

import UserWrapper from "../../dashboard/user/UserWrapper";
import ScheduleInterview from "./../../message/ScheduleInterview";
import ScheduleSuccess from "./../../message/ScheduleSuccess";
import { getCurrentUser } from "../../../actions/users";

class Interview extends React.Component {
  render() {
    return (
      <UserWrapper activeKey={"4"}>
        {this.props.user.canScheduleInterview ? (
          <ScheduleSuccess />
        ) : (
          <ScheduleInterview />
        )}
      </UserWrapper>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user
  };
};

export default connect(mapStateToProps, { getCurrentUser })(Interview);
