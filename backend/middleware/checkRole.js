const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const userRole = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new Error('User Token Not found in Browser Cookies.');
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const decodeToken = jwt.decode(token);
        if (!verifyToken) throw new Error("Token Expired!");

        const userData = await userModel.findById(verifyToken.userId);
        if (!userData) throw new Error("User Not found in Database!");

      if(userData.role === 'admin'){
        next();
      }
      else{
        throw new Error("User is not Authenticated");
      }

    } catch (err) {
        console.log('auth middleware error:', 'Unauthorized Access: User is not Authenticated');
        next({ ...err, statusCode: 401, message: 'Unauthorized Access: User is not Authenticated' });
    }
}

module.exports = userRole;
