import React, { Component } from "react";

import UserProfile from "./UserProfile";
import UserProgress from "./UserProgress";
import axios from "axios";
import ScreenerInfoEditor from "../../screener/ScreenerInfoEditor";
import { Icon, message } from "antd";
import AdminWrapper from "../../dashboard/admin/AdminWrapper";
import ScreenerInfo from "../../screener/ScreenerInfo";
import UserTimeline from "./UserTimeline";

export class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async _ => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `/api/v1/users/${this.props.match.params.id}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.authToken)
          }
        }
      );
      this.setState({
        user: response.data.user,
        timeline: response.data.timeline.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        ),
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false });

      if (error.response) {
        return message.error(error.response.data.error);
      }
      message.error("An error occurred.");
    }
  };
  render() {
    return (
      <AdminWrapper>
        {!this.state.user ? (
          <Icon
            type="loading"
            style={{ fontSize: 100, width: "100%", paddingTop: "7rem" }}
            spin
          />
        ) : (
          <section>
            <div className="userprofile-container">
              <UserProfile user={this.state.user} fetchUser={this.getUser} />
            </div>
            <div className="userprogress-container">
              <UserProgress user={this.state.user} fetchUsers={this.getUser} />
            </div>
            <ScreenerInfo user={this.state.user} fetchUser={this.getUser} />
            <UserTimeline timeline={this.state.timeline} />
          </section>
        )}
      </AdminWrapper>
    );
  }
}

export default AdminView;
