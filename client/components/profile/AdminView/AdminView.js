import React, { Component } from "react";

import UserProfile from "./UserProfile";
import UserProgress from "./UserProgress";
import axios from "axios";
import { Icon, message } from "antd";
import AdminWrapper from "../../dashboard/admin/AdminWrapper";

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
              <UserProfile user={this.state.user} />
            </div>
            <div className="userprogress-container">
              <UserProgress user={this.state.user} fetchUsers={this.getUser} />
            </div>
          </section>
        )}
      </AdminWrapper>
    );
  }
}

export default AdminView;
