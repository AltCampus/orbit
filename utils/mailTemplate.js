var firstPostApplicationMail = require("./mailTemplates/firstPostApplicationMail");
var rejectionMailBeforeInterview = require("./mailTemplates/rejectionMailBeforeInterview");
var rejectionMailAfterInterview = require("./mailTemplates/rejectionMailAfterInterview");
var finalAcceptanceMail = require("./mailTemplates/finalAcceptanceMail");
var scheduleInterviewMail = require("./mailTemplates/scheduleInterviewMail");
var resetPasswordMail = require("./mailTemplates/resetPasswordMail");

exports.getApplyMail = (studentName, hashMail) => {
  return firstPostApplicationMail(studentName, hashMail);
};

exports.getRejectionMailBeforeInterview = studentName => {
  return rejectionMailBeforeInterview(studentName);
};

exports.getRejectionMailAfterInterview = studentName => {
  return rejectionMailAfterInterview(studentName);
};

exports.getAcceptMail = (studentName, batchStartDate) => {
  return finalAcceptanceMail(studentName, batchStartDate);
};

exports.scheduleInterviewMail = studentName => {
  return scheduleInterviewMail(studentName);
};
exports.getResetPasswordMail = (studentName, hashMail) => {
  return resetPasswordMail(studentName, hashMail);
};
