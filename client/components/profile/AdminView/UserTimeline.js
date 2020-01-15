import React from "react";
import { Timeline, Typography, Collapse } from "antd";
const { Title } = Typography;
const { Panel } = Collapse;

function UserTimeline({ timeline }) {
  return (
    <div className="user-timeline">
      <Title level={3}>Timeline</Title>
      <Timeline>
        {timeline.map(timelineItem => (
          <Timeline.Item>
            <span
              className="timeline-description"
              dangerouslySetInnerHTML={{ __html: timelineItem.description }}
            ></span>
            <span className="timeline-time">
              {new Date(timelineItem.time).toDateString() +
                " " +
                new Date(timelineItem.time)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
            </span>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}

export default UserTimeline;
