import React, { Component } from "react";
import axios from "axios";
import { Spin, Icon, Divider, Typography } from "antd";
const { Title } = Typography;
import { fetchInterviewStatus } from "../../../actions/interview";
import { connect } from "react-redux";
import FinalReview from "./FinalReview";
import ScheduleSuccess from "./ScheduleSuccess";
import UnderReview from "../../message/UnderReview";
import RejectMessage from "../../message/RejectMessage";
import BookSlot from "./BookSlot";
import AcceptMessage from "../../message/AcceptMessage";
class ScheduleInterview extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    if (!this.props.hasFetchedInterviewStatus) {
      this.props.fetchInterviewStatus();
    }
  }

  render() {
    return (
      <>
        {this.props.isFetchingInterviewStatus ? (
          <div className="loading-div">
            <Spin
              indicator={
                <Icon
                  type="loading"
                  style={{ fontSize: 100, margin: "3rem auto" }}
                />
              }
            />
          </div>
        ) : (
          <>
            {this.props.canScheduleInterview ? (
              <>
                {/* Show the option to schedule interview */}
                <BookSlot />
              </>
            ) : this.props.hasScheduledInterview ? (
              this.props.isFinalReviewInProgress ? (
                <>
                  {/* Interview has taken place. Waiting for final Review from admin. */}
                  {this.props.applicationStatus === "reject" ? (
                    <RejectMessage />
                  ) : this.props.applicationStatus === "accept" ? (
                    <AcceptMessage
                      selectionDetails={this.props.selectionDetails}
                    />
                  ) : (
                    <FinalReview />
                  )}
                </>
              ) : (
                <>
                  {/* Interview has not taken place yet. Show the details of the scheduled interview */}
                  <ScheduleSuccess />
                </>
              )
            ) : (
              <>
                {/*  User is currently under review before interview */}
                {this.props.applicationStatus === "reject" ? (
                  <RejectMessage />
                ) : (
                  <UnderReview />
                )}
              </>
            )}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  const { interview } = state;
  return {
    ...interview,
    applicationStatus: state.currentUser.user.status,
    selectionDetails: state.currentUser.user.selectionDetails
  };
};

export default connect(mapStateToProps, { fetchInterviewStatus })(
  ScheduleInterview
);
