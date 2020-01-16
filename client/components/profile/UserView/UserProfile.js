import React, { Component } from "react";
import { PageHeader, Statistic, Descriptions } from "antd";
import { connect } from "react-redux";

class UserProfile extends Component {
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
              border: "1px solid rgb(235, 237, 240)"
            }}
            onBack={() => window.history.back()}
            avatar={{
              src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
            }}
            title="Profile"
          >
            <div className="content">
              <div className="main">
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Name">
                    {this.props.user.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Social Profile">
                    <a href={this.props.user.socialProfile} target="_blank">
                      Link
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone number">
                    {this.props.user.phoneNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="Stage">
                    {this.props.user.stage}
                  </Descriptions.Item>
                  <Descriptions.Item label="Motivation">
                    {this.props.user.motivation}
                  </Descriptions.Item>
                  <Descriptions.Item label="SignUp Time">
                    {new Date(this.props.user.createdAt).toDateString() +
                      " " +
                      new Date(this.props.user.createdAt).toLocaleTimeString()}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </PageHeader>
        </section>
      </>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state.currentUser;
  return { user };
};

export default connect(mapStateToProps)(UserProfile);
