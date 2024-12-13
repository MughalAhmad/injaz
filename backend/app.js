const dotenv = require ("dotenv");
dotenv.config({path:".env"});
const express = require ("express");
const app = express();
const cors = require("cors");
const dataBaseconfig = require('./config/databaseConfig');
const path = require ('path');


const authRouter = require ("./routes/authRoute");
const userRouter = require ("./routes/userRoute");
const clientRouter = require ("./routes/clientRoute");
const pdfRouter = require ("./routes/pdfRoute");  
const referenceRouter = require ("./routes/referenceRoute");  




const allowedOrigins = [
    'http://localhost:4000',
    'http://localhost:5000',
    'http://localhost:4001',
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

app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/pdf", pdfRouter);   
app.use("/api/v1/reference", referenceRouter);   

app.get("/", (req, res) => {
	res.send("Server running");
});



app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


app.listen(process.env.PORT, async () => {
    console.log(`Server running on port: ${process.env.PORT}`);
    try {
        const { err } = await dataBaseconfig();
        if (err) throw new Error(err)
    } catch (ex) {
        console.log('Database Connection Error:', ex);
    }
});
