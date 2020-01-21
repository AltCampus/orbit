const style = `color:rgb(0,0,0);font-family:Verdana, Arial, Helvetica, sans-serif;font-size:13.3333px;font-style:normal;font-weight:normal;letter-spacing:normal;orphans:2;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;background-color:rgb(255,255,255);`

const template = (studentName, hashMail) => {
  return (
    `<div>
      <div>
        <div>
          Hi ${studentName.split(' ')[0]},<br><br>I am Prashant from <a href="https://altcampus.io" target="_blank">AltCampus</a>. Hope you are doing good! Thank you for applying to AltCampus software development program.<br>
        </div>
        <div><br></div>
      </div>
      <div>
        <div>
          You can set your password and login to our application processing platform by clicking on this <a href="https://galaxy.altcampus.xyz/account/claim/${hashMail}">link</a>.
          You will get detailed instructions and resources in the platform itself. You have limited time to go through the process so please login as soon as possible.
        </div>
      </div>
      <div><br></div>
      <div>
        You don't need any prior programming experience although it requires a bit of effort from your side.
      </div>
      <div><br></div>
      <div>
        Please get started on the assignments. We are eagerly waiting for your submissions. YOU CAN DO IT. 😊
      </div>
      <div>
        <br>
      </div>
      <div>
        Cheers,<br>
      </div>
      <div>
        Prashant<br>
      </div>
    </div>
    `
  )
};

module.exports = template;
