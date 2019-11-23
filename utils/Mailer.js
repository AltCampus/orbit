// const axios = require("axios");

// function getApplicationContent(studentName, hashMail) {
//   var Mail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

//   <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
//   <head>
//   <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
//   <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
//   <meta content="width=device-width" name="viewport"/>
//   <!--[if !mso]><!-->
//   <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
//   <!--<![endif]-->
//   <title></title>
//   <!--[if !mso]><!-->
//   <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
//   <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
//   <!--<![endif]-->
//   <style type="text/css">
//       body {
//         margin: 0;
//         padding: 0;
//       }

//       table,
//       td,
//       tr {
//         vertical-align: top;
//         border-collapse: collapse;
//       }

//       * {
//         line-height: inherit;
//       }

//       a[x-apple-data-detectors=true] {
//         color: inherit !important;
//         text-decoration: none !important;
//       }
//     </style>
//   <style id="media-query" type="text/css">
//       @media (max-width: 625px) {

//         .block-grid,
//         .col {
//           min-width: 320px !important;
//           max-width: 100% !important;
//           display: block !important;
//         }

//         .block-grid {
//           width: 100% !important;
//         }

//         .col {
//           width: 100% !important;
//         }

//         .col>div {
//           margin: 0 auto;
//         }

//         img.fullwidth,
//         img.fullwidthOnMobile {
//           max-width: 100% !important;
//         }

//         .no-stack .col {
//           min-width: 0 !important;
//           display: table-cell !important;
//         }

//         .no-stack.two-up .col {
//           width: 50% !important;
//         }

//         .no-stack .col.num4 {
//           width: 33% !important;
//         }

//         .no-stack .col.num8 {
//           width: 66% !important;
//         }

//         .no-stack .col.num4 {
//           width: 33% !important;
//         }

//         .no-stack .col.num3 {
//           width: 25% !important;
//         }

//         .no-stack .col.num6 {
//           width: 50% !important;
//         }

//         .no-stack .col.num9 {
//           width: 75% !important;
//         }

//         .video-block {
//           max-width: none !important;
//         }

//         .mobile_hide {
//           min-height: 0px;
//           max-height: 0px;
//           max-width: 0px;
//           display: none;
//           overflow: hidden;
//           font-size: 0px;
//         }

