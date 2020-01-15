import React, { Component } from "react";
import axios from "axios";
import { Spin, Icon, Typography, Divider, Tag, Modal } from "antd";
const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;
import {
  fetchAvailableSlots,
  bookAvailableSlot
} from "../../../actions/interview";
import { connect } from "react-redux";

class ScheduleInterview extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    if (!this.props.hasFetchedAvailableSlots) {
      this.props.fetchAvailableSlots();
    }
  }

  bookSlot(id) {
    this.props.bookAvailableSlot(id);
  }

  confirmSlot(id, date, startTime, endTime) {
    confirm({
      title: "Do you want to book this slot?",
      content: [
        <Title level={3}>{date}</Title>,
        <Text strong>
          {`${new Date(startTime).toLocaleTimeString()}
           - 
          ${new Date(endTime).toLocaleTimeString()}`}
        </Text>
      ],
      onOk: () => {
        this.bookSlot(id);
      }
    });
  }

  render() {
    const sortedSlots =
      this.props.availableSlots &&
      this.props.availableSlots.reduce((acc, val) => {
        const slotDate = new Date(val.startTime).toLocaleDateString();
        if (acc[slotDate]) {
          acc[slotDate].push(val);
        } else {
          acc[slotDate] = [val];
        }
        return acc;
      }, {});
    const convertStringToDate = dateString =>
      new Date(
        dateString
          .split("/")
          .reverse()
          .join("-")
      );
    return (
      <>
        {this.props.isFetchingAvailableSlots ||
        this.props.isBookingInterviewSlot ? (
          <div className="loading-div">
            <Spin
              indicator={
                <Icon
                  type="loading"
                  style={{ fontSize: 100, margin: "3rem auto" }}
                />
              }
            />
          </div>
        ) : (
          <>
            <Title level={3}>List of slots</Title>
            {this.props.availableSlots &&
            this.props.availableSlots.length !== 0 ? (
              <Text type="danger">Click on any slot to book it!</Text>
            ) : (
              <Text type="danger">
                No slots available right now! Once available you can schedule
                your interview.{" "}
              </Text>
            )}
            {sortedSlots &&
              Object.keys(sortedSlots)
                .sort((a, b) => convertStringToDate(a) - convertStringToDate(b))
                .map(date => {
                  return (
                    <div className="day-wise-slot" key={date}>
                      <Title level={4}>
                        {convertStringToDate(date).toDateString()}
                      </Title>
                      <div className="slots-container">
                        {sortedSlots[date]
                          .sort(
                            (a, b) =>
                              new Date(a.startTime).valueOf() -
                              new Date(b.startTime).valueOf()
                          )
                          .map(slot => (
                            <span
                              key={slot._id}
                              onClick={() =>
                                this.confirmSlot(
                                  slot._id,
                                  convertStringToDate(date).toDateString(),
                                  slot.startTime,
                                  slot.endTime
                                )
                              }
                            >
                              <Tag>
                                {new Date(slot.startTime).toLocaleTimeString()}
                                {" - "}
                                {new Date(slot.endTime).toLocaleTimeString()}
                              </Tag>
                            </span>
                          ))}
                      </div>
                      <Divider />
                    </div>
                  );
                })}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  const { interview } = state;
  return {
    ...interview
  };
};

export default connect(mapStateToProps, {
  fetchAvailableSlots,
  bookAvailableSlot
})(ScheduleInterview);
