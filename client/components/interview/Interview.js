import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminWrapper from "../dashboard/admin/AdminWrapper";
import SlotList from "./SlotList";
import Calender from "./Calender";
import { message, Typography } from "antd";
import InterviewsList from "./InterviewsList";
const { Title } = Typography;
function Interview() {
  const [slots, setSlots] = useState(null);
  const [sortedSlots, setSortedSlots] = useState(null);
  const getSlots = async () => {
    try {
      const res = await axios.get("/api/v1/interviews/all", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      setSlots(res.data.slots);
      setSortedSlots(
        res.data.slots.reduce((acc, val) => {
          const slotDate = new Date(val.startTime).toLocaleDateString();
          if (acc[slotDate]) {
            acc[slotDate].push(val);
          } else {
            acc[slotDate] = [val];
          }
          return acc;
        }, {})
      );
    } catch (error) {
      console.error(error);
      message.error("Failed to load slots");
    }
  };
  const deleteSlot = async id => {
    try {
      const res = await axios.delete(`/api/v1/interviews/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.authToken)
        }
      });
      message.info("Slot has been deleted");
      await getSlots();
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.error);
      }
      message.error("An error occured");
    }
  };

  useEffect(() => {
    getSlots();
  }, []);

  return (
    <>
      <AdminWrapper activeKey={"2"}>
        <Title>Schedule Interviews</Title>
        <Calender getSlots={getSlots} />
        <SlotList sortedSlots={sortedSlots} deleteSlot={deleteSlot} />
        <InterviewsList />
      </AdminWrapper>
    </>
  );
}

export default Interview;
