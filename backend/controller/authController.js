const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const {sendMail} = require("../integrations/sendMail");
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
        console.log(req.body)
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

      let message = {
        from: process.env.MAIL_EMAIL_CONQUEROR,
        to: user.email,
        subject: 'Forgot Code',
        html:  `
        <div style="text-align: center">
          <p>6 Digit Code for Forgot the password</p>
          </br>
          <p>Code: ${code} </p>
        </div>
      `, 
      };

      const { error } =  await sendMail(message);

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