import React, { Component } from 'react';
import { PageHeader, Statistic, Descriptions } from 'antd';

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Name">Lili Qu</Descriptions.Item>
    <Descriptions.Item label="Social Profile">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Phone number">852741963</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Motivation">
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

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
    <Statistic title="Score" value={10} />
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
            <Content extra={extraContent}>{renderContent()}</Content>
          </PageHeader>
        </section>
      </>
    );
  }
}

export default UserProfile;
