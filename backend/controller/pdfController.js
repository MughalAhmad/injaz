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
        const {company, userId, role} = req.query;
        let pdf;
        if(role === 'admin'){
           pdf = await pdfModel.find({selectCompany:company})
        }else{
           pdf = await pdfModel.find({selectCompany:company, userId:userId})
        }
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
  