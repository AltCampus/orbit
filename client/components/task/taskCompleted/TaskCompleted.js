import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

function TaskCompleted({ title, next }) {
  return (
    <Result
      status="success"
      title={title}
      subTitle="You've already submitted this task"
      extra={[
        <Link to={`/task/${next}`}>
          <Button type="primary" key="console">
            Go to next task
          </Button>
        </Link>
        // <Button key="buy">Buy Again</Button>
      ]}
    />
  );
}

export default TaskCompleted;
