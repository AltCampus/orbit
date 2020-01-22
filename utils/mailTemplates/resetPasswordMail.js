const style = `color:rgb(0,0,0);font-family:Verdana, Arial, Helvetica, sans-serif;font-size:13.3333px;font-style:normal;font-weight:normal;letter-spacing:normal;orphans:2;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;background-color:rgb(255,255,255);`;

const template = (studentName, hashMail) => {
  return `<div>
      <div>
        <div>
          Hi ${studentName.split(" ")[0]},<br><br>
        </div>
        <div><br></div>
      </div>
      <div>
        <div>
        You are receiving this email because we received a password reset request for your account.
        You can reset your password by clicking on <a href="https://galaxy.altcampus.xyz/account/claim/${hashMail}">this link</a>.
        </div>
      </div>
      <div><br></div>
      <div>
        If you did not request a password reset, no further action is required.
      </div>
      <div><br></div>
      <div>
        Regards,<br>
      </div>
      <div>
        AltCampus<br>
      </div>
    </div>
    `;
};

module.exports = template;
