import React, { Component } from "react";
import TaskOneProgress from "./TaskProgress/TaskOneProgress";
import TaskTwoProgress from "./TaskProgress/TaskTwoProgress";
import TaskThreeProgress from "./TaskProgress/TaskThreeProgress";
import TaskFourProgress from "./TaskProgress/TaskFourProgress";

const UserProgress = props => {
  return (
    <div className="progress-container">
      <TaskOneProgress user={props.user} fetchUsers={props.fetchUsers} />
      <TaskTwoProgress user={props.user} fetchUsers={props.fetchUsers} />
      {props.user && props.user.quiz && <TaskThreeProgress user={props.user} />}
      {props.user && props.user.stage === 4 && (
        <TaskFourProgress user={props.user} fetchUser={props.fetchUsers} />
      )}
    </div>
  );
};

export default UserProgress;