//         .desktop_hide {
//           display: block !important;
//           max-height: none !important;
//         }
//       }
//     </style>
//   </head>
//   <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
//   <!--[if IE]><div class="ie-browser"><![endif]-->
//   <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td style="word-break: break-word; vertical-align: top;" valign="top">
//   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
//   <div style="background-color:#FFFFFF;">
//   <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 605px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
//   <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
//   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:605px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
//   <!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:transparent;width:605px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
//   <div class="col num12" style="min-width: 320px; max-width: 605px; display: table-cell; vertical-align: top; width: 605px;">
//   <div style="width:100% !important;">
//   <!--[if (!mso)&(!IE)]><!-->
//   <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
//   <!--<![endif]-->
//   <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px;" valign="top">
//   <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
//   </tr>
//   </tbody>
//   </table>
//   </td>
//   </tr>
//   </tbody>
//   </table>
//   <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
//   <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><a href="http://example.com" tabindex="-1" target="_blank"> <img align="center" alt="Altcampus" border="0" class="center fixedwidth" src="https://altcampus.io/images/logo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; width: 100%; max-width: 211px; display: block;" title="Altcampus" width="211"/></a>
//   <!--[if mso]></td></tr></table><![endif]-->
//   </div>
//   <!--[if (!mso)&(!IE)]><!-->
//   </div>
//   <!--<![endif]-->
//   </div>
//   </div>
//   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//   <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
//   </div>
//   </div>
//   </div>
//   <div style="background-color:#ffffff;">
//   <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 605px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
//   <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
//   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:605px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
//   <!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:transparent;width:605px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;background-color:#FFFFFF;"><![endif]-->
//   <div class="col num12" style="min-width: 320px; max-width: 605px; display: table-cell; vertical-align: top; width: 605px;">
//   <div style="background-color:#FFFFFF;width:100% !important;">
//   <!--[if (!mso)&(!IE)]><!-->
//   <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
//   <!--<![endif]-->
//   <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
//   <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
//   </tr>
//   </tbody>
//   </table>
//   </td>
//   </tr>
//   </tbody>
//   </table>
//   <!--[if (!mso)&(!IE)]><!-->
//   </div>
//   <!--<![endif]-->
//   </div>
//   </div>
//   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//   <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
//   </div>
//   </div>
//   </div>
//   <div style="background-color:#ffffff;">
//   <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 605px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
//   <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
//   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:605px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
//   <!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:transparent;width:605px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
//   <div class="col num12" style="min-width: 320px; max-width: 605px; display: table-cell; vertical-align: top; width: 605px;">
//   <div style="width:100% !important;">
//   <!--[if (!mso)&(!IE)]><!-->
//   <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
//   <!--<![endif]-->
//   <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Georgia, 'Times New Roman', serif"><![endif]-->
//   <div style="color:#134C75;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
//   <div style="font-size: 12px; line-height: 1.2; font-family: 'Bitter', Georgia, Times, 'Times New Roman', serif; color: #134C75; mso-line-height-alt: 14px;">
//   <p style="font-size: 28px; line-height: 1.2; mso-line-height-alt: 34px; margin: 0;"><span style="font-size: 28px;">Hi ${studentName},</span></p>
//   </div>
//   </div>
//   <!--[if mso]></td></tr></table><![endif]-->
//   <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
//   <div style="color:#555555;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">We have received your application for the AltCampus software development program.</span></p>
//   <p style="font-size: 12px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; margin: 0;"><br/><span style="font-size: 15px;">Your application process would be through our web-based app orbit. You can log in using below link.</span></p>
//   <p style="font-size: 12px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; margin: 0;"><br/><span style="font-size: 15px;">Our admission process has four steps.</span></p>
//   <p style="font-size: 12px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; margin: 0;"><br/><span style="font-size: 15px;">1. <strong>A simple task based on HTML/CSS</strong></span></p><br/>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">We ask you to do a simple task. You would be given online resources to do the same. It requires very little effort (2-3 hours). You are required to submit the solution as soon as possible(preferably within 1-3 days). Don't worry, we are not seeking perfection.<br/><br/></span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;"><strong>2. Solve basic questions on CodeWars<br/><br/></strong></span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">CodeWars is an online platform that helps software developers to train on programming challenges. You are required to sign up and then submit your codewars username. You would be given a three day time period to complete as many challenges as you want.<br/><br/></span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;"><strong>3. Q/A</strong><br/><br/></span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">In this round, you would be given a set of 30 questions that you have to complete in one hour of a time limit. These would be a mix of aptitude, personality, and knowledge-based questions. These questions can be objective and/or subjective.</span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;"><br/><strong>4. A casual video call<br/><br/></strong></span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">Based on your performance of the last three rounds it would be determined whether you have been qualified for the last round or not. The video call(5-20 minutes) is just a casual interaction to know you better.</span></p>
//   <p style="font-size: 12px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; margin: 0;"><br/><span style="font-size: 15px;">Cheers,</span></p>
//   <p style="font-size: 15px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 23px; margin: 0;"><span style="font-size: 15px;">Prashant<br/></span></p>
//   <p style="font-size: 12px; line-height: 1.5; color: #555555; font-family: 'Open Sans', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; margin: 0;"> </p>
//   </div>
//   <!--[if mso]></td></tr></table><![endif]-->
//   <div align="left" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
//   <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://orbit.altcampus.io/${hashMail}" style="height:33pt; width:117pt; v-text-anchor:middle;" arcsize="57%" stroke="false" fillcolor="#28ac5c"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:12px"><![endif]--><a href="http://orbit.altcampus.io/${hashMail}" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #28ac5c; border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px; width: auto; width: auto; border-top: 1px solid #28ac5c; border-right: 1px solid #28ac5c; border-bottom: 1px solid #28ac5c; border-left: 1px solid #28ac5c; padding-top: 10px; padding-bottom: 10px; font-family: 'Open Sans', Helvetica, Arial, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:30px;padding-right:30px;font-size:12px;display:inline-block;"><span style="font-size: 12px; line-height: 2; mso-line-height-alt: 24px;">Login from here</span></span></a>
//   <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
//   </div>
//   <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 10px; padding-bottom: 30px; padding-left: 10px;" valign="top">
//   <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #DDDDDD; width: 100%;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
//   </tr>
//   </tbody>
//   </table>
//   </td>
//   </tr>
//   </tbody>
//   </table>
//   <!--[if (!mso)&(!IE)]><!-->
//   </div>
//   <!--<![endif]-->
//   </div>
//   </div>
//   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//   <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
//   </div>
//   </div>
//   </div>
//   <div style="background-color:transparent;">
//   <div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 605px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
//   <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
//   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:605px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
//   <!--[if (mso)|(IE)]><td align="center" width="403" style="background-color:transparent;width:403px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px;"><![endif]-->
//   <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 400px; width: 403px;">
//   <div style="width:100% !important;">
//   <!--[if (!mso)&(!IE)]><!-->
//   <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
//   <!--<![endif]-->
//   <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
//   <div style="color:#8F8F8F;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
//   <div style="font-size: 12px; line-height: 1.2; font-family: 'Open Sans', Helvetica, Arial, sans-serif; color: #8F8F8F; mso-line-height-alt: 14px;">
//   <p style="font-size: 11px; line-height: 1.2; mso-line-height-alt: 13px; margin: 0;"><span style="font-size: 11px;">Copyright © 2019 Altcampus, All rights reserved. </span><br/><span style="font-size: 11px;">You subscribed to our newsletter via our website, <a href="https://altcampus.io" rel="noopener" style="text-decoration: underline; color: #28ac5c;" target="_blank">altcampus.io</a></span></p>
//   </div>
//   </div>
//   <!--[if mso]></td></tr></table><![endif]-->
//   <!--[if (!mso)&(!IE)]><!-->
//   </div>
//   <!--<![endif]-->
//   </div>
//   </div>
//   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//   <!--[if (mso)|(IE)]></td><td align="center" width="201" style="background-color:transparent;width:201px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:15px; padding-bottom:15px;"><![endif]-->
//   <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 201px;">
//   <div style="width:100% !important;">
//   <!--[if (!mso)&(!IE)]><!-->
//   <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 10px; padding-left: 10px;">
//   <!--<![endif]-->
//   <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
//   <tbody>
//   <tr style="vertical-align: top;" valign="top">
//   <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
//   <table activate="activate" align="right" alignment="alignment" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" to="to" valign="top">
//   <tbody>
//   <tr align="right" style="vertical-align: top; display: inline-block; text-align: right;" valign="top">
//   <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="https://www.facebook.com/AltCampusIO/" target="_blank"><img title='Altcampus Facebook' alt="Facebook" height="32" src="https://i.imgur.com/HkNgOJB.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
//   <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="http://twitter.com/altcampus" target="_blank"><img alt="Twitter" height="32" title='AltCampus Twitter' src="https://i.imgur.com/nS8KaN8.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Twitter" width="32"/></a></td>
//   <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="https://www.instagram.com/altcampus/" target="_blank"><img alt="AltCampus Instagram" height="32" src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Instagram" width="32"/></a></td>
//   </tr>
//   </tbody>
//   </table>
//   </td>
//   </tr>
//   </tbody>
//   </table>
//   <!--[if (!mso)&(!IE)]><!-->
//   </div>
//   <!--<![endif]-->
//   </div>
//   </div>
//   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//   <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
//   </div>
//   </div>
//   </div>
//   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//   </td>
//   </tr>
//   </tbody>
//   </table>
//   <!--[if (IE)]></div><![endif]-->
//   </body>
//   </html>`;
//   return Mail;
// }
// exports.mail = function(toAddress, studentName, hashMail) {
//   console.log(
//     toAddress,
//     studentName,
//     hashMail,
//     process.env.accountId,
//     process.env.oAuthToken
//   );
//   try {
//     axios.post(
//       `https://mail.zoho.com/api/accounts/${process.env.accountId}/messages`,
//       {
//         fromAddress: "prashant@altcampus.io",
//         toAddress: toAddress,
//         subject: "AltCampus Application",
//         content: `${getApplicationContent(studentName, hashMail)}`
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Zoho-authtoken ${process.env.oAuthToken}`
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
