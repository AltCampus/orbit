import React from 'react';
import { Result } from 'antd';

export default function ActiveTask() {
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
