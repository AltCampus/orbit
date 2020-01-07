import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";

function ScheduleSuccess(props) {
  return (
    <>
      <Result
        status="success"
        title="Your interview has been scheduled successfully"
        subTitle={`Your interview has been scheduled for ${new Date(
          props.interviewStartTime
        ).toDateString()} ${new Date(
          props.interviewStartTime
        ).toLocaleTimeString()} - ${new Date(
          props.interviewEndTime
        ).toLocaleTimeString()}`}
        extra={[
          <Button type="primary" key="profile">
            {" "}
            View profile
          </Button>
        ]}
      />
    </>
  );
}
const mapStateToProps = state => {
  const { interview } = state;
  return {
    ...interview
  };
};
export default connect(mapStateToProps)(ScheduleSuccess);
