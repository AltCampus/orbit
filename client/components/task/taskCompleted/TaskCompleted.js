import React from "react";
import { Result, Button } from "antd";

function TaskCompleted({ title }) {
  return (
    <Result
      status="success"
      title={title}
      subTitle="You've already submitted this task"
      extra={[
        <Button type="primary" key="console">
          Go to next task
        </Button>
        // <Button key="buy">Buy Again</Button>
      ]}
    />
  );
}

export default TaskCompleted;
