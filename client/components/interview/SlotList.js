import React from "react";
import { Table, Divider, Tag, message, Typography } from "antd";
const { Title } = Typography;
const { Column } = Table;

function SlotList({ sortedSlots, slots, deleteSlot }) {
  return (
    <div>
      <Divider />
      <Title level={2}>List of slots</Title>
      {sortedSlots &&
        Object.keys(sortedSlots).map(date => {
          return (
            <div className="day-wise-slot" key={date}>
              <Title level={3}>{date}</Title>
              <div className="slots-container">
                {sortedSlots[date].map(slot => (
                  <span key={slot._id} style={{ display: "inline-block" }}>
                    <Tag
                      closable
                      onClose={e => {
                        e.preventDefault();
                        deleteSlot(slot._id);
                      }}
                    >
                      {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                      {new Date(slot.endTime).toLocaleTimeString()}
                    </Tag>
                  </span>
                ))}
              </div>
              <Divider />
            </div>
          );
        })}
    </div>
  );
}

export default SlotList;
