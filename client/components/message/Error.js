import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Go Back To Home</Button>
          </Link>
        }
      />
    </>
  );
}
