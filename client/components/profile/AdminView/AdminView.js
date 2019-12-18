import React, { Component } from 'react';

import UserProfile from './UserProfile';
import UserProgress from './UserProgress';

export class AdminView extends Component {
  render() {
    return (
      <>
        <section>
          <div className="userprofile-container">
            <UserProfile />
          </div>
          <div className="userprogress-container">
            <UserProgress />
          </div>
        </section>
      </>
    );
  }
}

export default AdminView;
