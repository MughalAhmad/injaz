const UserModel = require("../models/userModel"); 
const PdfModel = require("../models/pdfModel"); 
const {sendMail} = require("../integrations/sendMail");

module.exports = {
  edit: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ _id: uid });
      if (!findUser) throw new Error("User not found");

      const upadatedUser = await UserModel.findByIdAndUpdate(
        { _id: uid },
        req.body,
        { new: true }
      );
      if (!upadatedUser) throw new Error("User update process failed");

      let message = {
        from: process.env.MAIL_EMAIL_CONQUEROR,
        to: upadatedUser.email,
        subject: 'User Info Updated',
        html:  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
<div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="cid:injaz.png" alt="Injaz Group Logo" style="max-width: 150px;">
  </div>

  <h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Use this credential for sign-in to our web application</h3>
  <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${findUser.firstName} ${findUser.lastName},</p>
  <p style="font-size: 14px; color: #555; line-height: 1.5;">We are providing you with the website email and password that you can use to sign in to our web application. Please do not share this information with anyone.</p>
  <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0; font-size: 18px; color:white">Email:${findUser.email}</p>
    <p style="margin: 0; font-size: 18px;">Password:${findUser.password}</p>

  </div>


  <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Support Team</p>

  <div style="text-align: center; margin: 30px 0;">
    <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
    <div>
      <a href="https://facebook.com" style="margin: 0 5px;"><img src="https://facebook.com" alt="Facebook"></a>
      <a href="https://instagram.com" style="margin: 0 5px;"><img src="https://instagram.com" alt="Instagram"></a>
      <a href="https://linkedin.com" style="margin: 0 5px;"><img src="https://linkedin.com" alt="LinkedIn"></a>
      <a href="https://youtube.com" style="margin: 0 5px;"><img src="https://youtube.com" alt="YouTube"></a>
      <a href="https://telegram.com" style="margin: 0 5px;"><img src="https://telegram.com" alt="Telegram"></a>
      <a href="https://whatsapp.com" style="margin: 0 5px;"><img src="https://whatsapp.com" alt="WhatsApp"></a>
    </div>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Injaz Group.</p>
  <p style="font-size: 12px; color: #999; text-align: center;">Injaz Group Fzc<br>City Pharmacy Bid, Port Saeed, Dubai</p>
</div>
</div>`, 
      };

      const { error } =  await sendMail(message);

      if (error) throw new Error('User Email Send Process Failed!');


      return res.status(200).json({
        hasError: false,
        msg: "User Updated! ",
        data: { user: upadatedUser },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { user: null },
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ _id: uid });
      if (!findUser) throw new Error("User Not Found");

      const upadatedUser = await UserModel.findByIdAndDelete(
        { _id: uid },
        req.body,
        { new: true }
      );
      if (!upadatedUser) throw new Error("User update process failed");

          const users = await UserModel.find();
      

      return res.status(200).json({
        hasError: false,
        msg: "User Deleted!",
        data: users,
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: null,
      });
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ userId: uid });
      if (!findUser) throw new Error("User Not Found");

      return res.status(200).json({
        hasError: false,
        msg: "User Successfully Finded",
        data: { user: findUser },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { user: null },
      });
    }
  },
  new: async (req, res, next) => {
    try {
      const findUser = await UserModel.findOne({ email: req.body.email });
      if (findUser) throw new Error("User already exists");
      const user = await UserModel.create(req.body);
      if (!user) throw new Error("Error in Creating user");

      let message = {
        from: process.env.MAIL_EMAIL_CONQUEROR,
        to: user.email,
        subject: 'User Info Updated',
        html:  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
<div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="cid:injaz.png" alt="Injaz Group Logo" style="max-width: 150px;">
  </div>

  <h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Use this credential for sign-in to our web application</h3>
  <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${findUser.firstName} ${findUser.lastName},</p>
  <p style="font-size: 14px; color: #555; line-height: 1.5;">We are providing you with the website email and password that you can use to sign in to our web application. Please do not share this information with anyone.</p>
  <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0; font-size: 18px; color:white">Email:${findUser.email}</p>
    <p style="margin: 0; font-size: 18px;">Password:${findUser.password}</p>

  </div>

  <div style="text-align: center; margin: 20px 0;">
    <p style="font-size: 14px; color: #333;">Or click on the button below for Signin</p>
    <a href="https://quotation.injazgroup.co.uk/" style="text-decoration: none;">
      <button style="background: #0A144E; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">Login</button>
    </a>
  </div>

  <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Support Team</p>

  <div style="text-align: center; margin: 30px 0;">
    <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
    <div>
      <a href="https://facebook.com" style="margin: 0 5px;"><img src="https://facebook.com" alt="Facebook"></a>
      <a href="https://instagram.com" style="margin: 0 5px;"><img src="https://instagram.com" alt="Instagram"></a>
      <a href="https://linkedin.com" style="margin: 0 5px;"><img src="https://linkedin.com" alt="LinkedIn"></a>
      <a href="https://youtube.com" style="margin: 0 5px;"><img src="https://youtube.com" alt="YouTube"></a>
      <a href="https://telegram.com" style="margin: 0 5px;"><img src="https://telegram.com" alt="Telegram"></a>
      <a href="https://whatsapp.com" style="margin: 0 5px;"><img src="https://whatsapp.com" alt="WhatsApp"></a>
    </div>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Injaz Group.</p>
  <p style="font-size: 12px; color: #999; text-align: center;">Injaz Group Fzc<br>City Pharmacy Bid, Port Saeed, Dubai</p>
</div>
</div>`, 
      };

      const { error } =  await sendMail(message);

      if (error) throw new Error('User Email Send Process Failed!');


      return res.status(200).json({
        hasError: false,
        msg: "User Created!",
        data: { user: user },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { user: null },
      });
    }
  },
  getUserList: async (req, res, next) => {
    try {
      const {currentPage, filter, sortValue} = req.query; 
      const searchQuery = filter;
      const sortOrder = Number(sortValue) ;
      const page = currentPage || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const options = [
        { $skip: skip }, // Pagination skip
        { $limit: limit },
      ];

      if(sortOrder){
        options.unshift({ $sort: { firstName: sortOrder } })
      }

      const users = await UserModel.aggregate([
        {
          $match: {
            role: "user",
            firstName: {
              $regex: searchQuery,
              $options: "i",
            },
          },
        },
        {
          $facet: {
            users: options,
            totalCount: [
              { $count: "count" }, // Count the total number of documents matching the filter
            ],
          },
        },
      ]);
      
      const userList = users[0]?.users || [];
      const totalDocuments = users[0]?.totalCount[0]?.count || 0;
      const userCount = Math.ceil(totalDocuments / limit);

      if (!users) throw new Error("Users not found");

      return res.status(200).json({
        hasError: false,
        msg: "All Users Successfully Finded",
        data: { users: userList, pages :userCount,  total:totalDocuments },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { users: null },
      });
    }
  },
  getAllUsersNameAndId: async (req, res, next) => {
    try {
     
      const users = await UserModel.aggregate([
        {
          $match: {role: "user"},
        },
        {
          $project:{
            firstName:1,
            lastName:1,
            _id:1
          }
        }
      ]);
      
      const userList = users || [];    
      if (!users) throw new Error("Users not found");

      return res.status(200).json({
        hasError: false,
        msg: "All Users Successfully Finded",
        data: { users: userList },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { users: null },
      });
    }
  },
  assignToUser: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ _id: uid });
      if (!findUser) throw new Error("User Not Found");

      req.body.userId=uid;
      req.body.notify="true";

      const upadatedPdf = await PdfModel.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      if (!upadatedPdf) throw new Error("Pdf update process failed");

      return res.status(200).json({
        hasError: false,
        msg: "Pdf Updated! ",
        data: { user: upadatedPdf },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { user: null },
      });
    }
  },
  sendEmailAndPassword: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ _id: uid });
      if (!findUser) throw new Error("User Not Found");


      let message = {
        from: process.env.MAIL_EMAIL_CONQUEROR,
        to: findUser.email,
        subject: 'User Info Updated',
        html: 
        
        
//         `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
//   <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
//     <div style="text-align: center; margin-bottom: 20px;">
//       <img src="${baseUrl}/public/images/injaz.png" alt="Injaz Group Logo" style="max-width: 150px;">
//     </div>

//     <h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Use this code to reset your password</h3>
//     <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear [User Name],</p>
//     <p style="font-size: 14px; color: #555; line-height: 1.5;">We have received a request to reset your account password. To complete the process, please use the following One-Time Password (OTP) to proceed:</p>
//     <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
//       <p style="margin: 0; font-size: 18px;">Your OTP:</p>
//       <p style="font-size: 36px; font-weight: bold; margin: 10px 0;">123456</p>
//       <button style="background: #ffffff; color: #0A144E; border: 1px solid #ffffff; padding: 10px 20px; font-size: 14px; cursor: pointer; border-radius: 5px;">Copy Code</button>
//     </div>
//     <p style="font-size: 12px; color: #777; text-align: center;">This code is valid for the next 15 minutes.</p>

//     <div style="text-align: center; margin: 20px 0;">
//       <p style="font-size: 14px; color: #333;">Or click on the button below to reset your password</p>
//       <a href="#" style="text-decoration: none;">
//         <button style="background: #0A144E; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">Reset Password</button>
//       </a>
//     </div>

//     <p style="font-size: 14px; color: #555; margin: 20px 0;">If you didn’t request a password reset, you can ignore this email. Your password will remain the same.</p>
//     <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Support Team</p>

//     <div style="text-align: center; margin: 30px 0;">
//       <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
//       <div>
//         <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Facebook"></a>
//         <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Instagram"></a>
//         <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="LinkedIn"></a>
//         <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="YouTube"></a>
//         <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Telegram"></a>
//         <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="WhatsApp"></a>
//       </div>
//     </div>

//     <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Injaz Group.</p>
//     <p style="font-size: 12px; color: #999; text-align: center;">Injaz Group Fzc<br>City Pharmacy Bid, Port Saeed, Dubai</p>
//   </div>
// </div>`
        
        


`<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
<div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="cid:injaz.png" alt="Injaz Group Logo" style="max-width: 150px;">
  </div>

  <h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Use this credential for sign-in to our web application</h3>
  <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${findUser.firstName} ${findUser.lastName},</p>
  <p style="font-size: 14px; color: #555; line-height: 1.5;">We are providing you with the website email and password that you can use to sign in to our web application. Please do not share this information with anyone.</p>
  <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0; font-size: 18px; color:white">Email:${findUser.email}</p>
    <p style="margin: 0; font-size: 18px;">Password:${findUser.password}</p>

  </div>

  <div style="text-align: center; margin: 20px 0;">
    <p style="font-size: 14px; color: #333;">Or click on the button below for Signin</p>
    <a href="https://quotation.injazgroup.co.uk/" style="text-decoration: none;">
      <button style="background: #0A144E; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">Login</button>
    </a>
  </div>

  <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Support Team</p>

  <div style="text-align: center; margin: 30px 0;">
    <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
    <div>
      <a href="https://facebook.com" style="margin: 0 5px;"><img src="https://facebook.com" alt="Facebook"></a>
      <a href="https://instagram.com" style="margin: 0 5px;"><img src="https://instagram.com" alt="Instagram"></a>
      <a href="https://linkedin.com" style="margin: 0 5px;"><img src="https://linkedin.com" alt="LinkedIn"></a>
      <a href="https://youtube.com" style="margin: 0 5px;"><img src="https://youtube.com" alt="YouTube"></a>
      <a href="https://telegram.com" style="margin: 0 5px;"><img src="https://telegram.com" alt="Telegram"></a>
      <a href="https://whatsapp.com" style="margin: 0 5px;"><img src="https://whatsapp.com" alt="WhatsApp"></a>
    </div>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Injaz Group.</p>
  <p style="font-size: 12px; color: #999; text-align: center;">Injaz Group Fzc<br>City Pharmacy Bid, Port Saeed, Dubai</p>
</div>
</div>`
              , 
      };

      const { error } =  await sendMail(message);

      if (error) throw new Error('User Email Send Process Failed!');


      return res.status(200).json({
        hasError: false,
        msg: "Mail Sended! ",
        data: { mail: findUser },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { mail: null },
      });
    }
  },
};
