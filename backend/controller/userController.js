const UserModel = require("../models/userModel"); 
module.exports = {
  edit: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const findUser = await UserModel.findOne({ _id: uid });
      if (!findUser) throw new Error("User Not Found");

      const upadatedUser = await UserModel.findByIdAndUpdate(
        { _id: uid },
        req.body,
        { new: true }
      );
      if (!upadatedUser) throw new Error("User update process failed");

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

      return res.status(200).json({
        hasError: false,
        msg: "User Deleted!",
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
        data: { users: userList, pages :userCount },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { users: null },
      });
    }
  },
};
