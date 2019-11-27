import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Login from "./components/login/Login";
import ResetForm from "./components/resetForm/ResetForm";
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
      const user = await Axios.get("http://localhost:3000/api/v1/users/", {
        headers: {
          authorization: authToken
        }
      });
      console.log(user);
      let {
        data: { user }
      } = user;
      this.setState({ user });
      this.props.history.push("/dashboard");
    } catch (error) {
      console.error(error);
      this.props.history.push("/login");
    }
  };

  // TODO : Change this into a seperate protected component
  protectedRoutes = () => {
    return (
      <Switch>
        <Route path='/dashboard' component={UserDashboard} />
        <Route path='/admindashboard' component={AdminDashboard} />
      </Switch>
    );
  };
  unprotectedRoutes = () => {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/reset/:hashmail' component={ResetForm} />
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
