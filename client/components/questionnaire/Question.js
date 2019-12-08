import React from "react";
import AdminWrapper from "../dashboard/admin/AdminWrapper";
import QuestionList from "./QuestionList";
import Questionnaire from "./Questionnaire";

function Question() {
  return (
    <>
      <AdminWrapper activeKey={"1"}>
        <Questionnaire />
        <QuestionList />
      </AdminWrapper>
    </>
  );
}

export default Question;
