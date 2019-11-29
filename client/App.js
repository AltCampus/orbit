import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

import Login from "./components/login/Login";
import ResetPasswordForm from "./components/resetPasswordForm/ResetPasswordForm";
// TODO: Remove register components after test done.
import Register from "./components/register/Register";
import LandingPage from "./components/static/LandingPage";
import UserDashboard from "./components/dashboard/user/Dashboard";
import AdminDashboard from "./components/dashboard/admin/Dashboard";

import "./css-reset.scss";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  verifyToken = async authToken => {
    try {
      const user = await axios.get("http://localhost:3000/api/v1/users/", {
        headers: {
          authorization: authToken
        }
      });
      let { data } = user;
      if (!data.status) {
        message.error(data.message);
      } else {
        this.setState({ user: user.data.user });
        this.props.history.push("/dashboard");
      }
    } catch (error) {
      message.warning(error || "Token expire login again");
      this.props.history.push("/login");
    }
  };

  protectedRoutes = () => {
    if (this.state.user.isAdmin) {
      return (
        <Switch>
          <Route path='/dashboard' component={AdminDashboard} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path='/dashboard' component={UserDashboard} />
        </Switch>
      );
    }
  };
  unprotectedRoutes = () => {
    return (
      <Switch>
        <Route exact path='/dashboard'>
          <Redirect to='/login' />
        </Route>
        <Route exact path='/' component={LandingPage} />
        <Route path='/reset/:hashmail' component={ResetPasswordForm} />
        <Route
          path='/login'
          render={() => <Login verifyToken={this.verifyToken} />}
        />
      </Switch>
    );
  };

  componentDidMount = () => {
    if (localStorage.authToken) {
      this.verifyToken(JSON.parse(localStorage.authToken));
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.user ? this.protectedRoutes() : this.unprotectedRoutes()}
      </React.Fragment>
    );
  }
}

export default withRouter(App);
