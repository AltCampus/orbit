import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Typography, Icon, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskFourProgress = ({ interview, loading }) => {
  return (
    <Card
      cover={
        <img
          alt="example"
          src="data:image/png;base64,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"
        />
      }
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
              status={interview.rejectedForInterview ? "" : "exception"}
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
