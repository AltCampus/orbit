import React from "react";
import { Collapse, Typography, Descriptions } from "antd";
import ScreenerInfoEditor from "./ScreenerInfoEditor";
const { Panel } = Collapse;
const { Text } = Typography;

function ScreenerInfo(props) {
  const { screener } = props.user;
  return (
    <Collapse accordion defaultActiveKey="1">
      <Panel header="Screener Details" key="1">
        {props.user.screener ? (
          <>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Age">{screener.age}</Descriptions.Item>
              <Descriptions.Item label="Location">
                {screener.location}
              </Descriptions.Item>
              <Descriptions.Item label="Programming Experience">
                {screener.programmingExperience}
              </Descriptions.Item>
              <Descriptions.Item label="Source Platform">
                {screener.sourcePlatform}
              </Descriptions.Item>
              <Descriptions.Item label="Expected Joining Time">
                {`${screener.expectedJoiningMonth} 
                ${screener.expectedJoiningYear} `}
              </Descriptions.Item>
              <Descriptions.Item label="Is Currently Employed">
                {screener.isCurrentlyEmployed ? "Yes" : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Background">
                {screener.background}
              </Descriptions.Item>
              <Descriptions.Item label="Graduation Details">
                {screener.graduationDetails}
              </Descriptions.Item>
              <Descriptions.Item label="Graduation Year">
                {screener.graduationYear}
              </Descriptions.Item>
              <Descriptions.Item label="Remarks">
                {screener.screenerRemarks}
              </Descriptions.Item>
              <Descriptions.Item label="Motivation">
                {screener.screenerMotivation}
              </Descriptions.Item>
            </Descriptions>
          </>
        ) : (
          <Text strong type="danger">
            Screener Information is not added yet
          </Text>
        )}
        <ScreenerInfoEditor user={props.user} fetchUser={props.fetchUser} />
      </Panel>
    </Collapse>
  );
}

export default ScreenerInfo;
