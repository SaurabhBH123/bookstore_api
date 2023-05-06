const express=require("express");
const { UserModel } = require("../models/user.model");
const userRouter=express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin}= req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            const user=new UserModel({name,email,password:hash,isAdmin})
            await user.save();
            res.status(201).send({"msg":"Registeration Successful"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user=UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                res.status(201).send({"msg":"Login Successful","token":jwt.sign({ "userID": user._id },"sb143")})
            });
        }else{
            res.status(400).send({"msg":"Login Failed"})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports=userRouter