import React from "react";
import { message } from "antd";
import { connect } from "react-redux";
import { userLogin, getCurrentUser } from "../../actions/users";
import "./Login.scss";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Makes fetch post request
    await this.props.userLogin(this.state);
    if (localStorage.authToken) {
      // Makes fetch current user
      this.props.getCurrentUser();
    }
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
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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

const mapStateToProps = state => {
  const { isAuthenticated, isError } = state.currentUser;
  return {
    isAuthenticated,
    isError
  };
};

export default connect(mapStateToProps, { userLogin, getCurrentUser })(Login);
