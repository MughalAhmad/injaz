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
          data: { pdfs: pdf},
        });
      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { pdf: null },
        });
      }
    },
    dashboardData: async (req, res, next) => {
      try {
            const {currentPage, filter, company,role, userId} = req.query; 
            const searchQuery = '';
            const page = currentPage || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const filterBy = "";
      
            const options = [
              { $skip: skip }, // Pagination skip
              { $limit: limit },
            ];

            // Get the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JS
const currentDay = currentDate.getDate();

// Choose the filter condition (current date, month, or year)
let dateFilter = {}; // Default to no date filter
if (filterBy === "day") {
  dateFilter = {
    $expr: {
      $and: [
        { $eq: [{ $year: "$createdAt" }, currentYear] },
        { $eq: [{ $month: "$createdAt" }, currentMonth] },
        { $eq: [{ $dayOfMonth: "$createdAt" }, currentDay] },
      ],
    },
  };
} else if (filterBy === "month") {
  dateFilter = {
    $expr: {
      $and: [
        { $eq: [{ $year: "$createdAt" }, currentYear] },
        { $eq: [{ $month: "$createdAt" }, currentMonth] },
      ],
    },
  };
} else if (filterBy === "year") {
  dateFilter = {
    $expr: {
      $eq: [{ $year: "$createdAt" }, currentYear],
    },
  };
}

let matchOptions ='';

if(role === "admin"){
  matchOptions = {selectCompany:company}
}else{
  matchOptions = {selectCompany:company, userId:userId}

}

      
            const pdfs = await pdfModel.aggregate([
              {
                $match: {
                  ...matchOptions,
                  // userId: "6755a752e41100cfbdc8b290",
                  clientName: {
                    $regex: searchQuery,
                    $options: "i",
                  },
                  ...dateFilter, // Add the date filter dynamically
                },
              },
              {
                $facet: {
                  pdfs: options,
                  totalCount: [
                    { $count: "count" }, // Count the total number of documents matching the filter
                  ],
                },
              },
            ]);

            let statusCount={
              pending:0,
              approved:0,
              rejected:0, 
            }

            pdfs[0]?.pdfs.map((pdf)=>{
              if(pdf.pdfStatus === "pending"){
                statusCount.pending = statusCount.pending + 1
              }
              else if(pdf.pdfStatus === "approved"){
                statusCount.approved = statusCount.approved + 1
              }
             else {
              statusCount.rejected = statusCount.rejected + 1

              }

            })
            
            const pdfList = pdfs[0]?.pdfs || [];
            const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
            const pdfCount = Math.ceil(totalDocuments / limit);
      
            if (!pdfs) throw new Error("Pdfs not found");
      
            return res.status(200).json({
              hasError: false,
              msg: "All Pdfs Successfully Finded",
              data: { pdfs: pdfList, pages :pdfCount, cardData:statusCount },
            });
          } catch (error) {
            return res.status(200).json({
              hasError: true,
              msg: error.message,
              data: { pdfs: null },
            });
          }
    }
  };
  