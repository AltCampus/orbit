const style = `color:rgb(0,0,0);font-family:Verdana, Arial, Helvetica, sans-serif;font-size:13.3333px;font-style:normal;font-weight:normal;letter-spacing:normal;orphans:2;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;background-color:rgb(255,255,255);`

const template = (studentName) => {
  return (
    `<div>
      <div>
        <div>
          Hi ${studentName.split(' ')[0]},<br><br>Thank you for going through our application process.<br>
        </div>
        <div><br></div>
      </div>
      <div>
        <div>
          We appreciate your effort, however you couldn't make it to the next round. 
        </div>
      </div>
      <div><br></div>
      <div>
        Please don't let this dishearten you. Continue learning.
      </div>
      <div>
        <br>
      </div>
      <div>
        Thanks,<br>
      </div>
      <div>
        Prashant<br>
      </div>
    </div>
    `
  )
};

module.exports = template;
