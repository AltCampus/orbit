const style = `color:rgb(0,0,0);font-family:Verdana, Arial, Helvetica, sans-serif;font-size:13.3333px;font-style:normal;font-weight:normal;letter-spacing:normal;orphans:2;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;background-color:rgb(255,255,255);`

const template = (studentName, startDate) => {
  return (
    `<div>
      <div>
        <div>
          Hi ${studentName.split(' ')[0]},
        </div>
        <div><br></div>
      </div>
      <div>
        Congratulations!
      </div>
      <div><br></div>
      <div>
        <div>
          You have been selected to AltCampus' software development program starting on ${startDate}. 
        </div>
      </div>
      <div><br></div>
      <div>
        Please find the attached acceptance letter and <a href="https://galaxy.altcampus.xyz/docs/onboarding@AltCampus.pdf">onboarding document</a>.
      </div>
      <div><br></div>
      <div>
        We are excited to see you at AltCampus!
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
