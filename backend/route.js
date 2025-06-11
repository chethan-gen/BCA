const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const route = express();

route.use(express.json());

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const user = new mongoose.Schema({
    username:{
        typr:String,
    },password:{
        type:String,
    }
})
const User = mongoose.model("User",user);

route.post("/post",async(req,res)=>{
    const{username,password} = req.body;
    if(!username||!password){
        res.status(400).send("All fields are required")
    }
    const newUser = new mongoose.User({
        username : "admin",
        password : "password123",
    })
    try {
        const savedUser = await User.save();
        if(savedUser){
             const token = generateToken(user._id);
             res.status(201).json({ userId: user._id, token });
        }
    } catch (error) {
        res.status(500).send("something went wrong");
    }

})

route.get("/get",(req,res)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Welcome to your dashboard, " + decoded.id });
        if(!token){
            res.status(404).send("Unauthorised")
        }

    } catch (error) {
        res.status(500).send("Something went wrong",error)
    }
})