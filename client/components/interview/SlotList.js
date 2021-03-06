import React from "react";
import {
  Table,
  Divider,
  Tag,
  message,
  Typography,
  Popover,
  Button
} from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Column } = Table;

function SlotList({ sortedSlots, slots, deleteSlot }) {
  return (
    <div>
      <Divider />
      <Title level={2}>List of slots</Title>
      {sortedSlots &&
        Object.keys(sortedSlots)
          .sort((a, b) => new Date(a) - new Date(b))
          .map(date => {
            return (
              <div className="day-wise-slot" key={date}>
                <Title level={3}>{date}</Title>
                <div className="slots-container">
                  {sortedSlots[date]
                    .sort(
                      (a, b) =>
                        new Date(a.startTime).valueOf() -
                        new Date(b.startTime).valueOf()
                    )
                    .map(slot =>
                      slot.user ? (
                        <Popover
                          content={
                            <Button href={`/user/${slot.user._id}`}>
                              Click here to go to profile
                            </Button>
                          }
                          title={slot.user.name}
                          trigger="click"
                        >
                          <Tag
                            closable
                            color="green"
                            onClose={e => {
                              e.preventDefault();
                              deleteSlot(slot._id);
                            }}
                          >
                            {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                            {new Date(slot.endTime).toLocaleTimeString()}
                          </Tag>
                        </Popover>
                      ) : (
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
                      )
                    )}
                </div>
                <Divider />
              </div>
            );
          })}
    </div>
  );
}

export default SlotList;
