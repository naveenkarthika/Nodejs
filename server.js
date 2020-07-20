const express = require("express");
const morgan = require("morgan");
const router = require("./routes/userRouter");
const config = require("./config");
const records = require("./routes/faculty/record");
const admin = require("./routes/Admin");

//Express Server 
const app = express();

//Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.json());


//Routes
app.use("/api",router);
app.use("/record",records);
app.use("/admin",admin);


app.get("/",(req,res) => {
    res.json({
        msg:"Hello World!!"
    })
});

//Server Running
app.listen(5000,() => {
    console.log("Server connected successfully in 5000");
});