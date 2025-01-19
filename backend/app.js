const dotenv = require ("dotenv");
dotenv.config({path:".env"});
const express = require ("express");
const app = express();
const cors = require("cors");
const dataBaseconfig = require('./config/databaseConfig');
const path = require ('path');
const puppeteer = require('puppeteer');
const authRouter = require ("./routes/authRoute");
const userRouter = require ("./routes/userRoute");
const pdfRouter = require ("./routes/pdfRoute");  
const pdfModel = require("./models/pdfModel");
const referenceRouter = require ("./routes/referenceRoute");  
const errorHandler = require('./middleware/errorHandler');
const intailHelper = require('./middleware/puppteerMethod');
const {startCronJob} = require('./cornjobs/reminderPDF');
app.use('/conqueror', express.static(path.join(__dirname, 'public')));
app.use('/injaz', express.static(path.join(__dirname, 'public/Injaz')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(intailHelper);

const allowedOrigins = [
    'http://localhost:4173',
    'http://localhost:5000',
    'https://portal.injazgroup.co.uk',
    'https://quotation.injazgroup.co.uk',
    'https://94.136.189.148:4173',
];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    maxAge: 86400,
    optionsSuccessStatus: 200,
}));


app.use(express.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/pdfScreen', async(req, res) => {
    const {id} = req.query;
    const pdfRecord = await pdfModel.findOne({_id:id});

    res.render('index',{company:pdfRecord?.selectCompany, data:pdfRecord, checkData:pdfRecord.checkBoxData, actives:pdfRecord.stateArray});
});


// app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/pdf", pdfRouter);   
app.use("/api/v1/reference", referenceRouter);   


// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    console.log(`Server running on port: ${process.env.PORT}`);
    try {
        const { err } = await dataBaseconfig();
        // startCronJob();
        if (err) throw new Error(err)
    } catch (ex) {
        console.log('Database Connection Error:', ex);
    }
});
