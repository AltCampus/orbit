const timelineCreator = (action, payload = {}) => {
  switch (action) {
    case "USER_REGISTERED":
      return {
        title: "Account Created",
        description: `${payload.name} submitted the application form.`,
        time: new Date()
      };
    case "ACCOUNT_CLAIMED":
      return {
        title: "Account Claimed",
        description: `${payload.name} claimed their account.`,
        time: new Date()
      };
    case "SCREENER_INFORMATION_ADDED":
      return {
        title: `Screener Information Added`,
        description: `<author class="orange-text">${payload.adminName}</author> added the Screener Information for ${payload.name}`,
        time: new Date()
      };
    case "SCREENER_INFORMATION_EDITED":
      return {
        title: `Screener Information Edited`,
        description: `<author class="orange-text">${payload.adminName}</author> edited the Screener Information for ${payload.name}`,
        time: new Date()
      };
    case "TASK_ONE_SUBMITTED":
      return {
        title: "Task 1 Submitted",
        description: `${payload.name} submitted their <a href="${payload.csbLink}" target="_blank">CodeSandBox Link</a>.`,
        time: new Date()
      };
    case "TASK_ONE_REVIEWED":
      return {
        title: "Task 1 Reviewed",
        description: `<author class="orange-text">${payload.adminName}</author> reviewed their <a href="${payload.csbLink}" target="_blank">CodeSandBox Submission</a> and assigned ${payload.point} points.`,
        time: new Date()
      };
    case "TASK_TWO_STARTED":
      return {
        title: "Task 2 Started",
        description: `${payload.name} submitted their <a href="https://codewars.com/users/${payload.codewarsUsername}" target="_blank">Codewars username</a>.`,
        time: new Date()
      };
    case "TASK_TWO_ENDED":
      return {
        title: "Task 2 Started",
        description: `${payload.name}'s <a href="https://codewars.com/users/${payload.codewarsUsername}" target="_blank">Codewars task</a> timer ended.`,
        time: new Date(payload.endTime)
      };
    case "TASK_TWO_REVIEWED":
      return {
        title: "Task 2 Reviewed",
        description: `<author class="orange-text">${payload.adminName}</author> reviewed their <a href="https://codewars.com/users/${payload.codewarsUsername}" target="_blank">Codewars Profile</a> and assigned ${payload.point} points.`,
        time: new Date()
      };
    case "FORCEFULLY_SUBMITTED_TASK_THREE":
      return {
        title: "Task 3 Submitted",
        description: `${payload.name} marked codewars task completed before timer ends.`
      };
    case "STAGE_UPDATED_TO_THREE":
      return {
        title: "Upgraded to stage 3",
        description: `${payload.name}'s stage was updated to 3 when Codewars timer was finished`,
        time: new Date()
      };
    case "QUIZ_STARTED":
      return {
        title: "Quiz Started",
        description: `${payload.name} started the quiz.`,
        time: new Date()
      };
    case "QUIZ_SUBMITTED":
      return {
        title: "Quiz Submitted",
        description: `${payload.name} submitted the quiz.`,
        time: new Date()
      };
    case "QUIZ_REVIEWED":
      return {
        title: "Quiz Reviewed",
        description: `<author class="orange-text">${payload.adminName}</author> reviewed their quiz submission and assigned ${payload.score} points out of ${payload.maximumScore}.`,
        time: new Date()
      };
    case "ACCEPTED_FOR_INTERVIEW":
      return {
        title: "Accepted for Interview",
        description: `<author class="orange-text">${payload.adminName}</author> accepted ${payload.name} for interview.`,
        time: new Date()
      };
    case "INTERVIEW_BOOKED":
      return {
        title: "Interview Booked",
        description: `${payload.name} booked an interview slot ( 
          ${new Date(payload.startTime).toDateString()} 
          ${new Date(payload.startTime).toLocaleTimeString()} 
          - 
          ${new Date(payload.endTime).toLocaleTimeString()} ).`,
        time: new Date()
      };
    case "APPLICATION_REJECTED":
      return {
        title: "User Rejected",
        description: `<author class="orange-text">
          ${payload.adminName}
          </author> rejected  ${payload.name}.`,
        time: new Date()
      };
    case "APPLICATION_ACCEPTED":
      return {
        title: "User Accepted",
        description: `<author class="orange-text">
          ${payload.adminName}
          </author> accepted  
          ${payload.name} 
          for joining batch ${payload.batch} and requested to arrive by 
          ${new Date(payload.joiningDate).toDateString()}.`,
        time: new Date()
      };
    default:
      return {
        title: "Something went wrong!",
        description: "Something went wrong here!",
        time: new Date()
      };
  }
};

module.exports = timelineCreator;
