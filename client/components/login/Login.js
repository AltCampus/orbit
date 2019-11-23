import React from "react";
import axios from "axios";
import "./Login.scss";

export default class Login extends React.Component {
  state = {
    email: "",
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
            <h1 className="login-title">Sign In</h1>
          </div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}
