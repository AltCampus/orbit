import React from 'react';
import { Result, Button } from 'antd';

export default function PendingTask() {
  return (
    <>
      <Result
        status="error"
        title="Active task is incomplete !"
        subTitle="Complete the active task to proceed."
      />
    </>
  );
}
