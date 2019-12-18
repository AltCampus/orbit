import React from "react";
import {Icon, Row, Col, Statistic} from "antd";

const CodeWarsTimer = ({ timeLeft }) => {
  return (
    <div>
        <Icon type="clock-circle" />
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Days" value={parseInt(timeLeft / 86400)} />
        </Col>
        <Col span={6}>
          <Statistic title="Hours" value={parseInt(timeLeft / 3600) % 24} />
        </Col>
        <Col span={6}>
          <Statistic title="Minutes" value={parseInt(timeLeft / 60) % 60} />
        </Col>
        <Col span={6}>
          <Statistic title="Seconds" value={timeLeft % 60} />
        </Col>
      </Row>
    </div>
  );
};

export default CodeWarsTimer