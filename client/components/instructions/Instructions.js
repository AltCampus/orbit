import React from 'react';
import { Timeline } from 'antd';
import UserWrapper from '../dashboard/user/UserWrapper';

export default function Instructions() {
  return (
    <UserWrapper activeKey={'0'}>
      <div>
        <p>
          The tasks consists of questions carefully designed to help you
          self-assess your comprehension of the information presented on the
          topics covered in the module.
        </p>
        <p>
          All tasks are compulsory. One cannot attempt the further tasks unless
          the active task is completed.
        </p>
        <p>
          The total score for the quiz is based on your responses to all
          questions.
        </p>
      </div>
      <div>
        <h1>Task one:</h1>
        <Timeline>
          <Timeline.Item>
            Read the instructions of taks one carefully.
          </Timeline.Item>
          <Timeline.Item>Take help from the provided resources.</Timeline.Item>
          <Timeline.Item>Create a CodeSandbox account.</Timeline.Item>
          <Timeline.Item>
            Submit your CodeSandbox url after completing the task.
          </Timeline.Item>
        </Timeline>
      </div>
      <div>
        <h1>Task two:</h1>
        <Timeline>
          <Timeline.Item>
            Read the instructions of task two carefully.
          </Timeline.Item>
          <Timeline.Item>Use the resources to learn JavaScript.</Timeline.Item>
          <Timeline.Item>Create a CodeWars account.</Timeline.Item>
          <Timeline.Item>
            Solve as many katas based on your learning.
          </Timeline.Item>
          <Timeline.Item>
            Submit your CodeWars username after completing the task.
          </Timeline.Item>
        </Timeline>
      </div>
      <div>
        <h1>Task three:</h1>
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
      <div>
        <h1>Interview:</h1>
        <Timeline>
          <Timeline.Item>
            The interview will be scheduled on the basis of applicant's
            performance in the prior tasks.
          </Timeline.Item>
          <Timeline.Item>
            Once the interview is scheduled, the applicant will be informed via
            email or reflected in the profile.
          </Timeline.Item>
          <Timeline.Item>
            The applicant can then schedule the interview based on the available
            slots.
          </Timeline.Item>
          <Timeline.Item>
            The interviewer will inform the appllicant via email.{' '}
          </Timeline.Item>
          <Timeline.Item>
            After the interview is done, the result of the application will be
            reflected on profile or sent via email.
          </Timeline.Item>
        </Timeline>
      </div>
    </UserWrapper>
  );
}
