import React, { Component } from 'react';

import UserProfile from './UserProfile';
import UserProgress from './UserProgress';

export class AdminView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }
  render() {
    return (
      <>
        <section>
          <div className="userprofile-container">
            <UserProfile user={this.props.user} />
          </div>
          <div className="userprogress-container">
            <UserProgress user={this.props.user} />
          </div>
        </section>
      </>
    );
  }
}

export default AdminView;
