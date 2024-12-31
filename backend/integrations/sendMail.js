const nodemailer = require("nodemailer");

module.exports = {
  sendMail: async (emailData, companyName) => {
    try {
      let config = {
        service: "gmail",
        auth: {
          user: companyName === "Conqueror" ? process.env.MAIL_EMAIL_CONQUEROR : process.env.MAIL_EMAIL_INJAZ ,
          pass: companyName === "Conqueror" ? process.env.CONQUEROR_PASSWORD : process.env.INJAZ_PASSWORD,
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
