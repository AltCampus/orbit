import React from "react";

import AdminWrapper from "../dashboard/admin/AdminWrapper";
import Calender from "./Calendar";

function Question() {
  return (
    <>
      <AdminWrapper activeKey={"2"}>
        <h2>Schedule Interviews</h2>
        <br />
        <Calender />
      </AdminWrapper>
    </>
  );
}

export default Question;
