import React, { Component } from "react";

import UserWrapper from "./../../dashboard/user/UserWrapper";
import UserProfile from "./UserProfile";
import UserProgress from "./UserProgress";

export class UserView extends Component {
  render() {
    return (
      <UserWrapper activeKey={"5"}>
        <section>
          <div className="userprofile-container">
            <UserProfile />
          </div>
          <div className="userprogress-container">
            <UserProgress />
          </div>
        </section>
      </UserWrapper>
    );
  }
}

export default UserView;
