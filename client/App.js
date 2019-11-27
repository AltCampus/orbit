import React, { Component } from "react";

import { Route, Switch, Link } from "react-router-dom";
import Login from "./components/login/Login";
import ResetForm from "./components/resetForm/ResetForm";
import Register from "./components/register/Register";
import LandingPage from "./components/static/LandingPage";
import UserDashboard from "./components/dashboard/user/Dashboard";
import AdminDashboard from "./components/dashboard/admin/Dashboard";
import "./css-reset.scss";
import "./App.scss";
import Axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  loggedUserToken = ({ authToken }) => {
    Axios.get("http://localhost:3000/api/v1/users/", {
      headers: {
        authorization: userToken
      }
    })
      .then(user => {
        this.setState({ user: user.data.user });
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.error(err);
        localStorage.clear();
        this.props.history.push("/login");
      });
  };

  // TODO : Change this into a seperate protected component
  protectedRoutes = () => {
    return (
      <Switch>
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/admindashboard" component={AdminDashboard} />
      </Switch>
    );
  };
  unprotectedRoutes = () => {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/reset/:hashmail" component={ResetForm} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  };

  componentDidMount = () => {
    if (localStorage.user) {
      this.loggedUserToken(JSON.parse(localStorage.user));
    }
  };
  render() {
    return this.state.user ? this.protectedRoutes() : this.unprotectedRoutes();
  }
}

export default App;
