import React from "react";

function QuizTimer({ time }) {
  return (
    <div>
      Time Left: <span>{parseInt(time / 60)}</span> minutes{" "}
      <span>{time % 60}</span> seconds
    </div>
  );
}

export default QuizTimer;
