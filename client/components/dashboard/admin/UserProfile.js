import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import React, { Component } from 'react'
import axios from "axios";



class UserProfile extends Component {
    render() {
        console.log("@@@")
        return (
            <div>
                <h1>HEY</h1>
            </div>
        )
    }
}

export default withRouter(UserProfile);