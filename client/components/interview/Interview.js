import React from "react";

import AdminWrapper from "../dashboard/admin/AdminWrapper";
import Calender from "./Calender";
function Interview() {
  return (
    <>
      <AdminWrapper activeKey={"2"}>
        <h2>Schedule Interviews</h2>
        <Calender />
      </AdminWrapper>
    </>
  );
}

export default Interview;
