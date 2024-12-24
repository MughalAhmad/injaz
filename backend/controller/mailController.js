const nodemailer = require("nodemailer");
const  {sendMail} = require("../integrations/sendMail")

module.exports = {
  teamMail: async (req, res, next) => {
    try {

          let message = {
            from: process.env.MAIL_EMAIL_CONQUEROR,
            to: "ahmadkhurshed311@gmail.com", // list of receivers
            cc: "ahmadkhurshed.1049@gmail.com", // list of receivers
            subject: 'User Info',
            html:  `
            <div style="text-align: center">

              <p>Your email has been successfully created. Here are the credentials for login.</p>
              </br>
              <p>Email: Test </p>
              <p>Password: Test </p>

            </div>
          `, // html body
          };

          const data =  await sendMail(message);
    
      return res.status(200).json({
        hasError: false,
        msg: "User Updated! ",
        data: { user: data },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { user: null },
      });
    }
  },
  googleMail: async (req, res, next) => {
    try {

        let config ={
            service:'gmail',
            auth:{
                user:'ahmadkhurshed311@gmail.com',
                pass:'ldthatgovpfaqpnk',
            }
        }



        const transporter = nodemailer.createTransport(config); 

          let message = {
            from: 'ahmadkhurshed311@gmail.com', // sender address
            to: "hafizbrothers2015@gmail.com", // list of receivers
            cc: "ahmadkhurshed.1049@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Game Changing", // plain text body
            html: "<b>Game Changing</b>", // html body
          };

        const data =  await transporter.sendMail(message).then((resp)=>{

              console.log("Message sent: %s", resp);
          })
        


    
      return res.status(200).json({
        hasError: false,
        msg: "User Updated! ",
        data: { user: data },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { user: null },
      });
    }
  },
 
};
