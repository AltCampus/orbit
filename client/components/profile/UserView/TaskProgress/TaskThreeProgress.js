import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Icon, Typography, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskThreeProgress = ({ quiz, loading }) => {
  return (
    <Card
      className="ant-card-quiz"
      cover={<div></div>}
      actions={
        !quiz.reachedStage
          ? undefined
          : quiz.submitted
          ? undefined
          : quiz.onGoing
          ? [
              <Link to={`/task/3`}>
                <Button type="primary">Resume Questionnaire</Button>
              </Link>
            ]
          : [
              <Link to={`/task/3`}>
                <Button type="primary">Start Questionnaire</Button>
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
            <Progress percent={quiz.submitted ? 100 : 0} size="small" />
          </div>
          {!quiz.reachedStage && (
            <Text>You've not reached this stage yet.</Text>
          )}
          {quiz.submitted && (
            <>
              <Descriptions></Descriptions>
              <Descriptions>
                <Descriptions.Item label="Start Time">
                  {new Date(quiz.startTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>{" "}
              <Descriptions>
                <Descriptions.Item label="Submission Time">
                  {new Date(quiz.submittedTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          {quiz.onGoing && (
            <>
              <Descriptions>
                <Descriptions.Item label="Start Time">
                  {new Date(quiz.startTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>{" "}
              <Descriptions>
                <Descriptions.Item label="End Time">
                  {new Date(quiz.endTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          {quiz.canTakeQuiz && <Text>You're now eligible to take questionnaire</Text>}
          {quiz.failedToSubmit && (
              <Text>You've failed to submit questionnaire on time</Text>
          )}
        </>
      )}
    </Card>
  );
};

export default TaskThreeProgress;
