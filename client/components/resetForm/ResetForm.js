import React from "react";
import "../login/Login";
export default class ResetForm extends React.Component {
  state = {
    password: ""
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
            <button type="submit">Set</button>
          </form>
        </div>
      </div>
    );
  }
}
