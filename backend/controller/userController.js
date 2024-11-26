let userModel = [
  {
    id: "1",
    name: "abc1",
    phone: "12345678",
  },
  {
    id: "2",
    name: "abc2",
    phone: "12345678",
  },
];

module.exports = {
  edit: async (req, res, next) => {
    try {
      const { uid } = req.params;

      const user = userModel.find((user) => user.id === uid);
      if (user) {
        Object.assign(user, req.body);
        console.log("User updated:", user);
      }
      if (!user) throw new Error("user update process failed");

      return res.status(200).json({
        hasError: false,
        msg: "User Updated! ",
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
  delete: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const user = userModel.find((user) => user.id === uid);
      if (!user) throw new Error("User not found");
      if (user) {
        userModel = userModel.filter((user) => user.id !== uid);
      }
      return res.status(200).json({
        hasError: false,
        msg: "User Deleted!",
        data: userModel,
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
      const user = userModel.find((user) => user.id === uid);
      if (!user) throw new Error("User Not Found");

      return res.status(200).json({
        hasError: false,
        msg: "User Successfully Finded",
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
  new: async (req, res, next) => {
    try {
      const user = userModel.find((user) => user.name === req.body.name);
      if (user) throw new Error("User already exists");

      const addUser = await userModel.push(req.body);
      if (!addUser) throw new Error("Error in Creating user");

      return res.status(200).json({
        hasError: false,
        msg: "User Created!",
        data: { user: userModel },
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
        console.log(userModel)
      if (userModel.length === 0) throw new Error("Users not found");

      return res.status(200).json({
        hasError: false,
        msg: "All Users Successfully Finded",
        data: { users: userModel ? userModel : [] },
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
