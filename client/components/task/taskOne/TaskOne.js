import React from "react";
import { Card, Col, Row } from "antd";
import { Input } from "antd";
import { Button } from "antd";

export default function TaskOne() {
  return (
    <>
      {/* Task container  */}
      <div style={{ background: "#ECECEC", padding: "20px" }}>
        <Row gutter={16}>
          <Col span={25}>
            <Card title="Instructions" bordered={false}>
              html task
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Input
          size="large"
          placeholder="Submit your codesandbox URL here..."
          style={{ marginBottom: "10px", marginTop: "10px" }}
        />
        <Button type="primary">Submit</Button>
      </div>
    </>
  );
}
