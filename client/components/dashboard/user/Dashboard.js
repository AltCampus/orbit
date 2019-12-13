import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Avatar, Button } from 'antd';
import { connect } from 'react-redux';
import { updateToken, getCurrentUser } from '../../../actions/users';

import TaskOne from '../../task/taskOne/TaskOne';
import TaskTwo from '../../task/taskTwo/TaskTwo';
import TaskCompleted from '../../task/taskCompleted/TaskCompleted';
import UserWrapper from './UserWrapper';
import Quiz from '../../task/taskThree/Quiz';

const { Header, Sider, Content } = Layout;

class UserDashboard extends React.Component {
  // state = {
  //   collapsed: false,
  //   broken: false,
  //   tabIndex: Number(this.props.match.params.taskId) || 0
  // };

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };

  // handleNav = e => {
  //   const key = Number(e.key);
  //   this.props.history.push(`/task/${key}`);
  //   this.setState({ tabIndex: key });
  // };

  renderTask = () => {
    // console.log(this.props);
    switch (this.state.tabIndex) {
      case 1: {
        return this.props.user.stage === 1 ? (
          <TaskOne />
        ) : (
          <TaskCompleted title="HTML Task" next={this.state.tabIndex + 1} />
        );
      }
      case 2:
        return this.props.user.stage === 2 ? (
          <TaskTwo />
        ) : (
          <TaskCompleted title="Codewars Task" next={this.state.tabIndex + 1} />
        );
      default:
        break;
    }
  };

  render() {
    return (
      <UserWrapper activeKey={'0'}>
        <Switch>
          <Route path="/task/1" component={TaskOne}></Route>
          <Route path="/task/2" component={TaskOne}></Route>
          <Route path="/task/3" component={Quiz}></Route>
        </Switch>
        {/* {this.renderTask()} */}
      </UserWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user,
  };
};

export default withRouter(
  connect(mapStateToProps, { getCurrentUser })(UserDashboard)
);
