const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./userRouter");
const config = require("./config");



//Express Server 
const app = express();

//Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.json());
app.use("/api",router);


app.get("/",(req,res) => {
    res.json({
        msg:"Hello World!!"
    })
});

//Server Running
app.listen(5000,() => {
    console.log("Server connected successfully in 5000");
});