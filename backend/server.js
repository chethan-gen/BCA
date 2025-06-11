const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT||8080;
app.use(express.json());
const route = require("./route")


const dotenv = require("dotenv");
dotenv.config();

app.get("/",(req,res)=>{
    res.send("Welcome to my backend 🟢");
})

app.use("/api",route);

app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`);
})
