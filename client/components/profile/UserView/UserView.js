import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import UserProfile from './UserProfile';
import UserProgress from './UserProgress';

export class UserView extends Component {
  render() {
    return (
      <>
        <div className="btn-back">
          <Button shape="circle">
            <Icon type="left" />
          </Button>
        </div>
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

export default UserView;
