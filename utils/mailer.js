const axios = require("axios");
const mailTemplate = require("./mailTemplate");

exports.mail = function(status, toAddress, studentName, payLoad) {
  let content;
  switch (status) {
    case "40_MINS_AFTER_APPLYING":
      content = mailTemplate.getApplyMail(studentName, payLoad);
    case "REJECTION_MAIL_BEFORE_INTERVIEW":
      content = mailTemplate.getRejectMailBeforeInterview(studentName);
    case "SCHEDULE_INTERVIEW_MAIL_ALERT":
      content = mailTemplate.scheduleInterviewMail(studentName);
    case "ACCEPTANCE_MAIL_AFTER_INTERVIEW":
      content = mailTemplate.getAcceptMail(studentName, payLoad);
    case "REJECTION_MAIL_AFTER_INTERVIEW":
      content = mailTemplate.getRejectMailAfterInterview(studentName);
  }

  try {
    axios.post(
      `https://mail.zoho.com/api/accounts/${process.env.accountId}/messages`,
      {
        fromAddress: "prashant@altcampus.io",
        toAddress,
        subject: "AltCampus Application",
        content
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Zoho-authtoken ${process.env.oAuthToken}`
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
