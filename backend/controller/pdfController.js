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
        const {currentPage, company,role, userId} = req.query; 
        const page = currentPage || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
  
        const options = [
          { $skip: skip }, // Pagination skip
          { $limit: limit },
        ];

        let matchOptions ='';

if(role === "admin"){
  matchOptions = {selectCompany:company}
}else{
  matchOptions = {selectCompany:company, userId:userId, notify:'false'}

}

const pdfs = await pdfModel.aggregate([
  {
    $match: {
      ...matchOptions,
         },
  },
  {
    $facet: {
      limitedPdfs:options,
      totalCount: [
        { $count: "count" }, // Count the total number of documents matching the filter
      ],
    },
  },
]);


const pdfList = pdfs[0]?.limitedPdfs || [];
const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
const pdfCount = Math.ceil(totalDocuments / limit);

if (!pdfs) throw new Error("Pdfs not found");

return res.status(200).json({
  hasError: false,
  msg: "All Pdfs Successfully Finded",
  data: { pdfs: pdfList, pages :pdfCount, total:totalDocuments },
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
            const {currentPage, sortValue, company,role, userId} = req.query; 
            const searchQuery = '';
            const page = currentPage || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const filterBy = sortValue;
      
            const options = [
              { $skip: skip }, // Pagination skip
              { $limit: limit },
            ];

          // Get the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript
const currentDay = currentDate.getDate();
const currentWeek = Math.ceil((currentDay + (new Date(currentYear, currentMonth - 1, 1).getDay())) / 7); // Calculate ISO week

let dateFilter = {};

// Assuming you are comparing the "quotationDate" field in the format "YYYY-MM-DD"
const quotationDate = "2024-12-18"; // Example date

// Filter by Day (e.g., "2024-12-18")
if (filterBy === "day") {
  const [year, month, day] = quotationDate.split("-").map(Number);

  dateFilter = {
    $expr: {
      $and: [
        { $eq: [{ $year: "$quotationDate" }, currentYear] },
        { $eq: [{ $month: "$quotationDate" }, currentMonth] },
        { $eq: [{ $dayOfMonth: "$quotationDate" }, currentDay] },
      ],
    },
  };
}

// Filter by Week (ISO Week)
else if (filterBy === "week") {
  const [year, month, day] = quotationDate.split("-").map(Number);
  const date = new Date(currentYear, currentMonth - 1, currentDay);
  const weekOfYear = Math.ceil((date.getDate() + (new Date(currentYear, currentMonth - 1, 1).getDay())) / 7);

  dateFilter = {
    $expr: {
      $and: [
        { $eq: [{ $year: "$quotationDate" }, currentYear] },
        { $eq: [{ $isoWeek: "$quotationDate" }, weekOfYear] }, // Use $isoWeek for ISO week calculation
      ],
    },
  };
}

// Filter by Month (e.g., December 2024)
else if (filterBy === "month") {
  const [year, month] = quotationDate.split("-").map(Number);

  dateFilter = {
    $expr: {
      $and: [
        { $eq: [{ $year: "$quotationDate" }, currentYear] },
        { $eq: [{ $month: "$quotationDate" }, currentMonth] },
      ],
    },
  };
}

           
            

let matchOptions ='';

if(role === "admin"){
  matchOptions = {selectCompany:company}
}else{
  matchOptions = {selectCompany:company, userId:userId, notify:'false'}
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
                  pdfs: [],
                  limitedPdfs:options,
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
            
            const pdfList = pdfs[0]?.limitedPdfs || [];
            const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
            const pdfCount = Math.ceil(totalDocuments / limit);
      
            if (!pdfs) throw new Error("Pdfs not found");
      
            return res.status(200).json({
              hasError: false,
              msg: "All Pdfs Successfully Finded",
              data: { pdfs: pdfList, pages :pdfCount, cardData:statusCount, total:totalDocuments },
            });
          } catch (error) {
            return res.status(200).json({
              hasError: true,
              msg: error.message,
              data: { pdfs: null },
            });
          }
    },
    getNoficationData: async (req, res, next) => {
      try {
        const {company, userId} = req.query; 
    

const pdfs = await pdfModel.aggregate([
  {
    $match: {
      selectCompany:company, 
      userId:userId, 
      notify:'true'
         },
  },
]);

if (!pdfs) throw new Error("Notification not found");




return res.status(200).json({
  hasError: false,
  msg: "All Notification Successfully Finded",
  data: { notificationData: pdfs, },
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { notificationData: null },
        });
      }
    },
    updateNotification: async (req, res, next) => {
      try {
        const {pdfId} = req.query; 
        const findPdf = await pdfModel.findOne({_id:pdfId});
        if (!findPdf) throw new Error("Notification not found");
        findPdf.notify = 'false';
        const notifys = await pdfModel.findByIdAndUpdate({_id:pdfId}, findPdf, {new:true} );
        if (!notifys) throw new Error("Notification not update");


return res.status(200).json({
  hasError: false,
  msg: "Notification Successfully Updated",
  data: { notification: notifys, },
});


      } catch (error) {
        return res.status(200).json({
          hasError: true,
          msg: error.message,
          data: { notificationData: null },
        });
      }
    },
  };
  