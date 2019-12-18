import React, { Component } from "react";
import { Result, Button } from "antd";

export class ScheduleInterview extends Component {
  render() {
    return (
      <>
        <Result
          icon={<Icon type="smile" theme="twoTone" />}
          title="Great, you have been doing well !"
          extra={
            <Button type="primary" key="schedule">
              Schedule Interview
            </Button>
          }
        />
      </>
    );
  }
}

export default ScheduleInterview;
