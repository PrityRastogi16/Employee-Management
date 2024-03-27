const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {BlacklistModel} = require("../models/blacklist.model")

// const {RedisClient} = require("../middlewares/redis.middleware");
const {UserModel} = require("../models/user.model");

const registerUser = async(req,res)=>{
    const {name, email, password, confirmPassword} = req.body;
    try{
        if(password !== confirmPassword){
            return res.json({msg:"Password not match"})
        }
        const exists = await UserModel.findOne({email})
        if(exists){
            return res.status(400).json({msg: "user already exists"})
        }
     
      bcrypt.hash(password,5, async(err,hash)=>{
        if(err){
            res.status(201).json({msg:"error"});
        }
        else{
            const user = new UserModel({name, email, password:hash})
            await user.save();
            res.status(201).json({msg:"User Registered Successful", user});
        }
      })
    }
    catch(err){
        console.log(err);
       res.status(401).send({"error":err}) 
    }
}

// Login
const loginUser = async(req,res)=>{
    const {email,password, confirmPassword} = req.body;
    try{
       
       const user = await UserModel.findOne({email});
       if(user){
        bcrypt.compare(password, user.password,(err,result)=>{
            if(result){
                const secret_key = process.env.secretKey;
                const token = jwt.sign({userId:user._id}, secret_key, {expiresIn:"1d"});
                res.cookie("token",token,{httpOnly:true})
                res.status(201).json({msg:"Login Successfull",Login_User: user.name, token})
            }else{
                res.status(201).json({msg:"Wrong Password"})
            }
        })
       }
    }
    catch(err){
        res.status(401).send({"error":err}) 
    }
}


// Logout
const logoutUser = async(req,res)=>{
   const token = req.cookies.token;
   try{
    const blacklist = new BlacklistModel({token})
    await blacklist.save();
    res.clearCookie("token");
    res.status(200).json({msg:"User has been logged out"})
   }
   catch(err){
    res.status(400).json({ error: err });
    console.log(err)
  }
}

module.exports = {
    registerUser,loginUser,
    logoutUser,
}