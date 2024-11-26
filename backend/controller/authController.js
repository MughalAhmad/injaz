const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = [
  {
    email: "user@gmail.com",
    password: "user123",
  },
  {
    email: "admin@gmail.com",
    password: "admin123",
  },
];

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = userModel.find((user) => user.email === email);
      if (!user) throw new Error("Invalid emaill or password");
      if (password !== user.password)
        throw new Error("Invalid email or password");
      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.JWT_SECRET_KEY, // Secret key for JWT signing
        {
          expiresIn: "1d", // Token expiration
        }
      );
      if (!token) throw new Error("Error in creating auth token");

      return res.status(200).json({
        hasError: false,
        msg: `Welcome ${email}`,
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
        data: { isAuthenticated: false },
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
};
