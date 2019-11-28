import React from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import "antd/dist/antd.css";
import { message } from "antd";
import "./Login.scss";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.userLogin();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  userLogin = async () => {
    try {
      if (!this.state.email || !this.state.password) {
        message.error("Please Fill Both Fields");
      } else {
        // Post the user data
        const userLogin = await Axios.post(
          `http://localhost:3000/api/v1/users/login`,
          this.state
        );
        let { data } = userLogin;
        if (!data.status) {
          message.error(data.message);
          console.error(data.message);
        } else {
          localStorage.setItem("authToken", JSON.stringify(data.authToken));
          this.props.verifyToken(data.authToken);
        }
      }
    } catch (error) {
      message.warning(error);
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className='login-container'>
        <div className='login-content'>
          <div className='login-header'>
            <h1 className='login-title'>Sign In</h1>
          </div>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              onChange={this.handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
