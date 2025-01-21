const pdfModel = require("../models/pdfModel");
const refModel = require("../models/referenceModel");
const {sendMail} = require("../integrations/sendMail");
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const jwt = require("jsonwebtoken");

const generatePDF = async (id) => {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        dumpio: true
     });

    const page = await browser.newPage();

    await page.goto(`http://localhost:5000/pdfScreen?id=${id}`);


    const pdfBuffer = await page.pdf({
      // path:'pdf.pdf',
      format: 'A4',
      printBackground: true,
      scale: 0.8,
    });


    console.log('PDF generated successfully: multi-page-report.pdf');
    await browser.close();

    return pdfBuffer;
};

const compressPDF = async (pdfBuffer) => {
  // Load the Puppeteer-generated PDF
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  // Save the compressed PDF
  const compressedPdfBuffer = await pdfDoc.save({
    useObjectStreams: true, // Optimize PDF structure
    compress: true,
  });

  console.log('PDF compressed successfully');
  return compressedPdfBuffer;
};

  module.exports = {
    createPdf: async (req, res, next) => {
      try {
        const modifyBody = {
          ...req.body.data,
          checkBoxData:req.body.checkBoxData,
          stateArray:req.body.stateArray
        }
         const pdf = await pdfModel.create(modifyBody);
        if (!pdf) throw new Error("Error in Creating pdf");
  
        return res.status(200).json({
          hasError: false,
          msg: "Pdf Created!",
          data: { pdf: pdf},
        });
      } catch (error) {
        next(error);
      }
    },
    getAllPdf: async (req, res, next) => {
      try {
        const {currentPage, company,role, userId, filter, sortValue} = req.query;
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
          options.unshift({ $sort: { _id: sortOrder } })
        }
       
        
        // Build search filter only if `searchQuery` is provided
    const searchFilter = searchQuery
    ? {
        $or: [
          { clientName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `status`
          { clientEmail: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `category`
          { pdfStatus: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `title`
          { reference: { $regex: searchQuery, $options: "i" } }, // Case-insensitive searchQuery in `title`
        ],
      }
    : null;
        

        let matchOptions ='';

if(role === "admin"){
  matchOptions = {selectCompany:company}
}else{
  matchOptions = {selectCompany:company, userId:userId, notify:'false'}

}

 // Combine `matchOptions` and `searchFilter`
 const matchStage = {
  ...matchOptions,
  ...(searchFilter && searchFilter), // Only include searchFilter if it's not null
};

const pdfs = await pdfModel.aggregate([
  {
    $match: matchStage,
  },
  {
    $facet: {
      quotations:options,
      totalCount: [
        { $count: "count" }, // Count the total number of documents matching the filter
      ],
    },
  },
]);


const pdfList = pdfs[0]?.quotations || [];
const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
const pdfCount = Math.ceil(totalDocuments / limit);

if (!pdfs) throw new Error("Pdfs not found");

return res.status(200).json({
  hasError: false,
  msg: "All Pdfs Successfully Finded",
  data: { pdfs: pdfList, pages :pdfCount, total:totalDocuments },
});


      } catch (error) {
        next(error);
      }
    },
    getQuotation: async (req, res, next) => {
      try {
        const {id} = req.query; 
       
        const quotation = await pdfModel.findOne({_id:id});
        if (!quotation) throw new Error("Quotation not found");

return res.status(200).json({
  hasError: false,
  msg: "Quotation Successfully Finded",
  data: { quotation: quotation }
});


      } catch (error) {
        next(error);
      }
    },
    dashboardData: async (req, res, next) => {
  try {
    const { currentPage, sortValue, company, role, userId ,name} = req.query;
    const page = currentPage || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const options = [
      { $skip: skip }, // Pagination skip
      { $limit: limit },
    ];

    let matchOptions = '';

    if (role === "admin") {
      matchOptions = { selectCompany: company };
    } else {
      matchOptions = { selectCompany: company, userId: userId, notify: 'false' };
    }

    // Date filtering logic based on sortValue for createdAt
    let dateFilter = {};
    const today = new Date();

    if (sortValue === 'today') {
      // Filter for the current day's data
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today
      dateFilter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    } else if (sortValue === 'week') {
      // Filter for the current week's data (from Sunday to today)
      let startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of current week (Sunday
      startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight)
      dateFilter.createdAt = { $gte: startOfWeek };
    } else if (sortValue === 'month') {
      // Filter for the current month's data (from the 1st of the month to today)
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
      dateFilter.createdAt = { $gte: startOfMonth };
    }
   
    let testDATA 
     if(name){
      testDATA = {pdfStatus:name}
     }


    // Apply the date filter if sortValue is provided
    if (Object.keys(dateFilter).length > 0) {
      matchOptions = { ...matchOptions, ...dateFilter };
    }

    const pdfs = await pdfModel.aggregate([
      {
        $match: {
    ...testDATA, 
          
          ...matchOptions,
        },
      },
      {
        $facet: {
          pdfs: [],
          limitedPdfs: options,
          totalCount: [
            { $count: "count" }, // Count the total number of documents matching the filter
          ],
        },
      },
    ]);

    let statusCount = {
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    pdfs[0]?.pdfs.map((pdf) => {
      if (pdf.pdfStatus === "pending") {
        statusCount.pending = statusCount.pending + 1;
      } else if (pdf.pdfStatus === "approved") {
        statusCount.approved = statusCount.approved + 1;
      } else {
        statusCount.rejected = statusCount.rejected + 1;
      }
    });

    const pdfList = pdfs[0]?.limitedPdfs || [];
    const totalDocuments = pdfs[0]?.totalCount[0]?.count || 0;
    const pdfCount = Math.ceil(totalDocuments / limit);

    if (!pdfs) throw new Error("Pdfs not found");

    return res.status(200).json({
      hasError: false,
      msg: "All Pdfs Successfully Found",
      data: { pdfs: pdfList, pages: pdfCount, cardData: statusCount, total: totalDocuments },
    });
  } catch (error) {
    next(error);
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
        next(error);
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
        next(error);
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
            id:item.refCode,
            name:item.fullName,
            email:item.email || "empty",
            designation:item.designation || "empty",
          })
        });

        console.log(modifyRefs)

return res.status(200).json({
  hasError: false,
  msg: "Reference successfully find",
  data: { refs: modifyRefs, },
});


      } catch (error) {
        next(error);
      }
    },
    sendPDF : async (req, res, next) => {
      try {
         const {id, editerText=""} = req.body;
         const pdfRecord = await pdfModel.findOne({_id:id});
         if (!pdfRecord) throw new Error("PDF not founded");

      const pdfBuffer = await generatePDF(id);

// Compress the PDF'
const compressedPdfBuffer = await compressPDF(pdfBuffer);

     let acceptDataSet={
      id:pdfRecord?._id,
      action:'approved',
     }

     let rejectDataSet={
      id:pdfRecord?._id,
      action:'rejected',
     }

const acceptToken = jwt.sign({ acceptDataSet }, process.env.JWT_SECRET_KEY,{ expiresIn: "2d" });
const rejectToken = jwt.sign({ rejectDataSet }, process.env.JWT_SECRET_KEY,{ expiresIn: "2d" });

let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4173' : 'https://quotation.injazgroup.co.uk';


const acceptLink = `${baseUrl}/sendMailResponse?token=${acceptToken}&&comapny=${pdfRecord?.selectCompany}&&action=approved`;
const rejectLink = `${baseUrl}/sendMailResponse?token=${rejectToken}&&comapny=${pdfRecord?.selectCompany}&&action=rejected`;

let url = "http://localhost:5000/injaz/" ;
let Curl ="http://localhost:5000/conqueror/" ;


        let message = {
          from: pdfRecord.selectCompany === "Conqueror" ? process.env.MAIL_EMAIL_CONQUEROR : process.env.MAIL_EMAIL_INJAZ,
          to: pdfRecord.clientEmail,
          cc: pdfRecord.selectCompany === "Conqueror" ? process.env.MAIL_CONQUEROR_CC : process.env.MAIL_INJAZ_CC,
          subject:`${pdfRecord.clientName} | ${pdfRecord.country} | ${pdfRecord.packageIncludingVisa} Visa Pkg | ${pdfRecord.stateValue}`,
          attachments: [
            {
              filename: `Offer-${pdfRecord.packageIncludingVisa} Visa.pdf`,
              content: compressedPdfBuffer,
            },
            pdfRecord.selectCompany === "Injaz" ?
            {
              filename: 'page3Logo.png',
              path: url+'page3Logo.png',
              cid: 'I_page3Logo' // same CID as referenced in the email
          }:
          {
            filename: 'page3Logo.png',
            path: Curl+'page3Logo.png',
            cid: 'C_page3Logo' // same CID as referenced in the email
        },
          ], 
          html:  
          pdfRecord.selectCompany === "Conqueror" ?
          `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:C_page3Logo" alt="Conqueror Logo" style="max-width: 150px;">
              </div>
          
              <!-- Title -->
            <h3 style="font-size: 20px; color: #C40014; margin-bottom: 10px;">Business Setup in ${pdfRecord.stateValue}, Including ${pdfRecord.packageIncludingVisa} Visa</h3>
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${pdfRecord.clientName},</p>
              <p style="font-size: 14px; color: #555; line-height: 1.5;">
                We trust you’re doing well.
              </p>
              <p style="font-size: 14px; color: #555; line-height: 1.5;">
                Please find the attached PDF containing the quotation for your Business Setup. We kindly ask you to review the details provided in this email.
              </p>
          
              <!-- Attachment
              <div style="display: flex; align-items: center; background: #f5f7fa; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
                <img src="https://via.placeholder.com/40" alt="PDF Icon" style="margin-right: 10px;">
                <div>
                  <p style="margin: 0; font-size: 14px;">Asadmalik_ajman2visalicensePackge.pdf</p>
                  <p style="margin: 0; font-size: 12px; color: #888;">200KB</p>
                </div>
                <a href="#" style="margin-left: auto; background: #B11116; color: #fff; padding: 8px 12px; border-radius: 5px; text-decoration: none; font-size: 14px;">Download</a>
              </div> -->
          
              <!-- Call to Action -->
              <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f5f7fa; border-radius: 8px;">
                <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
                  If the information aligns with your expectations, please click "Accept" to proceed. Should you choose not to move forward, simply click "Reject" to update your records accordingly.
                </p>
                <div>
                  <a href="${acceptLink}" style="background: #28a745; color: #fff; text-decoration: none; padding: 10px 20px; margin-right: 10px; border-radius: 5px;">Accept</a>
                  <a href="${rejectLink}" style="background: #dc3545; color: #fff; text-decoration: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px;">Reject</a>
                </div>
              </div>
          
              <!-- Footer -->
              <p style="font-size: 14px; color: #555; margin: 20px 0;">
                If you have any questions or need further clarification, please don’t hesitate to reach out.
              </p>
              <p style="font-size: 14px; color: #555;">We look forward to the opportunity to work with you and achieve our mutual goals.</p>

              ${editerText ? editerText : ''}

              <p style="font-size: 14px; color: #333;">Best regards,<br>Conqueror Aspiration L.L.C Sales Team</p>
          
              <div style="text-align: center; margin: 5px 0;">
                <p style="font-size: 14px; color: #C40014; font-weight: 600;">CONNECT WITH</p>
                <div>
                 <a href="https://www.facebook.com/conquerorllc?mibextid=LQQJ4d&mibextid=LQQJ4d" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                <a href="https://www.instagram.com/uaeconqueror?igsh=a2xpMnZnOGRpcWw=" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                <a href="https://api.whatsapp.com/send/?phone=%2B97142837636&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
                </div>
              </div>
          
              <p style="font-size: 12px; color: #999; text-align: center;">
                Conqueror Aspiration L.L.C<br>
                City Pharmacy Bid, Port Saeed, Dubai
              </p>

              <p style="font-size: 12px; color: #999; text-align: center;">
                Conqueror Sales Department<br>
                sales@conqueror.ae<br>
                Conqueror Support Team<br>
                support@conqueror.ae<br>
                Conqueror Aspiration<br>
                contact@conqueror.ae
              </p>

            </div>
          </div>
          `
          :
          `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="cid:I_page3Logo" alt="Injaz Group Logo" style="max-width: 150px;">

            </div>
        
            <!-- Title -->
            <h3 style="font-size: 20px; color: #1E2957; margin-bottom: 10px;">Business Setup in ${pdfRecord.stateValue}, Including ${pdfRecord.packageIncludingVisa} Visa</h3>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${pdfRecord.clientName},</p>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">
              We trust you’re doing well.
            </p>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">
              Please find the attached PDF containing the quotation for your Business Setup. We kindly ask you to review the details provided in this email.
            </p>
        
            <!-- Attachment 
            <div style="display: flex; align-items: center; background: #f5f7fa; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
              <img src="https://via.placeholder.com/40" alt="PDF Icon" style="margin-right: 10px;">
              <div>
                <p style="margin: 0; font-size: 14px;">Asadmalik_ajman2visalicensePackge.pdf</p>
                <p style="margin: 0; font-size: 12px; color: #888;">200KB</p>
              </div>
              <a href="#" style="margin-left: auto; background: #0A144E; color: #fff; padding: 8px 12px; border-radius: 5px; text-decoration: none; font-size: 14px;">Download</a>
            </div>-->
        
            <!-- Call to Action -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f5f7fa; border-radius: 8px;">
              <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
                If the information aligns with your expectations, please click "Accept" to proceed. Should you choose not to move forward, simply click "Reject" to update your records accordingly.
              </p>
               <div>
                  <a href="${acceptLink}" style="background: #28a745; color: #fff; text-decoration: none; padding: 10px 20px; margin-right: 10px; border-radius: 5px;">Accept</a>
                  <a href="${rejectLink}" style="background: #dc3545; color: #fff; text-decoration: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px;">Reject</a>
                </div>
            </div>
        
            <!-- Footer -->
            <p style="font-size: 14px; color: #555; margin: 20px 0;">
              If you have any questions or need further clarification, please don’t hesitate to reach out.
            </p>
            <p style="font-size: 14px; color: #555;">We look forward to the opportunity to work with you and achieve our mutual goals.</p>

              ${editerText ? editerText : ''}


            <p style="font-size: 14px; color: #333;">Best regards,<br>Injaz Group Fzc Sales Team</p>
        
            <div style="text-align: center; margin: 5px 0;">
              <p style="font-size: 14px; color: #1E2957; font-weight: 600;">CONNECT WITH</p>
              <div>
                 <a href="https://www.facebook.com/iinjazgroup" style="background: #0165E1; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Facebook</a>
                <a href="https://www.instagram.com/iinjazgroup/" style="background: #dd2a7b; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">Instagram</a>
                <a href="https://api.whatsapp.com/send/?phone=%2B97165334085&text&type=phone_number&app_absent=0" style="background: #5FFC7B; color: #fff; text-decoration: none; padding: 6px 10px; margin-right: 5px; border-radius: 5px;">WhatsApp</a>
              </div>
            </div>
        
            <p style="font-size: 12px; color: #999; text-align: center;">
              Injaz Group Fzc<br>
              City Pharmacy Bid, Port Saeed, Dubai
            </p>
          </div>
        </div>`
        
        
        };
  
        const { error } =  await sendMail(message, pdfRecord.selectCompany);
  
        if (error) throw new Error('User Email Send Process Failed!');
  
         return res.status(200).json({
          hasError: false,
          msg: "Email Successfully send",
          data: null,
        });

      } catch (error) {
        console.error('Error generating PDF:', error);
        next(error);
      }
    },
    changePdfStatus: async (req, res, next) => {
      try {
        const {token} = req.query; 
        // Verify the token
        const check = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!check) throw new Error("Email Expired");
        let id;
        let action;
        if(check.acceptDataSet){
            id=check.acceptDataSet.id;
            action=check.acceptDataSet.action;
        }
        else{
            id=check.rejectDataSet.id;
            action=check.rejectDataSet.action
        }

        console.log("check_id", id);
          console.log("check_action", action);
      
      
          const quotation = await pdfModel.findOne({ _id:id });
          if (!quotation) throw new Error("Quotation not found");

          quotation.pdfStatus=action;
          quotation.updatedAt=new Date();
      
          const updateQuotation = await pdfModel.findByIdAndUpdate( { _id:id  },
              quotation,
              { new: true });
              if (!updateQuotation) throw new Error("Quotation not update");

return res.status(200).json({
  hasError: false,
  msg: "",
  data: null
});


      } catch (error) {
        next(error);
      }
    },
    updateReminderAt: async (req, res, next) => {
      try {
        const {pdfId} = req.query; 
        const findPdf = await pdfModel.findOne({_id:pdfId});
        if (!findPdf) throw new Error("Notification not found");
        findPdf.reminderAt = 'false';
        const notifys = await pdfModel.findByIdAndUpdate({_id:pdfId}, findPdf, {new:true} );
        if (!notifys) throw new Error("Notification not update");


return res.status(200).json({
  hasError: false,
  msg: "Notification Successfully Updated",
  data: { notification: notifys, },
});


      } catch (error) {
        next(error);
      }
    }, 
  };
  