import React from "react";
import { Result, Button, Typography } from "antd";
const { Paragraph, Text } = Typography;

export default function RejectMessage() {
  return (
    <>
      <Result
        status="error"
        title="Better luck next time!"
        subTitle="Please check the following information before re-applying"
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16
              }}
            >
              A message for the candidate:
            </Text>
          </Paragraph>
          <ul>
            <li>
              We're sorry to inform you that we chose to move forward with
              another candidate.
            </li>
            <li>
              Remember, getting selected is a process, and unfortunately this is
              a part of it.
            </li>
          </ul>
        </div>
      </Result>
    </>
  );
}
