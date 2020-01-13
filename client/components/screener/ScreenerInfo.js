import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

function ScreenerInfo() {
  return (
    <Collapse accordion>
      <Panel header="Screener Details" key="1">
        <p>{"Random data"}</p>
      </Panel>
    </Collapse>
  );
}

export default ScreenerInfo;
