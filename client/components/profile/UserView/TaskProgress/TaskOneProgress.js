import React from "react";
import { Card, Progress, Descriptions } from "antd";
const { Meta } = Card;

const TaskOneProgress = () => {
  return (
    <Card
      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_KK8u4YJawDr4MLwxsrB71MHU7XT3J31mJWU_CxuSYBS4tt_K"
        />
      }
    >
      <div style={{ marginBottom: "20px" }}>
        <Meta title="Progress" />
        <Progress percent={0} size="small" />
      </div>
      <Descriptions>
        <Descriptions.Item label="Score">10</Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Remark">abcdefghijklmnop</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TaskOneProgress;