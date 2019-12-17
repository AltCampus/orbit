import React, { Component } from 'react';
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
import '../index.css';
import "./userinfo.scss";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }
  render() {
      // console.log(this.props)
    return (
      <div>
        <div className="user-info">
          <Card
            headStyle={{ fontSize: '1.5rem' }}
            title={this.props.user.name}
            style={{ width: 550, height: '75vh', borderRadius: '5px' }}
            >
            <div className="user-info-btn-container">
              <button className="user-info-btn btn-accept">Accept</button>
              <button className="user-info-btn btn-reject">Reject</button>
            </div>
            <p className="card-child">{this.props.user.email}</p>
            <p className="card-child">Phone Number:{this.props.user.phoneNo}</p>
            <a
              className="card-child"
              target="_blank"
              href={this.props.user.socialProfile}
            >
              {this.props.user.socialProfile}
            </a>
            <p className="card-child">
              Motivation:{this.props.user.motivation}
            </p>
            <p className="card-child">Stage:{this.props.user.stage}</p>
            <p className="card-child">
              SignUp Time:
              {new Date(this.props.user.createdAt).toLocaleString()}
            </p>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserInfo;
