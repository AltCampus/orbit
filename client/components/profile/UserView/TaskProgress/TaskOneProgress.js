import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Icon, Typography, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskOneProgress = ({ htmlTask, loading }) => {
  return (
    <Card
      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_KK8u4YJawDr4MLwxsrB71MHU7XT3J31mJWU_CxuSYBS4tt_K"
        />
      }
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
