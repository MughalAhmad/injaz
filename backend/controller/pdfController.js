const pdfModel = require("../models/pdfModel");
const refModel = require("../models/referenceModel");

const {sendMail} = require("../integrations/sendMail");
const { all } = require("../routes/pdfRoute");

  module.exports = {
    createPdf: async (req, res, next) => {
      try {
        const companyName = req.body.selectCompany;
        console.log('selectCompany',companyName)
         const pdf = await pdfModel.create(req.body)
        if (!pdf) throw new Error("Error in Creating pdf");


        let message = {
          from: companyName === "Conqueror" ? process.env.MAIL_EMAIL_CONQUEROR : process.env.MAIL_EMAIL_INJAZ,
          to: pdf.clientEmail,
          cc: companyName === "Conqueror" ? process.env.MAIL_CONQUEROR_CC : process.env.MAIL_INJAZ_CC,
          subject: 'Quotaion Info',
          html:  
          companyName === "Conqueror" ?
          `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="../assets/injaz.png" alt="Injaz Group Logo" style="max-width: 150px;">
              </div>
          
              <!-- Title -->
              <h3 style="font-size: 20px; color: #B11116; margin-bottom: 10px;">Business Setup in Dubai, Including 2 Visa</h3>
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${pdf.clientName},</p>
              <p style="font-size: 14px; color: #555; line-height: 1.5;">
                We trust you’re doing well.
              </p>
              <p style="font-size: 14px; color: #555; line-height: 1.5;">
                Please find the attached PDF containing the quotation for your Business Setup. We kindly ask you to review the details provided in this email.
              </p>
          
              <!-- Attachment -->
              <div style="display: flex; align-items: center; background: #f5f7fa; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
                <img src="https://via.placeholder.com/40" alt="PDF Icon" style="margin-right: 10px;">
                <div>
                  <p style="margin: 0; font-size: 14px;">Asadmalik_ajman2visalicensePackge.pdf</p>
                  <p style="margin: 0; font-size: 12px; color: #888;">200KB</p>
                </div>
                <a href="#" style="margin-left: auto; background: #B11116; color: #fff; padding: 8px 12px; border-radius: 5px; text-decoration: none; font-size: 14px;">Download</a>
              </div>
          
              <!-- Call to Action -->
              <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f5f7fa; border-radius: 8px;">
                <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
                  If the information aligns with your expectations, please click "Accept" to proceed. Should you choose not to move forward, simply click "Reject" to update your records accordingly.
                </p>
                <div>
                  <a href="#" style="background: #28a745; color: #fff; text-decoration: none; padding: 10px 20px; margin-right: 10px; border-radius: 5px;">Accept</a>
                  <a href="#" style="background: #dc3545; color: #fff; text-decoration: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px;">Reject</a>
                </div>
              </div>
          
              <!-- Footer -->
              <p style="font-size: 14px; color: #555; margin: 20px 0;">
                If you have any questions or need further clarification, please don’t hesitate to reach out.
              </p>
              <p style="font-size: 14px; color: #555;">We look forward to the opportunity to work with you and achieve our mutual goals.</p>
              <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Sales Team</p>
          
              <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
                <div>
                  <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Facebook"></a>
                  <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Instagram"></a>
                  <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="LinkedIn"></a>
                  <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="YouTube"></a>
                  <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Telegram"></a>
                  <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="WhatsApp"></a>
                </div>
              </div>
          
              <p style="font-size: 12px; color: #999; text-align: center;">
                Injaz Group Fzc<br>
                City Pharmacy Bid, Port Saeed, Dubai
              </p>
            </div>
          </div>`
          :
          `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="../assets/injaz.png" alt="Injaz Group Logo" style="max-width: 150px;">
            </div>
        
            <!-- Title -->
            <h3 style="font-size: 20px; color: #0A144E; margin-bottom: 10px;">Business Setup in Dubai, Including 2 Visa</h3>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${pdf.clientName},</p>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">
              We trust you’re doing well.
            </p>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">
              Please find the attached PDF containing the quotation for your Business Setup. We kindly ask you to review the details provided in this email.
            </p>
        
            <!-- Attachment -->
            <div style="display: flex; align-items: center; background: #f5f7fa; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
              <img src="https://via.placeholder.com/40" alt="PDF Icon" style="margin-right: 10px;">
              <div>
                <p style="margin: 0; font-size: 14px;">Asadmalik_ajman2visalicensePackge.pdf</p>
                <p style="margin: 0; font-size: 12px; color: #888;">200KB</p>
              </div>
              <a href="#" style="margin-left: auto; background: #0A144E; color: #fff; padding: 8px 12px; border-radius: 5px; text-decoration: none; font-size: 14px;">Download</a>
            </div>
        
            <!-- Call to Action -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f5f7fa; border-radius: 8px;">
              <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
                If the information aligns with your expectations, please click "Accept" to proceed. Should you choose not to move forward, simply click "Reject" to update your records accordingly.
              </p>
              <div>
                <a href="#" style="background: #28a745; color: #fff; text-decoration: none; padding: 10px 20px; margin-right: 10px; border-radius: 5px;">Accept</a>
                <a href="#" style="background: #dc3545; color: #fff; text-decoration: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px;">Reject</a>
              </div>
            </div>
        
            <!-- Footer -->
            <p style="font-size: 14px; color: #555; margin: 20px 0;">
              If you have any questions or need further clarification, please don’t hesitate to reach out.
            </p>
            <p style="font-size: 14px; color: #555;">We look forward to the opportunity to work with you and achieve our mutual goals.</p>
            <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Sales Team</p>
        
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 14px; color: #333;">CONNECT WITH</p>
              <div>
                <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Facebook"></a>
                <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Instagram"></a>
                <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="LinkedIn"></a>
                <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="YouTube"></a>
                <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="Telegram"></a>
                <a href="#" style="margin: 0 5px;"><img src="https://via.placeholder.com/32" alt="WhatsApp"></a>
              </div>
            </div>
        
            <p style="font-size: 12px; color: #999; text-align: center;">
              Injaz Group Fzc<br>
              City Pharmacy Bid, Port Saeed, Dubai
            </p>
          </div>
        </div>`





        //   `
        //   <div style="text-align: center">
        //   <h3>Hello ${pdf.clientName}</h3>
        //   <h3>Company ${pdf.companyName}</h3>

        //   </br>
        //     <p>This is a quotation regarding your visa. Could you please review the details we have provided in this email?</p>
        //     </br>
        //     <p>If everything looks good, kindly click the "Accept" button. If you decide not to proceed with us, please click the "Reject" button to update your records.</p>
        //     </br>

        //      <a href="#" style="
        //             display: inline-block;
        //             padding: 10px 20px;
        //             font-size: 16px;
        //             color: white;
        //             background-color: green;
        //             text-decoration: none;
        //             border-radius: 25px;
        //           ">Accept</a>
        //     </br>

        //        <a href="#" style="
        //             display: inline-block;
        //             padding: 10px 20px;
        //             font-size: 16px;
        //             color: white;
        //             background-color: red;
        //             text-decoration: none;
        //             border-radius: 25px;
        //           ">Reject</a>

        //   </div>
        // `
        , 
        };
  
        const { error } =  await sendMail(message, companyName);
  
        if (error) throw new Error('User Email Send Process Failed!');
  
  
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
    allRefs: async (req, res, next) => {
      try {
       
        const allRefs = await refModel.aggregate([
          {$project:{
                _id:1,
                fullName:1,
                refCode:1
          }}
        ]);
        if (!allRefs) throw new Error("References not found");

        let modifyRefs = [];

        allRefs.map((item)=>{
          modifyRefs.push({
            id:item.fullName,
            name:item.fullName,
          })
        })

return res.status(200).json({
  hasError: false,
  msg: "Reference successfully find",
  data: { refs: modifyRefs, },
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
  