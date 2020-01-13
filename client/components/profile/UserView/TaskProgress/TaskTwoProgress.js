import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Icon, Typography, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskTwoProgress = ({ codewarsTask, loading }) => {
  return (
    <Card
      className="ant-card-codewars"
      cover={<div></div>}
      actions={
        !codewarsTask.reachedStage
          ? undefined
          : codewarsTask.completed
          ? undefined
          : codewarsTask.usernameSubmitted
          ? [
              <Link to={`/task/2`}>
                <Button type="primary">Go to Task</Button>
              </Link>
            ]
          : [
              <Link to={`/task/2`}>
                <Button type="primary">Click here to submit username</Button>
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
            <Progress percent={codewarsTask.completed ? 100 : 0} size="small" />
          </div>
          {!codewarsTask.reachedStage ? (
            <Text>You've not reached this stage yet.</Text>
          ) : codewarsTask.completed ? (
            <>
              <Descriptions>
                <Descriptions.Item label="Codewars Username">
                  <a
                    href={`https://codewars.com/users/${codewarsTask.username}`}
                    target="_blank"
                  >
                    {codewarsTask.username}
                  </a>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="Start Time">
                  {new Date(codewarsTask.startTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>{" "}
              <Descriptions>
                <Descriptions.Item label="End Time">
                  {new Date(codewarsTask.endTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : codewarsTask.usernameSubmitted ? (
            <>
              <Descriptions>
                <Descriptions.Item label="Codewars Username">
                  <a
                    href={`https://codewars.com/users/${codewarsTask.username}`}
                    target="_blank"
                  >
                    {codewarsTask.username}
                  </a>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="Start Time">
                  {new Date(codewarsTask.startTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>{" "}
              <Descriptions>
                <Descriptions.Item label="End Time">
                  {new Date(codewarsTask.endTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            <Text>You've not submitted your codewars username</Text>
          )}
        </>
      )}
    </Card>
  );
};

export default TaskTwoProgress;
