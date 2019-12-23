import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Button, message, Modal, TimePicker } from "antd";

export default function Calendar() {
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [visible, setVisible] = useState(false);

  const handleDate = value => {
    const date = Date.parse(value);
    if (date < Date.now()) {
      message.warning("Please select vaild date.");
    } else {
      setDate(date);
    }
  };

  async function scheduleInterview() {
    if (!date || !startTime || !endTime) {
      message.warning("All field are required");
    } else if (startTime >= endTime) {
      message.warning("Start time must less than end time!");
    } else if (date < Date.now()) {
      message.warning("Please select vaild date.");
    } else {
      await axios.post(
        "/api/v1/interviews/",
        { date, startTime, endTime },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      message.success("Scheduled Interview");
    }
  }

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setDateAndTime(null);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add interviews slot
      </Button>
      <Modal
        title="Schedule Interview"
        visible={visible}
        onOk={scheduleInterview}
        onCancel={handleCancel}
      >
        <DatePicker onChange={handleDate} />
        <TimePicker
          onChange={value => setStartTime(Date.parse(value))}
          placeholder="Start time"
          minuteStep={20}
          format="HH:mm"
        />
        <TimePicker
          onChange={value => setEndTime(Date.parse(value))}
          placeholder="End time"
          minuteStep={20}
          format="HH:mm"
        />
      </Modal>
    </div>
  );
}
