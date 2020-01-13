import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";

import { getCurrentUser } from "./actions/users";

import Login from "./components/login/Login";
import SetPassword from "./components/setPassword/SetPassword";
import LandingPage from "./components/static/LandingPage";
import UserProfile from "./components/profile/AdminView/AdminView";
import Error404 from "./components/message/Error";
import TaskOne from "./components/task/taskOne/TaskOne";
import TaskTwo from "./components/task/taskTwo/TaskTwo";
import TaskThree from "./components/task/taskThree/TaskThree";
import UserInterview from "./components/task/interview/Interview";
import QuestionList from "./components/questionnaire/QuestionList";
import SlotManager from "./components/interview/Interview";
import DisplayApplicants from "./components/dashboard/admin/DisplayApplicants";
import Instructions from "./components/instructions/Instructions";
import UserView from "./components/profile/UserView/UserView";
import RateQuiz from "./components/questionnaire/RateQuiz";
import { message, Spin, Icon } from "antd";
import InterviewsList from "./components/interview/InterviewsList";

class App extends Component {
  protectedRoutes = () => {
    if (this.props.user.isAdmin) {
      return (
        <Switch>
          <Route exact path="/" component={DisplayApplicants} />
          <Route path="/questions" component={QuestionList} />
          <Route path="/interviews/slots" component={SlotManager} />
          <Route path="/interviews/scheduled" component={InterviewsList} />
          <Route path="/user/:id" component={UserProfile} />
          <Route path="/quiz/rate/:id" component={RateQuiz} />
          {/* <Route path="/login">
            <Redirect to="/" />
          </Route> */}
          <Route path="/" component={Error404}></Route>
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
          <Route exact path="/profile" component={UserView} />
          <Route path="/" component={Error404}></Route>
        </Switch>
      );
    }
  };

  unprotectedRoutes = () => {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/account/claim/:hashmail" component={SetPassword} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Error404}></Route>
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
        {/* Conditional Routing */}
        {this.props.tokenValidationInProgress ? (
          // Shows spinner untill user fatches
          <div className="loading-div">
            <Spin
              indicator={
                <Icon
                  type="loading"
                  style={{ fontSize: 100, margin: "3rem auto" }}
                />
              }
            />
          </div>
        ) : this.props.user ? (
          this.protectedRoutes()
        ) : (
          this.unprotectedRoutes()
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    user,
    tokenValidationInProgress,
    isAuthenticated
  } = state.currentUser;
  return {
    user,
    tokenValidationInProgress,
    isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps, { getCurrentUser })(App));
