const nodemailer = require("nodemailer");


module.exports = {
  teamMail: async (req, res, next) => {
    try {

        let config ={
            service:'gmail',
            auth:{
                user:process.env.MAIL_EMAIL_CONQUEROR,
                pass:process.env.MAIL_PASSWORD,
            }
        }



        const transporter = nodemailer.createTransport(config); 

          let message = {
            from: process.env.MAIL_EMAIL_CONQUEROR,
            to: "ahmadkhurshed311@gmail.com", // list of receivers
            cc: "ahmadkhurshed.1049@gmail.com", // list of receivers
            subject: 'New User Created',
            // text: "Game Changing teamMail", // plain text body
            html:  `
            <div style="text-align: center">
            <div style="background-color: #151718; width:98vw; height:100px; display: flex; justify-content: center;align-items: center;">
            <img src="${baseUrl}/logoWithName.svg" alt="Force Edge"/>
            </div>

              <p>Your email has been successfully created. Here are the credentials for login.</p>
              </br>
              <p>Email: ${email} </p>
              <p>Password: ${PasswordCopy} </p>

              <a href="${baseUrl}/login" style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: silver;
                background-color: #151718;
                text-decoration: none;
                border-radius: 25px;
              ">LOGIN</a>
            </div>
          `, // html body
          };

        const data =  await transporter.sendMail(message).then((resp)=>{

              console.log("Message sent: %s", resp);
              return resp;
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
