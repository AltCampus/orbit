import React, { Component } from 'react';

import UserProfile from './UserProfile';
import UserProgress from './UserProgress';
import DrawerInfo from '../../drawer/DrawerInfo';

export class AdminView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <section>
          <DrawerInfo />
          <div className='userprofile-container'>
            <UserProfile user={this.props.user} />
          </div>
          <div className='userprogress-container'>
            <UserProgress
              user={this.props.user}
              fetchUsers={this.props.fetchUsers}
            />
          </div>
        </section>
      </>
    );
  }
}

export default AdminView;
