import React from "react";
import { Icon, Row, Col, Statistic, Typography } from "antd";
const { Title } = Typography;

const CodeWarsTimer = ({ timeLeft }) => {
  return (
    <div className="timer-container">
      <Title level={3} className="center-text">
        <Icon type="clock-circle" /> Timer OnGoing
      </Title>
      <Row gutter={16}>
        <Col span={6} className="center-text">
          <Statistic title="Days" value={parseInt(timeLeft / 86400)} />
        </Col>
        <Col span={6} className="center-text">
          <Statistic title="Hours" value={parseInt(timeLeft / 3600) % 24} />
        </Col>
        <Col span={6} className="center-text">
          <Statistic title="Minutes" value={parseInt(timeLeft / 60) % 60} />
        </Col>
        <Col span={6} className="center-text">
          <Statistic title="Seconds" value={timeLeft % 60} />
        </Col>
      </Row>
    </div>
  );
};

export default CodeWarsTimer;
