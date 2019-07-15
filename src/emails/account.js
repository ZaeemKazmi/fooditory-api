const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  var mailTemplate =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>' +
    '      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
    '      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">' +
    "      <!--[if !mso]><!-->" +
    '      <meta http-equiv="X-UA-Compatible" content="IE=Edge">' +
    "      <!--<![endif]-->" +
    "      <!--[if (gte mso 9)|(IE)]>" +
    "      <xml>" +
    "        <o:OfficeDocumentSettings>" +
    "          <o:AllowPNG/>" +
    "          <o:PixelsPerInch>96</o:PixelsPerInch>" +
    "        </o:OfficeDocumentSettings>" +
    "      </xml>" +
    "      <![endif]-->" +
    "      <!--[if (gte mso 9)|(IE)]>" +
    '  <style type="text/css">' +
    "    body {width: 600px;margin: 0 auto;}" +
    "    table {border-collapse: collapse;}" +
    "    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}" +
    "    img {-ms-interpolation-mode: bicubic;}" +
    "  </style>" +
    "<![endif]-->" +
    '      <style type="text/css">' +
    "    body, p, div {" +
    "      font-family: courier, monospace;" +
    "      font-size: 16px;" +
    "    }" +
    "    body {" +
    "      color: #FFFFFF;" +
    "    }" +
    "    body a {" +
    "      color: #fe5d61;" +
    "      text-decoration: none;" +
    "    }" +
    "    p { margin: 0; padding: 0; }" +
    "    table.wrapper {" +
    "      width:100% !important;" +
    "      table-layout: fixed;" +
    "      -webkit-font-smoothing: antialiased;" +
    "      -webkit-text-size-adjust: 100%;" +
    "      -moz-text-size-adjust: 100%;" +
    "      -ms-text-size-adjust: 100%;" +
    "    }" +
    "    img.max-width {" +
    "      max-width: 100% !important;" +
    "    }" +
    "    .column.of-2 {" +
    "      width: 50%;" +
    "    }" +
    "    .column.of-3 {" +
    "      width: 33.333%;" +
    "    }" +
    "    .column.of-4 {" +
    "      width: 25%;" +
    "    }" +
    "    @media screen and (max-width:480px) {" +
    "      .preheader .rightColumnContent," +
    "      .footer .rightColumnContent {" +
    "        text-align: left !important;" +
    "      }" +
    "      .preheader .rightColumnContent div," +
    "      .preheader .rightColumnContent span," +
    "      .footer .rightColumnContent div," +
    "      .footer .rightColumnContent span {" +
    "        text-align: left !important;" +
    "      }" +
    "      .preheader .rightColumnContent," +
    "      .preheader .leftColumnContent {" +
    "        font-size: 80% !important;" +
    "        padding: 5px 0;" +
    "      }" +
    "      table.wrapper-mobile {" +
    "        width: 100% !important;" +
    "        table-layout: fixed;" +
    "      }" +
    "      img.max-width {" +
    "        height: auto !important;" +
    "        max-width: 100% !important;" +
    "      }" +
    "      a.bulletproof-button {" +
    "        display: block !important;" +
    "        width: auto !important;" +
    "        font-size: 80%;" +
    "        padding-left: 0 !important;" +
    "        padding-right: 0 !important;" +
    "      }" +
    "      .columns {" +
    "        width: 100% !important;" +
    "      }" +
    "      .column {" +
    "        display: block !important;" +
    "        width: 100% !important;" +
    "        padding-left: 0 !important;" +
    "        padding-right: 0 !important;" +
    "        margin-left: 0 !important;" +
    "        margin-right: 0 !important;" +
    "      }" +
    "    }" +
    "  </style>" +
    "      <!--user entered Head Start-->" +
    "" +
    "     <!--End Head user entered-->" +
    "    </head>" +
    "    <body>" +
    '      <center class="wrapper" data-link-color="#fe5d61" data-body-style="font-size:16px; font-family:courier, monospace; color:#FFFFFF; background-color:#ffffff;">' +
    '        <div class="webkit">' +
    '          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">' +
    "            <tbody><tr>" +
    '              <td valign="top" bgcolor="#ffffff" width="100%">' +
    '                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">' +
    "                  <tbody><tr>" +
    '                    <td width="100%">' +
    '                      <table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    "                        <tbody><tr>" +
    "                          <td>" +
    "                            <!--[if mso]>" +
    "    <center>" +
    '    <table><tr><td width="600">' +
    "  <![endif]-->" +
    '                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">' +
    "                                      <tbody><tr>" +
    '                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#FFFFFF; text-align:left;" bgcolor="#f2f4fb" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">' +
    "    <tbody><tr>" +
    '      <td role="module-content">' +
    "        <p>You've found the secret!</p>" +
    "      </td>" +
    "    </tr>" +
    '  </tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9NPrMr84yuh62DkjjJKP6S">' +
    "      <tbody><tr>" +
    '        <td style="font-size:6px; line-height:10px; padding:30px 0px 30px 0px;" valign="top" align="left"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" src="http://cdn.mcauto-images-production.sendgrid.net/3cd06e218c6675b6/9ccd997b-9c53-4835-b95b-550eee594f41/1517x832.JPG" alt="Off Grid Adventures" width="600" data-responsive="true" data-proportionally-constrained="false"></td>' +
    "      </tr>" +
    '    </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="nP2VTKZg9DBCkZNYMeSi5y">' +
    "      <tbody><tr>" +
    '        <td style="background-color:#fe5d61; padding:30px 50px 30px 50px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#fe5d61"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 17px">Welcome to Fooditory!</span></div>' +
    '<div style="font-family: inherit; text-align: center"><br></div>' +
    '<div style="font-family: inherit; text-align: center"><span style="font-size: 17px">You\'ve found a community of sudents that are just like you.</span></div>' +
    '<div style="font-family: inherit; text-align: center"><span style="font-size: 17px"> </span></div>' +
    '<blockquote style="text-align: center"><span style="color: #ffffff; font-size: 17px; font-family: courier, monospace">Get ready to taste delicious food, immerse yourself in local culture, and meet new people.</span><span style="font-size: 17px">  </span></blockquote>' +
    '<div style="font-family: inherit; text-align: center"><span style="font-size: 17px">Ready for your next food experience?</span></div><div></div></div></td>' +
    "      </tr>" +
    '    </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f039d645-1ca4-4762-a0cc-562bf1ac4e23">' +
    "    <tbody>" +
    "      <tr>" +
    '        <td style="padding:0px 0px 10px 0px;" role="module-content" bgcolor="">' +
    "        </td>" +
    "      </tr>" +
    "    </tbody>" +
    '  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="#f2f4fb">' +
    "    <tbody>" +
    '      <tr role="module-content">' +
    '        <td height="100%" valign="top">' +
    '          <table class="column" width="186" style="width:186px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="">' +
    "            <tbody>" +
    "              <tr>" +
    '                <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="iP7ovjMFiJrZGjpvcuX4LE">' +
    "    <tbody>" +
    "      <tr>" +
    '        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">' +
    '          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="186" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/3cd06e218c6675b6/eda184fe-403a-4d6d-95a6-9901233abe04/1200x801.jpg">' +
    "        </td>" +
    "      </tr>" +
    "    </tbody>" +
    "  </table></td>" +
    "              </tr>" +
    "            </tbody>" +
    "          </table>" +
    '          <table class="column" width="186" style="width:186px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="">' +
    "            <tbody>" +
    "              <tr>" +
    '                <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e98ec682-8edf-4921-b80c-6fff779f6395">' +
    "    <tbody>" +
    "      <tr>" +
    '        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="186" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/3cd06e218c6675b6/e1974b5b-e535-468e-ad26-b67363f5b3e7/759x506.jpg"></td>' +
    "      </tr>" +
    "    </tbody>" +
    "  </table></td>" +
    "              </tr>" +
    "            </tbody>" +
    "          </table>" +
    '        <table width="186" style="width:186px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-2">' +
    "      <tbody>" +
    "        <tr>" +
    '          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="045614b7-7c56-4814-b741-b5e42cba249c">' +
    "    <tbody>" +
    "      <tr>" +
    '        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">' +
    '          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="186" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/3cd06e218c6675b6/ef9a4c07-2833-48bd-9463-e171826a1a8a/700x467.jpg">' +
    "        </td>" +
    "      </tr>" +
    "    </tbody>" +
    "  </table></td>" +
    "        </tr>" +
    "      </tbody>" +
    "    </table></td>" +
    "      </tr>" +
    "    </tbody>" +
    '  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f039d645-1ca4-4762-a0cc-562bf1ac4e23.1">' +
    "    <tbody>" +
    "      <tr>" +
    '        <td style="padding:0px 0px 10px 0px;" role="module-content" bgcolor="">' +
    "        </td>" +
    "      </tr>" +
    "    </tbody>" +
    '  </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4e7QmxjeAcUuJU9VXQ9mRY">' +
    "      <tbody>" +
    "        <tr>" +
    '          <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">' +
    '            <table align="center">' +
    "              <tbody>" +
    '                <tr><td style="padding: 0px 5px;">' +
    '      <a role="social-icon-link" href="http://a" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#3B579D; height:21px; width:21px;">' +
    '        <img role="social-icon" alt="Facebook" title="Facebook" src="https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png" style="height:21px; width:21px;" height="21" width="21">' +
    "      </a>" +
    '    </td><td style="padding: 0px 5px;">' +
    '      <a role="social-icon-link" href="http://b" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#7AC4F7; height:21px; width:21px;">' +
    '        <img role="social-icon" alt="Twitter" title="Twitter" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" style="height:21px; width:21px;" height="21" width="21">' +
    "      </a>" +
    '    </td><td style="padding: 0px 5px;">' +
    '      <a role="social-icon-link" href="http://c" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#7F4B30; height:21px; width:21px;">' +
    '        <img role="social-icon" alt="Instagram" title="Instagram" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" style="height:21px; width:21px;" height="21" width="21">' +
    "      </a>" +
    '    </td><td style="padding: 0px 5px;">' +
    '      <a role="social-icon-link" href="http://d" target="_blank" alt="Pinterest" title="Pinterest" style="display:inline-block; background-color:#CB2027; height:21px; width:21px;">' +
    '        <img role="social-icon" alt="Pinterest" title="Pinterest" src="https://marketing-image-production.s3.amazonaws.com/social/white/pinterest.png" style="height:21px; width:21px;" height="21" width="21">' +
    "      </a>" +
    '    </td><td style="padding: 0px 5px;">' +
    '      <a role="social-icon-link" href="http://e" target="_blank" alt="Google" title="Google" style="display:inline-block; background-color:#D44132; height:21px; width:21px;">' +
    '        <img role="social-icon" alt="Google" title="Google" src="https://marketing-image-production.s3.amazonaws.com/social/white/google-plus.png" style="height:21px; width:21px;" height="21" width="21">' +
    "      </a>" +
    '    </td><td style="padding: 0px 5px;">' +
    '      <a role="social-icon-link" href="f" target="_blank" alt="LinkedIn" title="LinkedIn" style="display:inline-block; background-color:#0077B5; height:21px; width:21px;">' +
    '        <img role="social-icon" alt="LinkedIn" title="LinkedIn" src="https://marketing-image-production.s3.amazonaws.com/social/white/linkedin.png" style="height:21px; width:21px;" height="21" width="21">' +
    "      </a>" +
    "    </td></tr>" +
    "              </tbody>" +
    "            </table>" +
    "          </td>" +
    "        </tr>" +
    "      </tbody>" +
    '    </table><div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#FFFFFF; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:center;" data-muid="oygpiesZnKWvUaU4RM5cV">' +
    '    <div class="Unsubscribe--addressLine"></div>' +
    '    <p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="<%asm_group_unsubscribe_raw_url%>" style="">Unsubscribe</a> - <a href="<%asm_preferences_raw_url%>" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>' +
    "                                      </tr>" +
    "                                    </tbody></table>" +
    "                                    <!--[if mso]>" +
    "                                  </td>" +
    "                                </tr>" +
    "                              </table>" +
    "                            </center>" +
    "                            <![endif]-->" +
    "                          </td>" +
    "                        </tr>" +
    "                      </tbody></table>" +
    "                    </td>" +
    "                  </tr>" +
    "                </tbody></table>" +
    "              </td>" +
    "            </tr>" +
    "          </tbody></table>" +
    "        </div>" +
    "      </center>" +
    "    " +
    "  " +
    "</body></html>";

  const msg = {
    to: email,
    from: "noreply@fooditory.com",
    subject: `Welcome to Fooditory ${name}!`,
    html: mailTemplate
  };

  sgMail.send(msg);
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "noreply@fooditory.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};
