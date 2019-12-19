import React, { Component } from "react";
import { Result, Button, Icon } from "antd";

export class ScheduleInterview extends Component {
  render() {
    return (
      <>
        <Result
          icon={<Icon type="smile" theme="twoTone" />}
          title="Great, you have been doing well !"
          extra={
            <Button type="primary" key="schedule">
              <a href="https://calendly.com/" target="_blank">
                Schedule Interview
              </a>
            </Button>
          }
        />
      </>
    );
  }
}

export default ScheduleInterview;
