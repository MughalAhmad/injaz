const dotenv = require ("dotenv");
dotenv.config({path:".env"});
const express = require ("express");
const path = require("path");
const app = express();


const authRouter = require ("./routes/authRoute");
const userRouter = require ("./routes/userRoute");
const clientRouter = require ("./routes/clientRoute");



// const allowedOrigins = [
//     'http://localhost:3000',
//     'http://localhost:4000',
//     'https://www.smsmesh.com',
//     'https://smsmesh.com',
//     'https://44.218.137.5:3000',
// ];

// app.use(cors({
//     origin: allowedOrigins,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     maxAge: 86400,
//     optionsSuccessStatus: 200,
// }));


app.use(express.json());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/client", clientRouter);

// app.use(express.static(path.join(__dirname,"../frontend/dist")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
// })

const port = 4000;
app.listen(port, async () => {
    console.log(`Server running on port: ${port}`);
});
