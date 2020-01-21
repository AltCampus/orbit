const style = `color:rgb(0,0,0);font-family:Verdana, Arial, Helvetica, sans-serif;font-size:13.3333px;font-style:normal;font-weight:normal;letter-spacing:normal;orphans:2;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;background-color:rgb(255,255,255);`

const template = (studentName) => {
  return (
    `<div>
      <div>
        <div>
          Hi ${studentName.split(' ')[0]},
        </div>
        <div><br></div>
      </div>
      <div>
        Thank you for going through the application process and your effort so far. 
      </div>
      <div><br></div>
      <div>
        <div>
          Your application has been reviewed and you have made it to the next round and final round of online interview.
        </div>
      </div>
      <div><br></div>
      <div>
        Please login to <a href="https://galaxy.altcampus.xyz">our application processing platform</a> to schedule the interview slot.</a>
      </div>
      <div><br></div>
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
