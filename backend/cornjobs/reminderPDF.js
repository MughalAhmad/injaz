const cron = require('node-cron');
const pdfModel = require('../models/pdfModel');
const axios = require('axios');
const startCronJob = async () => {
    console.log('[cronjob] Scheduling cronjobs...');

    cron.schedule('14 6 * * *', async () => {
        console.log('[cronjob] Running daily updateDB job...');
        try {
            // Get the current date
            const currentDate = new Date();

           // Calculate two days back
           const twoDaysBackDateStart = new Date();
           twoDaysBackDateStart.setDate(currentDate.getDate() - 1);
           twoDaysBackDateStart.setHours(0, 0, 0, 0); // Start of the day (00:00:00)

           const twoDaysBackDateEnd = new Date();
           twoDaysBackDateEnd.setDate(currentDate.getDate() - 1);
           twoDaysBackDateEnd.setHours(23, 59, 59, 999); // End of the day (23:59:59)

            // Query for documents with `reminder` between `twoDaysBackDate` and `currentDate`
            const pdfs = await pdfModel.find({
                pdfStatus: 'pending',
                reminderAt: {
                    $gte: twoDaysBackDateStart, // Greater than or equal to two days back
                    $lte: twoDaysBackDateEnd,    // Less than or equal to the current date
                },
            });

            console.log(`[cronjob] Found ${pdfs.length} documents to process.`);
            const url = process.env.NODE_ENV === 'production' ? 'https://portal.injazgroup.co.uk/api/v1/pdf/sendPDF' : 'http://localhost:5000/api/v1/pdf/sendPDF';
            // Process the filtered documents
            for (let i = 0; i < pdfs.length; i++) {
                if(process.env.NODE_ENV)
                axios.post(url,{data:pdfs[i], checkBoxData:pdfs[i].checkBoxData, stateArray:pdfs[i].stateArray, editerText:""});
            }

            console.log('[cronjob] PDF successfully filtered and processed.');
        } catch (error) {
            console.error('[cronjob] Error during update:', error.message, error.stack);
        }
    });
};

module.exports = { startCronJob };
