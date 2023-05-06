const express = require("express")
const { mongoose } = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const userRouter=require("./routes/user.routes")
const bookRouter = require("./routes/book.routes")
const orderRouter = require("./routes/order.routes")
const app=express()

app.use(express.json())
app.use(cors())

app.use("/",userRouter)
app.use("/books",bookRouter)
app.use("/orders",orderRouter)
app.listen(process.env.port,async()=>{
    try {
        await mongoose.connect(process.env.mongoUrl)
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at ${process.env.port}`)
})