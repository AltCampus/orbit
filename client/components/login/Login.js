import React from "react";
import Axios from "axios";
import "./Login.scss";

export default class Login extends React.Component {
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

  userLogin = () => {
    // Post the user data
    Axios.post(`http://localhost:3000/api/v1/users/login`, this.state)
      .then(res => {
        localStorage.setItem("authToken", JSON.stringify(res.data.authToken));
        // TODO: Add logic to render different dashboard
        this.props.history.push("/dashboard");
      })
      .catch(err => console.error(err));
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
