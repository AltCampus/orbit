import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Result, Button, Icon } from "antd";

export class FinalReview extends Component {
  render() {
    return (
      <>
        <Result
          icon={<Icon type="clock-circle" theme="twoTone" />}
          title="Your application is under final review. Be patient..."
          extra={
            <Button type="primary">
              <Link to="/profile">See Profile</Link>
            </Button>
          }
        />
      </>
    );
  }
}

export default FinalReview;
