const nodemailer = require("nodemailer");

module.exports = {
  sendMail: async (emailData) => {
    try {
      let config = {
        service: "gmail",
        auth: {
          user: process.env.MAIL_EMAIL_CONQUEROR,
          pass: process.env.MAIL_PASSWORD,
        },
      };

      const transporter = nodemailer.createTransport(config);

      const data = await transporter
        .sendMail(emailData);
        return {error: null};
    } catch (error) {
        return {error: error};
    }
  },
};
