const axios = require("axios");
const mailTemplate = require("./mailTemplate");

const getSubject = status => {
  switch (status) {
    case "40_MINS_AFTER_APPLYING":
    case "REJECTION_MAIL_BEFORE_INTERVIEW":
    case "SCHEDULE_INTERVIEW_MAIL_ALERT":
    case "ACCEPTANCE_MAIL_AFTER_INTERVIEW":
    case "REJECTION_MAIL_AFTER_INTERVIEW":
      return "AltCampus Application";
    case "RESET_ACCOUNT_PASSWORD":
      return "Password Reset - Galaxy (AltCampus)";
    default:
      return "AltCampus Application";
  }
};
const getContent = (status, studentName, payload) => {
  switch (status) {
    case "40_MINS_AFTER_APPLYING":
      return mailTemplate.getApplyMail(studentName, payload); // payload here is hashMail
    case "REJECTION_MAIL_BEFORE_INTERVIEW":
      return mailTemplate.getRejectionMailBeforeInterview(studentName);
    case "SCHEDULE_INTERVIEW_MAIL_ALERT":
      return mailTemplate.scheduleInterviewMail(studentName);
    case "ACCEPTANCE_MAIL_AFTER_INTERVIEW":
      return mailTemplate.getAcceptMail(studentName, payload);
    case "REJECTION_MAIL_AFTER_INTERVIEW":
      return mailTemplate.getRejectMailAfterInterview(studentName);
    case "RESET_ACCOUNT_PASSWORD":
      return mailTemplate.getResetPasswordMail(studentName, payload);
    default:
      return "Something went wrong!";
  }
};


function actualMailer(status, toAddress, studentName, payload) {
  let content = getContent(status, studentName, payload);
  let subject = getSubject(status);
  try {
    axios.post(
      `https://mail.zoho.com/api/accounts/${process.env.accountId}/messages`,
      {
        fromAddress: "prashant@altcampus.io",
        toAddress,
        subject,
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
    console.log(error, " error in mail");
  }
};

function fakeMailer (status, toAddress, studentName, payload) {
  return console.log('mailed', toAddress, status, statusName);
};

exports.mail = process.env.isMailerOn ? actualMailer : fakeMailer;