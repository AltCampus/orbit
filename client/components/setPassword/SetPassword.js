import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { message } from "antd";

class SetPassword extends React.Component {
  state = {
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password.length < 6) {
      message.warning("Password must contain 6 letter.");
    } else {
      // Extracting the hasmail
      const hashMail = this.props.match.params.hashmail;
      // Invoke the fetchPassword with hashMail
      this.fetchResetPassword(hashMail);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchResetPassword = async hashmail => {
    try {
      let password = { password: this.state.password };
      // Post the user password
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/${hashmail}`,
        password
      );
      message.success("Password Reset Now you Can Login!");
      setTimeout(() => {
        this.props.history.push("/login");
      }, 3000);
    } catch (error) {
      error.response.data.message
        ? message.error(error.response.data.message)
        : console.error(error);
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">Set password for your account</h1>
          </div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <button type="submit">Set password</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SetPassword);