import React from "react";
import { Card, Col, Row, Input, Button } from "antd";

export default function TaskTwo() {
  return (
    <>
      <div className="task-container">
        <Row gutter={16}>
          <Col span={25}>
            <Card title="Task Two" bordered={false}>
              <div>
                <ul>
                  <li>
                    <p>
                      Task one is simple.All you have to do is convert the
                      layout in the image into HTML format.
                    </p>
                  </li>
                  <li>
                    <p>
                      You need to complete the assignment on
                      <a href="https://codesandbox.io/" target="_blank">
                        <mark>CodeSandbox</mark>
                      </a>
                      and submit the URL link below.
                    </p>
                  </li>
                  <li>
                    <p>
                      One can use the resources below to help you with the task.
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h2>Resources</h2>
                <ul>
                  <li>
                    <a href="https://medium.freecodecamp.org/learn-html-in-5-minutes-ccd378d2ab72">
                      <mark>freecodecamp</mark>
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.shayhowe.com/html-css/building-your-first-web-page/">
                      <mark>shayhowe</mark>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.abeautifulsite.net/how-to-make-rounded-images-with-css">
                      <mark>abeautifulsite</mark>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="image-container">
                <img
                  src="https://i.ibb.co/chGQtD8/task.png"
                  alt="task"
                  border="0"
                ></img>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="url-input">
        <Input size="large" placeholder="Submit your codesandbox URL here..." />
        <Button className="url-submit" type="primary">
          Submit
        </Button>
      </div>
    </>
  );
}
