import React from "react";
import { Link } from "react-router-dom";
import { Timeline, Button, Card, Typography, Divider } from "antd";
const { Title } = Typography;

import UserWrapper from "../dashboard/user/UserWrapper";

export default function Instructions() {
  return (
    <UserWrapper activeKey={"0"}>
      <Title level={2} style={{ marginBottom: 0 }}>
        Instructions
      </Title>
      <Divider />
      <div className="task-introduction-page">
        <div className="task-introduction-container">
          <p className="task-introduction">
            <ul>
              <li>
                There are four parts to the assignment. Instructions, tips and
                resources are provided below for each task.
              </li>
              <li>
                {" "}
                The tasks consists of questions carefully designed to help you
                self-assess your comprehension of the information presented on
                the topics covered in the module.
              </li>
              <li>
                All tasks are compulsory. One cannot attempt the further tasks
                unless the active task is completed.
              </li>
              <li>
                The total score for the quiz is based on your responses to all
                questions.
              </li>
              <li>
                Even if you have no prior programming experience you will be
                able to do all of it just by following the instructions and
                applying yourself. Please don’t get overwhelmed, YOU CAN DO IT.
              </li>
            </ul>
          </p>
        </div>
        <ul>
          <li>
            <div>
              <h1 className="task-heading">Task one:</h1>
              <Timeline>
                <Timeline.Item>
                  Read the instructions of taks one carefully.
                </Timeline.Item>
                <Timeline.Item>
                  Take help from the provided resources.
                </Timeline.Item>
                <Timeline.Item>Create a CodeSandbox account.</Timeline.Item>
                <Timeline.Item>
                  Submit your CodeSandbox url after completing the task.
                </Timeline.Item>
              </Timeline>
            </div>
          </li>
          <li>
            <div>
              <h1 className="task-heading">Task two:</h1>
              <Timeline>
                <Timeline.Item>
                  Read the instructions of task two carefully.
                </Timeline.Item>
                <Timeline.Item>
                  Use the resources to learn JavaScript.
                </Timeline.Item>
                <Timeline.Item>Create a CodeWars account.</Timeline.Item>
                <Timeline.Item>
                  Solve as many katas based on your learning.
                </Timeline.Item>
                <Timeline.Item>
                  Submit your CodeWars username after completing the task.
                </Timeline.Item>
              </Timeline>
            </div>
          </li>
          <li>
            <div>
              <h1 className="task-heading">Task three:</h1>
              <Timeline>
                <Timeline.Item>
                  Task three consists of objective and subjective questions.
                </Timeline.Item>
                <Timeline.Item>
                  These are general questons that hold value as points.
                </Timeline.Item>
                <Timeline.Item>
                  All of the questions are compulsory to attempt.
                </Timeline.Item>
              </Timeline>
            </div>
          </li>
          <li>
            <div>
              <h1 className="task-heading">Interview:</h1>
              <Timeline>
                <Timeline.Item>
                  The interview will be scheduled on the basis of applicant's
                  performance in the prior tasks.
                </Timeline.Item>
                <Timeline.Item>
                  Once the interview is scheduled, the applicant will be
                  informed via email or reflected in the profile.
                </Timeline.Item>
                <Timeline.Item>
                  The applicant can then schedule the interview based on the
                  available slots.
                </Timeline.Item>
                <Timeline.Item>
                  The interviewer will inform the appllicant via email.{" "}
                </Timeline.Item>
                <Timeline.Item>
                  After the interview is done, the result of the application
                  will be reflected on profile or sent via email.
                </Timeline.Item>
              </Timeline>
            </div>
          </li>
        </ul>
        <div className="instruction-btn">
          <Link to="task/1">
            <Button type="primary">Next</Button>
          </Link>
        </div>
      </div>
    </UserWrapper>
  );
}
