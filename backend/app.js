const dotenv = require ("dotenv");
dotenv.config({path:".env"});
const express = require ("express");
const app = express();
const cors = require("cors");
const dataBaseconfig = require('./config/databaseConfig');
const path = require ('path');
const jwt = require('jsonwebtoken');
const pdfModel = require('./models/pdfModel');
// Set EJS as the template engine
app.set('view engine', 'ejs');

// Specify the directory for EJS files (optional, default is './views')
app.set('views', './views');

// Serve static files (optional, for CSS, JS, images, etc.)
app.use(express.static('public'));

// Define a route
app.get("/test/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the token
    const check = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!check) throw new Error("Token not found");

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

    const updateQuotation = await pdfModel.findByIdAndUpdate( { _id:id  },
        quotation,
        { new: true });
        if (!updateQuotation) throw new Error("Quotation not update");



    res.render("index", {
      title: "Status Update",
      message: "Working on update the pdf status",
    });
  } catch (error) {
    console.log(error)
  }
});


const authRouter = require ("./routes/authRoute");
const userRouter = require ("./routes/userRoute");
const pdfRouter = require ("./routes/pdfRoute");  
const referenceRouter = require ("./routes/referenceRoute");  
const mailRoute = require ("./routes/mailRoute");  


// Serve static files (like images) from the 'public' folder
app.use('/conqueror', express.static(path.join(__dirname, 'public')));
app.use('/injaz', express.static(path.join(__dirname, 'public/Injaz')));
app.use(express.static(path.join(__dirname, 'public')));


const allowedOrigins = [
    'http://localhost:4000',
    'http://localhost:5000',
    'http://localhost:4001',
    'http://localhost:4173',
    'https://portal.injazgroup.co.uk',
    'https://quotation.injazgroup.co.uk',
    'https://94.136.189.148:4000',
];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    maxAge: 86400,
    optionsSuccessStatus: 200,
}));


app.use(express.json());

// app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/pdf", pdfRouter);   
app.use("/api/v1/reference", referenceRouter);   
app.use("/api/v1/mail", mailRoute);   

app.get("/", (req, res) => {
	res.send("Server running");
});



// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });


app.listen(process.env.PORT, async () => {
    console.log(`Server running on port: ${process.env.PORT}`);
    try {
        const { err } = await dataBaseconfig();
        if (err) throw new Error(err)
    } catch (ex) {
        console.log('Database Connection Error:', ex);
    }
});
