import React from "react";
import axios from "axios";
export default class ResetForm extends React.Component {
  state = {};
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/", this.state)
      .then(data => data.json())
      .then(user => console.log(user));
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='login-container'>
        <div className='login-content'>
          <div className='login-header'>
            <h1 className='login-title'>Register</h1>
          </div>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Name'
              onChange={this.handleChange}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={this.handleChange}
            />
            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    );
  }
}
