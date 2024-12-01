const pdfModel = require("../models/pdfModel");

  module.exports = {
    createPdf: async (req, res, next) => {
      try {
         const pdf = await pdfModel.create(req.body)
        if (!pdf) throw new Error("Error in Creating pdf");
        console.log(pdf)
  
        return res.status(200).json({
          hasError: false,
          msg: "Pdf Created!",
          data: { pdf: pdf},
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { pdf: null },
        });
      }
    },
    getAllPdf: async (req, res, next) => {
      try {
        const {company} = req.query;
         const pdf = await pdfModel.find({selectCompany:company})
        if (!pdf) throw new Error("Error to find pdf");
        console.log(pdf)
  
        return res.status(200).json({
          hasError: false,
          msg: "get pdf succeeded!",
          data: { pdf: pdf},
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { pdf: null },
        });
      }
    }
  };
  