import React from "react";
import {
  Button,
  Avatar,
  Card,
  Icon,
  Progress,
  Spin,
  Descriptions,
  message,
  Modal,
  Input,
  Checkbox
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const { Meta } = Card;

const { TextArea } = Input;

const TaskThreeProgress = props => {
  const { quiz } = props.user;
  return (
    <Card
      className="ant-card-quiz"
      style={{ width: 300 }}
      cover={<div></div>}
      actions={[
        <Link to={`/quiz/rate/${quiz._id}`}>
          <Button type="link">
            <Icon type="edit" key="rate" />
            Rate
          </Button>
        </Link>
      ]}
    >
      <Descriptions>
        <Descriptions.Item label="Start Time">
          {new Date(quiz.startTime).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Submission Time">
          {new Date(quiz.submittedTime).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Rating">
          {quiz.totalScore != null && quiz.maximumScore != null
            ? `You have rated this user ${quiz.totalScore} out of ${quiz.maximumScore}`
            : "You've not rated this user yet"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TaskThreeProgress;
