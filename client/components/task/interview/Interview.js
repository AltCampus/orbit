import React from "react";
import { connect } from "react-redux";

import UserWrapper from "../../dashboard/user/UserWrapper";
import ScheduleInterview from "./ScheduleInterview";
import UnderReview from "./../../message/UnderReview";
import PendingTask from "../../message/PendingTask";

class Interview extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <UserWrapper activeKey={"4"}>
        <ScheduleInterview />
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

export default connect(mapStateToProps)(Interview);
