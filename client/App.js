import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import ResetForm from "./components/resetForm/ResetForm";
import Register from "./components/register/Register";
import UserDashboard from "./components/dashboard/UserDashboard";
import "./css-reset.scss";
import "./App.scss";
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

  protectedRoutes = () => {};
  unprotectedRoutes = () => {};

  componentDidMount = () => {
    if (localStorage.authToken) {
      this.loggedUserToken(JSON.parse(localStorage.authToken));
    }
  };
  render() {
    return <UserDashboard />;
  }
}

export default app;
