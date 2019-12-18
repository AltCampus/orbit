import React, { Component } from 'react';
import { PageHeader, Statistic, Descriptions } from 'antd';

export class UserProfile extends Component {
  extraContent = (
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
      <Statistic title="Score" value={10} />
    </div>
  );

  Content = ({ children, extra }) => {
    return (
      <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
      </div>
    );
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
            title="Title"
          >
            <this.Content extra={this.extraContent}>
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="Name">Lili Qu</Descriptions.Item>
                <Descriptions.Item label="Social Profile">
                  <a>421421</a>
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                  852741963
                </Descriptions.Item>
                <Descriptions.Item label="Stage">0</Descriptions.Item>
                <Descriptions.Item label="Motivation">
                  Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
              </Descriptions>
            </this.Content>
          </PageHeader>
        </section>
      </>
    );
  }
}

export default UserProfile;
