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
                      Kudos on solving your first task. Task Two is also realively simply. You would need to SignUp at <a>CodeWars</a> 
                      and solve some basic programming questions.
                    </p>
                  </li>
                  <li>
                    <p>
                      This task is very open ended, its upto you that how many questions do you want to solve. However it will affect
                      your final score. After signing up you need to submit your CodeWars username here. You will be given a
                      three day time limit to solve as many questions as you want.
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
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="url-input">
        <Input size="large" placeholder="Submit your CodeWars username here..." />
        <Button className="url-submit" type="primary">
          Submit
        </Button>
      </div>
    </>
  );
}
