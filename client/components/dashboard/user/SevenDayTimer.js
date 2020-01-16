import React, { Component } from "react";
import { Icon, Tooltip } from "antd";

const Timer = ({ timeLeft }) => {
  return (
    <>
      <span key="time-heading" level={3} className="center-text">
        <Icon type="clock-circle" /> Time Left:{" "}
      </span>
      <span key="days">
        <span className="clock-value">{parseInt(timeLeft / 86400)}</span> Days,{" "}
      </span>
      <span key="hours">
        <span className="clock-value">{parseInt(timeLeft / 3600) % 24}</span>{" "}
        Hours,{" "}
      </span>
      <span key="minutes">
        <span className="clock-value">{parseInt(timeLeft / 60) % 60}</span>{" "}
        Minutes and{" "}
      </span>
      <span key="seconds">
        <span className="clock-value">{timeLeft % 60}</span> Seconds{" "}
      </span>
    </>
  );
};
class SevenDayTimer extends Component {
  state = {
    timeLeft: null,
    loading: true
  };
  componentDidMount() {
    if (
      new Date(this.props.accountCreationTime).valueOf() + 7 * 86400 * 1000 >
      new Date().valueOf()
    ) {
      this.setState(
        {
          timeLeft: parseInt(
            (new Date(this.props.accountCreationTime).valueOf() +
              7 * 86400 * 1000 -
              new Date().valueOf()) /
              1000
          ),
          loading: false
        },
        () => {
          this.startTimer();
        }
      );
    } else {
      this.setState({ loading: false });
    }
  }
  intervalId = React.createRef();

  startTimer = () => {
    if (!this.state.timeLeft) {
      return;
    }
    this.intervalId = window.setInterval(() => {
      if (this.state.timeLeft === 0) {
        window.clearInterval(this.intervalId);
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    }, 1000);
  };
  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }
  render() {
    return (
      <Tooltip
        title={
          "Those who submit their first 3 tasks within 7 days have higher chance of getting selected. You would still have chance to submit after timer is completed!"
        }
      >
        <span className="timer-container">
          {!this.state.loading && (
            <>
              {this.state.timeLeft ? (
                <Timer timeLeft={this.state.timeLeft} />
              ) : (
                <span className="red-text">You're running Late</span>
              )}
            </>
          )}
        </span>
      </Tooltip>
    );
  }
}

export default SevenDayTimer;
