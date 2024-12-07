let referenceModel = [
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
        const { rid } = req.params;
  
        const reference = userModel.find((reference) => reference.id === rid);
        if (reference) {
          Object.assign(reference, req.body);
          console.log("reference updated:", reference);
        }
        if (!reference) throw new Error("reference update process failed");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Updated! ",
          data: { reference: reference },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { reference: null },
        });
      }
    },
    delete: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const reference = referenceModel.find((reference) => reference.id === rid);
        if (!reference) throw new Error("Reference not found");
        if (reference) {
            referenceModel = referenceModel.filter((reference) => reference.id !== rid);
        }
        return res.status(200).json({
          hasError: false,
          msg: "Reference Deleted!",
          data: referenceModel,
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: null,
        });
      }
    },
    getReferences: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const reference = referenceModel.find((reference) => reference.id === rid);
        if (!reference) throw new Error("Reference Not Found");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Successfully Finded",
          data: { reference: reference },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { reference: null },
        });
      }
    },
    new: async (req, res, next) => {
      try {
        const reference = referenceModel.find((reference) => reference.name === req.body.name);
        if (reference) throw new Error("Reference already exists");
  
        const addReference = await referenceModel.push(req.body);
        if (!addReference) throw new Error("Error in Creating user");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Created!",
          data: { reference: referenceModel },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { reference: null },
        });
      }
    },
    getReferenceList: async (req, res, next) => {
      try {
          console.log(referenceModel)
        if (referenceModel.length === 0) throw new Error("Rferences not found");
  
        return res.status(200).json({
          hasError: false,
          msg: "All References Successfully Finded",
          data: { reference: referenceModel ? referenceModel : [] },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { reference: null },
        });
      }
    },
  };
  