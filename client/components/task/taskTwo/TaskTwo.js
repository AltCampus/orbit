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
                      Kudos on solving your first task. Task Two is learning
                      based. You need to create an account on
                      <a href="https://www.codewars.com/" target="_blank">
                        <mark>CodeWars</mark>
                      </a>
                      and solve the katas based on your learning from the
                      resources.
                    </p>
                  </li>
                  <li>
                    <p>
                      This task is to test your problem solving skills, critical
                      thinking and ability to learn. You have to take help from
                      the resources and solve the katas based on your learning.
                      This task has a deadline of three days.
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
                      <mark>JavaScript.info</mark>
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.shayhowe.com/html-css/building-your-first-web-page/">
                      <mark>resources 2</mark>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.abeautifulsite.net/how-to-make-rounded-images-with-css">
                      <mark>resources</mark>
                    </a>
                  </li>
                </ul>
                <div className="image-container">
                  <img
                    src="https://www.indiemakers.tools/media/images/codewars.jpg"
                    alt="task"
                    border="0"
                  ></img>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="url-input">
        <Input
          size="large"
          placeholder="Submit your CodeWars username here..."
        />
        <Button className="url-submit" type="primary">
          Submit
        </Button>
      </div>
    </>
  );
}
