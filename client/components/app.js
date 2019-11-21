import React, { Component } from "react";
import "../scss/app.scss";
import Header from "./Header";
import Login from "./Login";

export class app extends Component {
  render() {
    return (
      <>
        <Header />
        <Login />
      </>
    );
  }
}

export default app;
