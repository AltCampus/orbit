import React from "react";
import axios from "axios";
import { message, Button } from "antd";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class ResetPassword extends React.Component {
  state = {
    email: "",
    isLoading: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetPassword = async e => {
    e.preventDefault();
    try {
      // Set isLoading to true to enable loader
      this.setState({ isLoading: true });
      let { email } = this.state;
      const res = await axios.post(`/api/v1/users/password/reset`, { email });
      this.setState({ isLoading: false });
      message.success(res.data.message);
    } catch (error) {
      this.setState({ isLoading: false });
      error.response && error.response.data.message
        ? message.error(error.response.data.message)
        : message.error("Something went wrong!");
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="login-container">
          <div className="login-content">
            <div className="login-header">
              <h1 className="login-title">Reset your Account Password</h1>
            </div>
            <form className="login-form" onSubmit={this.resetPassword}>
              <input
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Email Address"
                onChange={this.handleChange}
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.isLoading}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ResetPassword;
