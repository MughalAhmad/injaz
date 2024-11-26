let clientModel = [
  {
    id: "1",
    name: "abc1",
    phone: "12345678",
    status: "active",
  },
  {
    id: "2",
    name: "abc2",
    phone: "12345678",
    status: "active",
  },
];

module.exports = {
  status: async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { status } = req.query;

      const client = clientModel.find((client) => client.id === uid);
      if (!client) throw new Error("client update process failed");
      if (client) {
        client.status = status;
        console.log("Client updated:", client);
      }

      return res.status(200).json({
        hasError: false,
        msg: "Client Updated! ",
        data: { client: client },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { client: null },
      });
    }
  },
  edit: async (req, res, next) => {
    try {
      const { cid } = req.params;

      const client = clientModel.find((client) => client.id === uid);
      if (client) {
        Object.assign(client, req.body);
        console.log("Client updated:", client);
      }
      if (!client) throw new Error("client update process failed");

      return res.status(200).json({
        hasError: false,
        msg: "Client Updated! ",
        data: { client: client },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { client: null },
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { cid } = req.params;
      const client = clientModel.find((client) => client.id === uid);
      if (!client) throw new Error("Client not found");
      if (client) {
        clientModel = clientModel.filter((client) => client.id !== uid);
      }
      return res.status(200).json({
        hasError: false,
        msg: "Client Deleted!",
        data: clientModel,
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: null,
      });
    }
  },
  getClient: async (req, res, next) => {
    try {
      const { cid } = req.params;
      const client = clientModel.find((client) => client.id === uid);
      if (!client) throw new Error("Client Not Found");

      return res.status(200).json({
        hasError: false,
        msg: "Client Successfully Finded",
        data: { client: client },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { client: null },
      });
    }
  },
  new: async (req, res, next) => {
    try {
      const addClient = await clientModel.push(req.body);
      if (!addClient) throw new Error("Error in Creating client");

      return res.status(200).json({
        hasError: false,
        msg: "Client Created!",
        data: { client: clientModel },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { client: null },
      });
    }
  },
  getClientList: async (req, res, next) => {
    try {
      console.log(clientModel);
      if (clientModel.length === 0) throw new Error("Clients not found");

      return res.status(200).json({
        hasError: false,
        msg: "All Clients Successfully Finded",
        data: { client: clientModel ? clientModel : [] },
      });
    } catch (error) {
      return res.status(200).json({
        hasError: true,
        msg: error.message,
        data: { client: null },
      });
    }
  },
};
