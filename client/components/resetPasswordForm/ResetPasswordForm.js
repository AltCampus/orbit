import React from "react";
import "../login/Login";
import axios from "axios";
export default class ResetForm extends React.Component {
  state = {
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    // Extracting the hasmail
    const hashMail = this.props.match.params.hashmail;
    // Invoke the fetchPassword with hashMail
    this.fetchResetPassword(hashMail);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchResetPassword = hashmail => {
    let password = { password: this.state.password };
    password = JSON.stringify(password);
    // Post the user password
    axios
      .post(`http://localhost:3000/api/v1/users/${hashmail}`, password)
      .then(res =>
        res.status ? this.props.history.push("/login") : console.error(res)
      )
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className='login-container'>
        <div className='login-content'>
          <div className='login-header'>
            <h1 className='login-title'>Set password for your account</h1>
          </div>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <button type='submit'>Set</button>
          </form>
        </div>
      </div>
    );
  }
}
