import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { message } from "antd";
import { connect } from "react-redux";
import { getCurrentUser } from "./actions/users";
import Login from "./components/login/Login";
import ResetPasswordForm from "./components/resetPasswordForm/ResetPasswordForm";
import LandingPage from "./components/static/LandingPage";
import UserDashboard from "./components/dashboard/user/Dashboard";
import AdminDashboard from "./components/dashboard/admin/Dashboard";
import UserProfile from "./components/dashboard/admin/userprofile/UserProfileWrapper";

import "./css-reset.scss";
import "./App.scss";
import TaskOne from "./components/task/taskOne/TaskOne";
import TaskTwo from "./components/task/taskTwo/TaskTwo";
import UserProgress from "./components/dashboard/user/UserProgress";
import ScheduleInterview from "./components/task/interview/ScheduleInterview";
import Question from "./components/questionnaire/Question";
import Interview from "./components/interview/Interview";
import QuestionList from "./components/questionnaire/QuestionList";
import Dashboard from "./components/dashboard/user/Dashboard";
import DisplayApplicants from "./components/dashboard/admin/DisplayApplicants";
import TaskThree from "./components/task/taskThree/TaskThree";

class App extends Component {
  protectedRoutes = () => {
    // console.log(this.props.user);
    if (this.props.user.isAdmin) {
      return (
        <Switch>
          <Route exact path="/" component={DisplayApplicants} />
          <Route path="/questions" component={Question} />
          <Route path="/interviews" component={Interview} />
          <Route path="/user/:id" component={UserProfile} />
          <Route path="/login">
            <Redirect to="/" />
          </Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={UserDashboard} />
          <Route exact path="/task/1" component={TaskOne} />
          <Route exact path="/task/2" component={TaskTwo} />
          <Route exact path="/task/3" component={TaskThree} />
          <Route exact path="/task/4" component={ScheduleInterview} />
          <Route path="/task/:taskId" component={UserDashboard} />
          <Route exact path="/profile" component={UserProgress} />
          {/* Redirects the user to login if user attempts to login */}
          <Route path="/login">
            <Redirect to="/" />
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
        <Route path="/login" component={Login} />
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

export default withRouter(connect(mapStateToProps, { getCurrentUser })(App));
