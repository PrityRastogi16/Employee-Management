const express = require("express");
const connection = require("./db");
const {userRouter} = require("./routes/user.routes")
const {employeeRouter} = require("./routes/employee.route")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.json("Working Fine");
})
app.use("/user", userRouter);
app.use("/employee", employeeRouter);

app.listen("2002",async(req,res)=>{
    try{
     await connection;
     console.log("Connected to DB");
     console.log("Server is running on port 2002");
    }
    catch(err){
     console.log(err);
    }
 })