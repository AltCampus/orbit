import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./css-reset.scss";
import "./App.scss";

import { getCurrentUser } from "./actions/users";

import Login from "./components/login/Login";
import SetPassword from "./components/setPassword/SetPassword";
import LandingPage from "./components/static/LandingPage";
import UserDashboard from "./components/dashboard/user/Dashboard";
import UserProfile from "./components/dashboard/admin/userprofile/UserProfileWrapper";
import TaskOne from "./components/task/taskOne/TaskOne";
import TaskTwo from "./components/task/taskTwo/TaskTwo";
import TaskThree from "./components/task/taskThree/TaskThree";
import UserProgress from "./components/dashboard/user/UserProgress";
import Question from "./components/questionnaire/Question";
import UserInterview from "./components/task/interview/Interview";
import QuestionList from "./components/questionnaire/QuestionList";
import Dashboard from "./components/dashboard/user/Dashboard";
import AdminInterview from "./components/interview/Interview";
import DisplayApplicants from "./components/dashboard/admin/DisplayApplicants";
import Instructions from "./components/instructions/Instructions";
import UserView from "./components/profile/UserView/UserView";
import RateQuiz from "./components/questionnaire/RateQuiz";
import { message } from "antd";
Question;
class App extends Component {
  protectedRoutes = () => {
    // console.log(this.props.user);
    if (this.props.user.isAdmin) {
      return (
        <Switch>
          <Route exact path="/" component={DisplayApplicants} />
          <Route path="/questions" component={Question} />
          <Route path="/interviews" component={AdminInterview} />
          <Route path="/user/:id" component={UserProfile} />
          <Route path="/quiz/rate/:id" component={RateQuiz} />
          <Route path="/login">
            <Redirect to="/" />
          </Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Instructions} />
          <Route exact path="/task/1" component={TaskOne} />
          <Route exact path="/task/2" component={TaskTwo} />
          <Route exact path="/task/3" component={TaskThree} />
          <Route exact path="/task/4" component={UserInterview} />
          <Route path="/task/:taskId" component={UserDashboard} />
          <Route exact path="/profile" component={UserView} />
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
        <Route path="/account/claim/:hashmail" component={SetPassword} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  };

  componentDidMount = () => {
    if (localStorage.getItem("authToken")) {
      const invalidToken = async (msg) => {
        message.error(`${msg}, Redirect to Login please wait!`);
        await localStorage.clear();
        setTimeout(() => this.props.history.push("/login"), 1000);
      };
      this.props.getCurrentUser(invalidToken);
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* Conditional Routing, Checks if tokenValidationInProgress true or false, Checks
        if user is available or not */}
        {this.props.tokenValidationInProgress
          ? null
          : this.props.user
          ? this.protectedRoutes()
          : this.unprotectedRoutes()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, tokenValidationInProgress } = state.currentUser;
  return {
    user,
    tokenValidationInProgress
  };
};

export default withRouter(connect(mapStateToProps, { getCurrentUser })(App));
