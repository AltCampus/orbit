import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Typography, Icon, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskFourProgress = ({ interview, loading }) => {
  return (
    <Card
      className="ant-card-interview"
      cover={<div></div>}
      actions={
        interview.canScheduleInterview && [
          <Link to={`/task/4`}>
            <Button type="primary">Schedule Interview</Button>
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
            <Progress
              percent={interview.hasScheduledInterview ? 100 : 0}
              size="small"
              status={
                interview.rejectedForInterview ||
                interview.rejectedAfterInterview
                  ? "exception"
                  : ""
              }
            />
          </div>
          {!interview.reachedStage ? (
            <Text>You've not reached this stage yet.</Text>
          ) : (
            <>
              {interview.canScheduleInterview && (
                <Text>
                  You've been approved for interview. Now, you have to Schedule
                  your interview
                </Text>
              )}

              {interview.rejectedForInterview && (
                <Text type="danger">
                  We're sorry to inform you that you couldn't qualify for the
                  interview.
                </Text>
              )}

              {interview.isReviewInProgress &&
                !interview.isFinalReviewInProgress && (
                  <Text>
                    Your application is currently under review. Once approved,
                    you can scheduled your Interview.
                  </Text>
                )}

              {interview.selectedAfterInterview && (
                <Text style={{ color: "#52c41a" }}>
                  Congratulations, you have been selected for AltCampus 6 month
                  Full-Stack Program
                </Text>
              )}

              {interview.rejectedAfterInterview && (
                <Text type="danger">
                  We're sorry to inform you that you couldn't qualify for the
                  program.
                </Text>
              )}

              {interview.hasScheduledInterview ? (
                interview.isFinalReviewInProgress ? (
                  <Text>
                    Your application is currently under final review. We would
                    inform you about your final status within few days.
                  </Text>
                ) : (
                  !interview.selectedAfterInterview &&
                  !interview.rejectedAfterInterview && (
                    <>
                      <Text>You've successfully scheduled your interview.</Text>
                      <Descriptions>
                        <Descriptions.Item label="Interview Date">
                          {new Date(interview.startTime).toDateString()}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Descriptions.Item label="Interview Time">
                          {new Date(interview.startTime).toLocaleTimeString()}
                          {" - "}
                          {new Date(interview.endTime).toLocaleTimeString()}
                        </Descriptions.Item>
                      </Descriptions>
                    </>
                  )
                )
              ) : null}
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default TaskFourProgress;
