const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// const userModel = [
//   {
//     email: "user@gmail.com",
//     password: "user123",
//   },
//   {
//     email: "admin@gmail.com",
//     password: "admin123",
//   },
// ];

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
  // login: async (req, res, next) => {
  //   try {
  //     const { email, password } = req.body;
  //     console.log(email, password )
  //     const user = userModel.find((user) => user.email === email);
  //     if (!user) throw new Error("Invalid emaill or password");
  //     if (password !== user.password)
  //       throw new Error("Invalid email or password");
  //     const token = jwt.sign(
  //       {
  //         email: user.email,
  //       },
  //       process.env.JWT_SECRET_KEY, // Secret key for JWT signing
  //       {
  //         expiresIn: "1d", // Token expiration
  //       }
  //     );
  //     if (!token) throw new Error("Error in creating auth token");

  //     return res.status(200).json({
  //       hasError: false,
  //       msg: `Welcome ${email}`,
  //       data: {
  //         user,
  //         token,
  //         isAuthenticated: true,
  //       },
  //     });
  //   } catch (error) {
  //     return res.status(200).json({
  //       hasError: true,
  //       msg: error.message,
  //       data: { isAuthenticated: false },
  //     });
  //   }
  // },
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
            data: {
                user,
                token,
                isAuthenticated: true,
            },
        });

    } catch (error) {
        next(error);
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