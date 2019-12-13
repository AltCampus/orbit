import React, { Component } from 'react';
import { Divider, Button, Icon, Pagination } from 'antd';

export class Quiz extends Component {
  render() {
    return (
      <>
        <section style={{ textAlign: 'center' }}>
          <Pagination simple defaultCurrent={1} total={300} />
        </section>
        <div className="container">
          <div className="btn-container-left">
            <Button type="link">
              <Icon type="left" />
            </Button>
          </div>
          <div className="middle">
            <Divider orientation="left">Question</Divider>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
              merninisti licere mihi ista probare, quae sunt a te dicta? Refert
              tamen, quo modo.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed nonne merninisti licere mihi ista probare, quae sunt a
              te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
              probare, quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti
              licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
              modo.
            </p>
            <Divider orientation="left">Answer</Divider>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
              merninisti licere mihi ista probare, quae sunt a te dicta? Refert
              tamen, quo modo.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed nonne merninisti licere mihi ista probare, quae sunt a
              te dicta? Refert tamen, quo modo.
            </p>
          </div>
          <div className="btn-container-right">
            <Button type="link">
              <Icon type="right" />
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
