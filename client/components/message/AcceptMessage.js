import React from "react";
import { Result, Button, Typography } from "antd";
const { Paragraph, Text, Title } = Typography;

export default function AcceptMessage({ selectionDetails }) {
  return (
    <div className="accept-page">
      <Title level={2} className="green-text">
        Congratulations
      </Title>
      <img
        className="accept-img"
        src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/hire_te5y.svg"
      ></img>
      <Title level={3}>
        You've been selected for batch{" "}
        <span className="grey-text">{selectionDetails.batch}</span>
      </Title>
      <Title level={4}>
        You're requested to arrive here by{" "}
        <span className="grey-text">
          {new Date(selectionDetails.dateOfJoining).toDateString()}
        </span>
      </Title>
    </div>
  );
}
