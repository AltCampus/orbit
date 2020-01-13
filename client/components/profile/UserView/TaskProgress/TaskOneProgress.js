import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Icon, Typography, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskOneProgress = ({ htmlTask, loading }) => {
  return (
    <Card
      className="ant-card-html"
      cover={<div></div>}
      actions={
        htmlTask.completed
          ? undefined
          : [
              <Link to={`/task/1`}>
                <Button type="primary">Click here to submit link</Button>
              </Link>
            ]
      }
    >
      {loading ? (
        <Icon type="loading" spin />
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <Meta title="Progress" />
            <Progress percent={htmlTask.completed ? 100 : 0} size="small" />
          </div>
          {htmlTask.completed ? (
            <>
              <Descriptions>
                <Descriptions.Item label="Submision Link">
                  <a href={htmlTask.submissionLink} target="_blank">
                    CodeSandbox Link
                  </a>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="Submission Time">
                  {new Date(htmlTask.submissionTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            <Text>You've not submitted the CodeSandbox Link.</Text>
          )}
        </>
      )}
    </Card>
  );
};

export default TaskOneProgress;
