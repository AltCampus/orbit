import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Spin,
  Icon,
  Progress,
  Card,
  Button,
  Form,
  Input,
  Modal,
  InputNumber
} from 'antd';

import AdminWrapper from '../AdminWrapper';
import AdminView from '../../../profile/AdminView/AdminView';
// import UserInfo from './UserInfo';
// import UserProgress from './UserProgress';
// import '../index.css';

class UserProfileWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isFetching: false
    };
  }

  fetchUsers = async () => {
    this.setState({ isFetching: true });
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/${this.props.match.params.id}`,
      {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      }
    );
    console.log('CDM', response.data.user);
    this.setState({ user: response.data.user, isFetching: false });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <AdminWrapper>
          {!this.state.user ? (
            <Icon
              type="loading"
              style={{ fontSize: 100, width: '100%', paddingTop: '7rem' }}
              spin
            />
          ) : (
            <div className="user-container">
              {/* <UserInfo user={this.state.user} />
              <UserProgress user={this.state.user} /> */}
              <AdminView user={this.state.user} fetchUsers={this.fetchUsers} />
            </div>
          )}
        </AdminWrapper>
      </div>
    );
  }
  async componentDidMount() {
    this.fetchUsers();
  }
}

export default withRouter(UserProfileWrapper);
