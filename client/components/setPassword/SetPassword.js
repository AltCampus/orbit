import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { message, Button } from "antd";

class SetPassword extends React.Component {
  state = {
    password: "",
    isLoading: false,
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
      // Set isLoading to true to enable loader
      this.setState({isLoading: true});

      let password = { password: this.state.password };
      // Post the user password
      await axios.post(
        `http://localhost:3000/api/v1/users/${hashmail}`,
        password
      );
      this.setState({isLoading: false});
      message.success("Password Reset Now you Can Login!");
      this.props.history.push("/login");
    } catch (error) {
      this.setState({isLoading: false});
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
          <form className="login-form">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            {/* <button type="submit">Set password</button> */}
            <Button
              type="primary"
              loading={this.state.isLoading}
              onClick={this.handleSubmit}
              >Set password
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SetPassword);
