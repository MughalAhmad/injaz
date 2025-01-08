// const cron = require('node-cron');
// const pdfModel = require('../models/pdfModel');
// const axios = require('axios');
// const startCronJob = async () => {
//     console.log('[cronjob] Scheduling cronjobs...');

//     cron.schedule('11 17 * * *', async () => {
//         console.log('[cronjob] Running daily updateDB job...');
//         try {
//             // Get the current date
//             const currentDate = new Date();

//             const twoDaysBackDateStart = new Date(); // Start of the day (00:00:00)
//             twoDaysBackDateStart.setDate(currentDate.getDate() - 2);
//             // twoDaysBackDateStart.setHours(0, 0, 0, 0);
            
//             const twoDaysBackDateEnd = new Date(); // End of the day (23:59:59)
//             twoDaysBackDateEnd.setDate(currentDate.getDate() - 2);
//             // twoDaysBackDateEnd.setHours(23, 59, 59, 999);        

//             const pdfs = await pdfModel.aggregate([
//                 {
//                   $match: {
//                     pdfStatus: 'pending',
//                     reminderAt: {
//                       $gte: twoDaysBackDateStart, // Greater than or equal to two days back (start of the day)
//                       $lte: twoDaysBackDateEnd,   // Less than or equal to two days back (end of the day)
//                     },
//                   },
//                 },
//               ]);

//             console.log(`[cronjob] Found ${pdfs.length} documents to process.`);
//             // console.log(`[cronjob] Found ${pdfs.reminderAt} documents to process.`);

//             const url = process.env.NODE_ENV === 'production' ? 'https://portal.injazgroup.co.uk/api/v1/pdf/sendPDF' : 'http://localhost:5000/api/v1/pdf/sendPDF';
//             // Process the filtered documents
//             for (let i = 0; i < pdfs.length; i++) {
               
//                 // axios.post(url,{data:pdfs[i], checkBoxData:pdfs[i].checkBoxData, stateArray:pdfs[i].stateArray, editerText:""});
            
//                 console.log(pdfs[i])
//             }


//             console.log('[cronjob] PDF successfully filtered and processed.');
//         } catch (error) {
//             console.error('[cronjob] Error during update:', error.message, error.stack);
//         }
//     });
// };

// module.exports = { startCronJob };


const cron = require('node-cron');
const pdfModel = require('../models/pdfModel');
const axios = require('axios');

const startCronJob = async () => {
    console.log('[cronjob] Scheduling cronjobs...');

    cron.schedule('29 17 * * *', async () => {
        console.log(`[cronjob] Job started at: ${new Date().toISOString()}`);

        try {
            // Get the current date
            const currentDate = new Date();

            const twoDaysBackDateStart = new Date();
            twoDaysBackDateStart.setDate(currentDate.getDate() - 1);
            twoDaysBackDateStart.setHours(0, 0, 0, 0); // Start of the day (00:00:00)

            const twoDaysBackDateEnd = new Date();
            twoDaysBackDateEnd.setDate(currentDate.getDate() - 2);
            twoDaysBackDateEnd.setHours(23, 59, 59, 999); // End of the day (23:59:59.999)

            console.log("Current Date:", currentDate);
            console.log("Two Days Back Start:", twoDaysBackDateStart);
            console.log("Two Days Back End:", twoDaysBackDateEnd);

            // Aggregation query
            const pdfs = await pdfModel.aggregate([
                {
                    $match: {
                        pdfStatus: 'pending',
                        reminderAt: {
                            $gte: twoDaysBackDateStart.toISOString(), // Greater than or equal to two days back (start of the day)
                            $lte: twoDaysBackDateEnd.toISOString(),   // Less than or equal to two days back (end of the day)
                        },
                    },
                },
            ]);

            if (!pdfs || pdfs.length === 0) {
                console.log("[cronjob] No matching documents found.");
                return;
            }

            console.log(`[cronjob] Found ${pdfs.length} documents to process.`);

            const url =
                process.env.NODE_ENV === 'production'
                    ? 'https://portal.injazgroup.co.uk/api/v1/pdf/sendPDF'
                    : 'http://localhost:5000/api/v1/pdf/sendPDF';

            for (let i = 0; i < pdfs.length; i++) {
                console.log(pdfs[i]); // Log the document
                // Uncomment this line to send requests to the API
                // await axios.post(url, { data: pdfs[i], checkBoxData: pdfs[i].checkBoxData, stateArray: pdfs[i].stateArray, editerText: "" });
            }

            console.log('[cronjob] PDF successfully filtered and processed.');
        } catch (error) {
            console.error('[cronjob] Error during update:', error.message, error.stack);
        }
    });
};

module.exports = { startCronJob };
