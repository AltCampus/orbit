import React from 'react';
import { Result, Button } from 'antd';

export default function ScheduleSuccess() {
  return (
    <>
      <Result
        status="success"
        title="Your interview has been scheduled successfully"
        subTitle="You will be notified shortly via email"
        extra={[
          <Button type="primary" key="console">
            Check mail
          </Button>,
          <Button key="buy"> View profile</Button>,
        ]}
      />
    </>
  );
}
