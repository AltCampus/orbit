const axios = require("axios");

module.exports = {
  mail: async (toAddress, studentName, hashMail) => {
    await axios.post(
      `https://mail.zoho.in/api/accounts/${process.env.accountId}/messages`,
      {
        fromAddress: "prashant@altcampus.io",
        toAddress,
        subject: "AltCampus Application",
        content: ""
      },
      {
        "Content-Type": "application/json",
        Authorization: `Zoho-authtoken ${process.env.oAuthToken}`
      }
    );
  }
};
