const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const {forgotSendMail} = require("../integrations/sendMail");
const { use } = require("../routes/authRoute");

module.exports = {
  initialFetch: async (req, res) => {
    const user = req.user || {};
    const token = req.token || req.session.token || null;
    const isAuthenticated = user && !user.isBlock && token ? true : false;
    return res.status(200).json({
        hasError: false,
        msg: "",
        data: { user, token, isAuthenticated }
    });
},
  login: async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) throw new Error("Invalid emial or password");
        if (user.password !== password) throw new Error("Invalid email or password");
        const { err, token } = await generateAuthToken(user);
        if (err) throw new Error(err);
        return res.status(200).json({
            hasError: false,
            msg: "Login successful",
            data: {
                user,
                token,
                isAuthenticated: true,
            },
        });

    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: null,
      });
    }
},
  logout: async (req, res, next) => {
    try {
      return res.status(200).json({
        hasError: false,
        msg: "Logout successful",
        data: { isAuthenticatd: false },
      });
    } catch (error) {
      next(error);
    }
  },
  forgot: async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) throw new Error("Invalid emial");
       let code = (Date.now() % 1000000).toString().padStart(6, '0');
       user.sixDigitCode = code;

      const upadatedUser = await userModel.findByIdAndUpdate(
        { _id: user._id },
        user,
        { new: true }
      );
      if (!upadatedUser) throw new Error("Failed to Code process");
      let Curl ="http://localhost:5000/conqueror/" ;

      let message = {
        from: process.env.MAIL_EMAIL,
        to: user.email,
        subject: 'Forgot Code',
        attachments: [
        {
          filename: 'page3Logo.png',
          path: Curl+'page3Logo.png',
          cid: 'C_page3Logo' // same CID as referenced in the email
      },
        ], 
        html: 
        
                `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="cid:C_page3Logo" alt="Injaz Group Logo" style="max-width: 150px;">
    </div>

    <h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Use this code to reset your password</h3>
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${user.firstName} ${user.lastName},</p>
    <p style="font-size: 14px; color: #555; line-height: 1.5;">We have received a request to reset your account password. To complete the process, please use the following One-Time Password (OTP) to proceed:</p>
    <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; font-size: 18px;">Your OTP:</p>
      <p style="font-size: 36px; font-weight: bold; margin: 10px 0;">${code}</p>
   </div>
    <p style="font-size: 12px; color: #777; text-align: center;">This code is valid for the next 15 minutes.</p>

    <p style="font-size: 14px; color: #555; margin: 20px 0;">If you didn’t request a password reset, you can ignore this email. Your password will remain the same.</p>
    <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Support Team</p>

    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
       <div>
        <a href="#" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
        <a href="#" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
        <a href="#" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
        </div>
    </div>

    <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Injaz Group.</p>
    <p style="font-size: 12px; color: #999; text-align: center;">Injaz Group Fzc<br>City Pharmacy Bid, Port Saeed, Dubai</p>
  </div>
</div>`,
      };

      const { error } =  await forgotSendMail(message);

      if (error) throw new Error('Forgot Email Send Process Failed!');

        return res.status(200).json({
            hasError: false,
            msg: "Forgot successful",
            data: null,
        });

    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: null,
      });
    }
},
checkCode: async (req, res, next) => {
  try {
      const { email, code } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) throw new Error("Invalid emial or password");
      if(user.sixDigitCode !== parseInt(code) ) throw new Error("Code Invalid");

      return res.status(200).json({
          hasError: false,
          msg: "Code Verified",
          data:null,
      });

  } catch (error) {
    return res.status(200).json({
      hasError: true,
      msg: error.message,
      data: null,
    });
  }
},
newPassword: async (req, res, next) => {
  try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) throw new Error("Invalid emial");
    user.password = password;

    const upadatedUser = await userModel.findByIdAndUpdate(
      { _id: user._id },
      user,
      { new: true }
    );
    if (!upadatedUser) throw new Error("Failed to Code process");

      return res.status(200).json({
          hasError: false,
          msg: "Password successfully changed",
          data: null,
      });

  } catch (error) {
    return res.status(200).json({
      hasError: true,
      msg: error.message,
      data: null,
    });
  }
},
};



async function generateAuthToken(user) {
  try {
      const token = jwt.sign(
          { userId: user._id.toString(), email: user.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
      );
      if (!token) throw new Error('Error in creating auth token');

      return { err: null, token: token }

  } catch (error) {
      return { err: error, token: null }
  }
}