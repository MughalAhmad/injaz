  const ReferenceModel = require("../models/referenceModel")
  module.exports = {
    edit: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const findRef = await ReferenceModel.findOne({_id:rid})
        if (!findRef) throw new Error("Reference Not Found");
         
        const upadatedRef = await ReferenceModel.findByIdAndUpdate({ _id: rid }, req.body, { new: true });
        if (!upadatedRef) throw new Error('Reference update process failed');
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Updated! ",
          data: { ref: upadatedRef },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { ref: null },
        });
      }
    },
    delete: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const findRef = await ReferenceModel.findOne({_id:rid})
        if (!findRef) throw new Error("Reference Not Found");
         
        const upadatedRef = await ReferenceModel.findByIdAndDelete({ _id: rid }, req.body, { new: true });
        if (!upadatedRef) throw new Error('Reference update process failed');
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Deleted!",
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
    getReferences: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const findRef = await ReferenceModel.findOne({_id:rid})
        if (!findRef) throw new Error("Reference Not Found");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Successfully Finded",
          data: { ref: findRef },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { ref: null },
        });
      }
    },
    new: async (req, res, next) => {
      try {
         const findRef = await ReferenceModel.findOne({refCode:req.body.refCode});
         if (findRef) throw new Error("Reference code already exists");
        const ref = await ReferenceModel.create(req.body)
        if (!ref) throw new Error("Error in Creating reference");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Created!",
          data: { ref: ref },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { ref: null },
        });
      }
    },
    getReferenceList: async (req, res, next) => {
      try {
         
        const refs = await ReferenceModel.find();
        if (!refs) throw new Error("References not found");
  
        return res.status(200).json({
          hasError: false,
          msg: "All References Successfully Finded",
          data: { refs: refs },
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { refs: null },
        });
      }
    },
  };
  