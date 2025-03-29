const mailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "pcktbuddy@gmail.com",
      pass: "jjeq ugev ztin yxqg",
    },
  });

  const mailOptions = {
    from: "pcktbuddy@gmail.com",
    to: to,
    subject: subject,
    html: text,
  };

  const mailresponse = await transporter.sendMail(mailOptions);
  console.log(mailresponse);
  return mailresponse;
};

module.exports = {
  sendingMail,
};
