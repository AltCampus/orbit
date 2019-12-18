import React, { Component } from 'react';
import axios from 'axios';
import { PageHeader, Statistic, Descriptions, Button } from 'antd';

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Stage"
      value="0"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic
      title="Score"
      value={10}
      style={{
        marginRight: 32,
      }}
    />
    <div
      style={{
        marginRight: 32,
      }}
    >
      <Button type="primary">Accept</Button>
      <Button type="danger">Reject</Button>
    </div>
  </div>
);

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  handleUserAccept = async id => {
    try {
      const token = JSON.parse(localStorage.getItem('authToken'));
      const res = await axios.patch(
        `http://localhost:3000/api/v1/users/status/${id}`,
        null,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (res.data.status) {
        message.success(res.data.message);
      } else {
        message.error("There's an error");
      }
    } catch (error) {
      message.error('Something went wrong');
      console.error(error);
    }
  };

  handleUserReject = async id => {
    try {
      const token = JSON.parse(localStorage.getItem('authToken'));
      const res = await axios.delete(
        `http://localhost:3000/api/v1/users/status/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (res.data.status) {
        message.success(res.data.message);
      } else {
        message.error("There's an error");
      }
    } catch (error) {
      message.error('Something went wrong');
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <section>
          <PageHeader
            style={{
              border: '1px solid rgb(235, 237, 240)',
            }}
            onBack={() => window.history.back()}
            avatar={{
              src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
            }}
            title={this.props.user.name}
          >
            <Content extra={extraContent}>
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="Name">
                  {this.props.user.name}
                </Descriptions.Item>
                <Descriptions.Item label="Social Profile">
                  <a href={this.props.user.socialProfile} target="_blank">
                    {this.props.user.socialProfile}
                  </a>
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                  {this.props.user.phoneNo}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {this.props.user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Motivation">
                  {this.props.user.motivation}
                </Descriptions.Item>
              </Descriptions>
            </Content>
          </PageHeader>
        </section>
      </>
    );
  }
}

export default UserProfile;
