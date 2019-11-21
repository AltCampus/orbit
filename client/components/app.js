import React, { Component } from "react";
import Home from "./Home";
import "../scss/app.scss";

export class app extends Component {
  render() {
    return (
      <>
        <h1>
          <Home />
        </h1>
      </>
    );
  }
}

export default app;
