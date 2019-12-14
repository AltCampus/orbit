import React, { useState } from "react";
import axios from "axios";
import { Calendar as CalendarComp, TimePicker, Button, message } from "antd";

export default function Calendar() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function scheduleInterview() {
    if (date || time) {
      await axios.post(
        "http://localhost:3000/api/v1/interviews/",
        { date, time },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      message.success("Scheduled Interview");
    } else {
      message.error("time and date are required");
    }
  }

  return (
    <div>
      <div style={{ width: 300, border: "1px solid #d9d9d9", borderRadius: 4 }}>
        <CalendarComp
          fullscreen={false}
          onSelect={value => setDate(value.format("YYYY-MM-DD"))}
        />
      </div>
      <TimePicker
        onChange={value => setTime(value.format("hh:mm"))}
        format="hh:mm"
      />
      <Button onClick={scheduleInterview}>Schedule Interview</Button>
    </div>
  );
}
