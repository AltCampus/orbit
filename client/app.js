import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./components/login/Login";
import ResetForm from "./components/resetForm/ResetForm";
import Register from "./components/register/Register";
import "./css-reset.scss";
export class app extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  loggedUserToken = userToken => {
    fetch("http://localhost:3000/api/user/", {
      headers: {
        authorization: userToken
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        } else return response.json();
      })
      .then(user => {
        localStorage.setItem("authToken", JSON.stringify(userToken));
        this.setState({ user });
      })
      .catch(err => console.error(err));
  };

  Routes = user => {
    // Protected Routes
    if (user) {
      return (
        <Switch>
          {/* TODO: Add dasboard route */}
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        </Switch>
      );
    }
    // Unprotected Routes
    else {
      return (
        <Switch>
          <Route path="/reset" component={ResetForm} />
          <Route path="/login" component={Login} />
        </Switch>
      );
    }
  };

  componentDidMount = () => {
    if (localStorage.authToken) {
      this.loggedUserToken(JSON.parse(localStorage.authToken));
    }
  };

  render() {
    return <>{this.Routes(this.state.user)}</>;
  }
}

export default app;
