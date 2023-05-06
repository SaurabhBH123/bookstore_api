const express=require("express")
const { BookModel } = require("../models/book.model")
const { auth } = require("../middlewares/auth.middleware")
const bookRouter=express.Router()


bookRouter.post("/",auth,async (req,res)=>{
    const payload = req.body
    try {
        const newBook = new BookModel(payload)
        await newBook.save()
        res.status(201).send({"msg":"A new book is added."})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

bookRouter.get("/",async(req,res)=>{
    const {category,author} = req.query
    try {
        const query={}
        if(category){
            query.category=category
        }
        if(category){
            if(author){
                query.category=category
                query.author=author
            }
        }
        const books = await BookModel.find(query)
        // console.log(books)
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

bookRouter.get("/:id",async(req,res)=>{
    // console.log(req.params)
    try {
        const book = await BookModel.findOne({_id:req.params.id})
        res.status(200).send(book)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

bookRouter.patch("/:id",auth,async(req,res)=>{
    const payload = req.body
    const ID = req.params.id
    try {
        await BookModel.findByIdAndUpdate({_id:ID},payload)
        res.status(204).send({"msg":"book is updated"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

bookRouter.delete("/:id",auth,async(req,res)=>{
    const ID = req.params.id
    try {
        await BookModel.findByIdAndDelete({_id:ID})
        res.status(202).send({"msg":"book is deleted"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports=bookRouter;