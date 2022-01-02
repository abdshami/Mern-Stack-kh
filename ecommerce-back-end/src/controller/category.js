const express = require("express")
const router = express.Router();
const Category = require("../modles/Category")



exports.categoryById =(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "Category does not exist"
            })
        }
            req.category = category
            next();
        
    })
}

exports.create = (req,res)=>{
  
        const category = new Category(req.body)
        //console.log("req.body",req.body)
        category.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    error: "error in database"
                })
            }

            res.json({data})
        })
  
}

exports.read = (req,res)=>{
     return res.json(req.category)
}


exports.update = (req,res)=>{
    const category = req.category
    category.fname = req.body.fname

    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: "error in database update category"
            })
        }

        res.json({data})
    })
}

exports.remove = (req,res)=>{
    const category = req.category
  

    category.remove((err,data)=>{
        if(err){
            return res.status(400).json({
                error: "error in database update category"
            })
        }

        res.json({
            message: 'Category removed'
        })
    })
}

exports.list = (req,res)=>{
    Category.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error: "error in database update categories"
            })
        }

        res.json({
           data
        })


    })    
}