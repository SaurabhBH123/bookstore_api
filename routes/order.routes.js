const express=require("express")
const { OrderModel } = require("../models/order.model")
const { auth } = require("../middlewares/auth.middleware")
const orderRouter=express.Router()

orderRouter.post("/",auth,async(req,res)=>{
    const payload=req.body
    try {
        const newOrder = new OrderModel(payload)
        await newOrder.save()
        res.status(201).send({"msg":"A new order is added."})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

orderRouter.get("/",auth,async(req,res)=>{
    try {
        const orders = await OrderModel.find()
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports=orderRouter