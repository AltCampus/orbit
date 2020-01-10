import React from "react";
import { Table, Divider, Tag, message, Typography } from "antd";
const { Title } = Typography;
const { Column } = Table;

function SlotList({ sortedSlots, slots, deleteSlot }) {
  const convertStringToDate = dateString =>
    new Date(
      dateString
        .split("/")
        .reverse()
        .join("-")
    );
  return (
    <div>
      <Divider />
      <Title level={2}>List of slots</Title>
      {sortedSlots &&
        Object.keys(sortedSlots)
          .sort((a, b) => convertStringToDate(a) - convertStringToDate(b))
          .map(date => {
            return (
              <div className="day-wise-slot" key={date}>
                <Title level={3}>
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
                      <Tag
                        closable
                        color={slot.user ? "green" : ""}
                        onClose={e => {
                          e.preventDefault();
                          deleteSlot(slot._id);
                        }}
                      >
                        {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                        {new Date(slot.endTime).toLocaleTimeString()}
                      </Tag>
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
