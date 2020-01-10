import React from 'react';
import { message, Button } from 'antd';
import { connect } from 'react-redux';

import { userLogin, getCurrentUser } from '../../actions/users';
import './Login.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';


class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Makes fetch post request
    if (!this.state.email || !this.state.password) {
      message.error('Please fill both fields');
    } else if (this.state.password.length <= 5) {
      message.error('Password must contain 6 letter!');
    } else {
      await this.props.userLogin(this.state);
      if (localStorage.authToken) {
        // Makes fetch current user
        this.props.getCurrentUser();
      }
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Header />
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
              <Button
                type='primary'
                htmlType='submit'
                loading={this.props.isLoginInProgress}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated, isError, isLoginInProgress } = state.currentUser;
  return {
    isAuthenticated,
    isLoginInProgress,
    isError,
  };
};

export default connect(mapStateToProps, { userLogin, getCurrentUser })(Login);
