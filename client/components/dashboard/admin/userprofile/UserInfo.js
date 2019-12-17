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
  InputNumber,
  message
} from 'antd';
import '../index.css';
import "./userinfo.scss";
import axios from 'axios';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  handleUserAccept = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"));
      const res = await axios.patch(`http://localhost:3000/api/v1/users/status/${id}`, null, {
        headers: {
          authorization: token
        }
      });
      if (res.data.status) {
        message.success(res.data.message);
      } else {
        message.error("There's an error");
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
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
              {this.props.user.status === "pending" ?
                <div className="user-info-btn-container">
                  <button onClick={() => this.handleUserAccept(this.props.user._id)} className="user-info-btn btn-accept">Accept</button>
                  <button className="user-info-btn btn-reject">Reject</button>
                </div>
                :
                this.props.user.status === "accept" ?
                <span>Applicant accepted</span>
                 :
                <span>Applicant rejected</span>
              }
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
