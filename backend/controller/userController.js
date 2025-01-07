const UserModel = require("../models/userModel"); 
const PdfModel = require("../models/pdfModel"); 
const {supportSendMail} = require("../integrations/sendMail");

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
      let Curl ="http://localhost:5000/conqueror/" ;

      let message = {
        from: process.env.SUPPORT_EMAIL,
        to: upadatedUser.email,
        subject: 'User Info Updated',
        attachments: [
          {
            filename: 'page3Logo.png',
            path: Curl+'page3Logo.png',
            cid: 'C_page3Logo' // same CID as referenced in the email
        }
          ],
          html:  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="cid:C_page3Logo" alt="Conqueror Logo" style="max-width: 150px;">
    </div>
  
    <h3 style="font-size: 20px; color: #C40014; margin-bottom: 10px;">Use this credential for sign-in to our web application</h3>
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${findUser.firstName} ${findUser.lastName},</p>
    <p style="font-size: 14px; color: #555; line-height: 1.5;">We are providing you with the website email and password that you can use to sign in to our web application. Please do not share this information with anyone.</p>
    <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; font-size: 18px; color:white">Email:${req.body.email}</p>
      <p style="margin: 0; font-size: 18px;">Password:${req.body.password}</p>
  
    </div>
  
    <p style="font-size: 14px; color: #333;">Best regards,<br>Conqueror Aspiration L.L.C Support Team</p>
  
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
      <div>
                   <a href="https://www.facebook.com/conquerorllc?mibextid=LQQJ4d&mibextid=LQQJ4d" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                  <a href="https://www.instagram.com/uaeconqueror?igsh=a2xpMnZnOGRpcWw=" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                  <a href="https://api.whatsapp.com/send/?phone=%2B97142837636&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
                  </div>
    </div>
  
    <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Company.</p>
   <p style="font-size: 12px; color: #999; text-align: center;">
                  Conqueror Aspiration L.L.C<br>
                  City Pharmacy Bid, Port Saeed, Dubai
                </p>
                </div>
  </div>`, 
      };

      const { error } =  await supportSendMail(message);

      if (error) throw new Error('User Email Send Process Failed!');


      return res.status(200).json({
        hasError: false,
        msg: "User Updated! ",
        data: { user: upadatedUser },
      });
    } catch (error) {
      next(error);
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
      next(error);
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
      next(error);
    }
  },
  new: async (req, res, next) => {
    try {
      const findUser = await UserModel.findOne({ email: req.body.email });
      if (findUser) throw new Error("User already exists");
      const user = await UserModel.create(req.body);
      if (!user) throw new Error("Error in Creating user");

      let Curl ="http://localhost:5000/conqueror/" ;

      let message = {
        from: process.env.SUPPORT_EMAIL,
        to: user.email,
        subject: 'User Info Updated',
        attachments: [
        {
          filename: 'page3Logo.png',
          path: Curl+'page3Logo.png',
          cid: 'C_page3Logo' // same CID as referenced in the email
      }
        ],
        html:  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="cid:C_page3Logo" alt="Conqueror Logo" style="max-width: 150px;">
    </div>
  
    <h3 style="font-size: 20px; color: #C40014; margin-bottom: 10px;">Use this credential for sign-in to our web application</h3>
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${user.firstName} ${user.lastName},</p>
    <p style="font-size: 14px; color: #555; line-height: 1.5;">We are providing you with the website email and password that you can use to sign in to our web application. Please do not share this information with anyone.</p>
    <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; font-size: 18px; color:white">Email:${req.body.email}</p>
      <p style="margin: 0; font-size: 18px;">Password:${req.body.password}</p>
  
    </div>
  
    <p style="font-size: 14px; color: #333;">Best regards,<br>Conqueror Aspiration L.L.C Support Team</p>
  
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
      <div>
                   <a href="https://www.facebook.com/conquerorllc?mibextid=LQQJ4d&mibextid=LQQJ4d" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                  <a href="https://www.instagram.com/uaeconqueror?igsh=a2xpMnZnOGRpcWw=" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                  <a href="https://api.whatsapp.com/send/?phone=%2B97142837636&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
                  </div>
    </div>
  
    <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Company.</p>
   <p style="font-size: 12px; color: #999; text-align: center;">
                  Conqueror Aspiration L.L.C<br>
                  City Pharmacy Bid, Port Saeed, Dubai
                </p>
                </div>
  </div>`, 
      };

      const { error } =  await supportSendMail(message);

      if (error) throw new Error('User Email Send Process Failed!');


      return res.status(200).json({
        hasError: false,
        msg: "User Created!",
        data: { user: user },
      });
    } catch (error) {
      next(error);
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
      next(error);
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
      next(error);
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
      next(error);
    }
  },
  sendEmailAndPassword: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ _id: uid });
      if (!findUser) throw new Error("User Not Found");

      let Curl ="http://localhost:5000/conqueror/" ;

      let message = {
        from: process.env.SUPPORT_EMAIL,
        to: findUser.email,
        subject: 'User Info Updated',
        attachments: [
          {
            filename: 'page3Logo.png',
            path: Curl+'page3Logo.png',
            cid: 'C_page3Logo' // same CID as referenced in the email
        }
          ],
          html:  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="cid:C_page3Logo" alt="Conqueror Logo" style="max-width: 150px;">
    </div>
  
    <h3 style="font-size: 20px; color: #C40014; margin-bottom: 10px;">Use this credential for sign-in to our web application</h3>
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${findUser.firstName} ${findUser.lastName},</p>
    <p style="font-size: 14px; color: #555; line-height: 1.5;">We are providing you with the website email and password that you can use to sign in to our web application. Please do not share this information with anyone.</p>
    <div style="text-align: center; background: #0A144E; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; font-size: 18px; color:white">Email:${findUser.email}</p>
      <p style="margin: 0; font-size: 18px;">Password:${findUser.password}</p>
  
    </div>
  
    <p style="font-size: 14px; color: #333;">Best regards,<br>Conqueror Aspiration L.L.C Support Team</p>
  
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
      <div>
                   <a href="https://www.facebook.com/conquerorllc?mibextid=LQQJ4d&mibextid=LQQJ4d" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                  <a href="https://www.instagram.com/uaeconqueror?igsh=a2xpMnZnOGRpcWw=" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                  <a href="https://api.whatsapp.com/send/?phone=%2B97142837636&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
                  </div>
    </div>
  
    <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’re an esteemed member of the Company.</p>
   <p style="font-size: 12px; color: #999; text-align: center;">
                  Conqueror Aspiration L.L.C<br>
                  City Pharmacy Bid, Port Saeed, Dubai
                </p>
                </div>
  </div>`,  
      };

      const { error } =  await supportSendMail(message);

      if (error) throw new Error('User Email Send Process Failed!');


      return res.status(200).json({
        hasError: false,
        msg: "Mail Sended! ",
        data: { mail: findUser },
      });
    } catch (error) {
      next(error);
    }
  },
};
