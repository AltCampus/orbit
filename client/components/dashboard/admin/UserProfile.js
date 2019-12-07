import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spin, Icon, Progress, Card } from "antd";
import "./index.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  render() {
    console.log(!this.state.user.data);
    return (
      <div>
        {!this.state.user.data ? (
          <Icon
            type="loading"
            style={{ fontSize: 100, width: "100%", paddingTop: "7rem" }}
            spin
          />
        ) : (
          <div className="user-container">
            <div className="user-info">
              <Card
                headStyle={{ fontSize: "1.5rem" }}
                title={this.state.user.data.user.name}
                style={{ width: 550, height: "75vh", borderRadius: "5px" }}
              >
                <p className="card-child">{this.state.user.data.user.email}</p>
                <p className="card-child">Phone Number:{this.state.user.data.user.phoneNo}</p>
                <a
                  className="card-child"
                  target="_blank"
                  href={this.state.user.data.user.socialProfile}
                >
                  {this.state.user.data.user.socialProfile}
                </a>
                <p className="card-child">
                  Motivation:{this.state.user.data.user.motivation}
                </p>
                <p className="card-child">Stage:{this.state.user.data.user.stage}</p>
                <p className="card-child">SignUp Time:{this.state.user.data.user.createdAt}</p>
              </Card>
            </div>
            <div className="user-taskinfo">
                <Card
                    title="User Progress"
                    headStyle={{ fontSize: "1.5rem" }}
                    style={{ width: 1150, height: "75vh", borderRadius: "5px" }}
                ></Card>
            </div>
          </div>
        )}
      </div>
    );
  }

  async componentWillMount() {
    console.log(this.props.match.params.id);
    // const { match: { params } } = this.props;
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/${this.props.match.params.id}`
    );
    this.setState({ user: response });
  }
}

export default withRouter(UserProfile);

{
  /* {console.log(this.state.user.data.task.html)}
              <h3>StartTime:{this.state.user.data.task.html.startTime}</h3>
              <h3>SumbitTime:{this.state.user.data.task.html.submitTime}</h3>
                    <a target="_blank" href={`${this.state.user.data.task.html.taskUrl}`}>
                  <Icon type="codepen" style={{fontSize: 100,}} />
                  </a>
                  <input value={this.state.user.htmlScore} size="large" placeholder="Assign Score" className="htmlScore" />
                  <input className="htmlReview" /> */
}
{
  /* <Progress
percent={25 * this.state.user.data.user.stage}
status="active"
/> */
}
