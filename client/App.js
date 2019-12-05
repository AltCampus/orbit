import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { message } from "antd";
import { connect } from "react-redux";
import { updateToken, getCurrentUser } from "./actions/users";
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
  protectedRoutes = () => {
    if (this.props.user.isAdmin) {
      return (
        <Switch>
          <Route path="/dashboard" component={AdminDashboard} />
          {/* Redirects the user to login if user attempts to login */}
          <Route path="/login">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/dashboard" component={UserDashboard} />
          {/* Redirects the user to login if user attempts to login */}
          <Route path="/login">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      );
    }
  };

  unprotectedRoutes = () => {
    return (
      <Switch>
        <Route exact path="/dashboard">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/" component={LandingPage} />
        <Route path="/reset/:hashmail" component={ResetPasswordForm} />
        <Route path="/login" component={Login} />} />
      </Switch>
    );
  };

  componentDidMount = () => {
    if (localStorage.getItem("authToken")) {
      this.props.getCurrentUser();
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* Conditional Routing, Checks if isAuthInProgress true or false, Checks
        if user is available or not */}
        {this.props.isAuthInProgress
          ? null
          : this.props.user
          ? this.protectedRoutes()
          : this.unprotectedRoutes()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, isAuthInProgress } = state.currentUser;
  return {
    user,
    isAuthInProgress
  };
};

export default withRouter(
  connect(mapStateToProps, { updateToken, getCurrentUser })(App)
);
