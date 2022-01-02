const Product = require("../modles/product")


const express = require("express");
const { parse } = require("dotenv");
const router = express.Router();


   exports.productById = (req,res,next,id) =>{
            Product.findById(id).exec((err,product)=>{
                if(err || !product){
                   return res.status(400).json({
                       error: 'product not found'
                   })
                }

                req.product = product
                next();
            })
   }


   exports.read = (req,res)=>{
             return res.json(req.product)
   }


    exports.create = (req,res)=>{
  
        const product = new Product(req.body)
      
        product.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    error: "error in database"
                })
            }

            res.json({data})
        })
  
}
    

exports.remove = (req,res)=>{
    let product = req.product

    product.remove((err,deletedProduct)=>{
         if(err){
            return res.status(400).json({
                error: "error in deleting product"
            })
        }

        res.json({
            deletedProduct,
            "mseeage":'Product deleted successfully'

        })

    })
}





exports.update = (req,res)=>{
  
    const product = req.product
    product.fname = req.body.fname
    product.description = req.body.description
    product.price = req.body.price
    product.category = req.body.category
    product.quantity = req.body.quantity
    product.photo = req.body.photo
  
    product.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: "error in database"
            })
        }

        res.json({data})
    })

}

exports.list = (req,res)=>{
       let order = req.query.order ? req.query.order  : 'asc'
       let sortBy  = req.query.sortBy ? req.query.sortBy  : '_id'
       let limit = req.query.limit ? parseInt(req.query.limit ) : 6


       Product.find().populate('category').sort([[sortBy, order]]).limit(limit).exec((err,data)=>{
        
            if(err){
                return res.status(400).json({
                    error: ":Products not found"
                })
            }
    
            res.send({data})
      
    })
}

exports.listRelated = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id: {$ne: req.product}, category: req.product.category})
    .limit(limit)
    .populate('category', '_id fname')
    .exec((err,products) =>{
        if(err){
            return res.status(400).json({
                error: ":Products not found"
            })
        }

        res.send({products})
    })
}

exports.listCategories = (req,res) => {
     Product.distinct("category" , {} , (err,categories) =>{
        if(err){
            return res.status(400).json({
                error: ":Categories not found"
            })
        }

        res.send({categories})
     })
}



////////////////////////////////////////////////////////////////////////////////////////////////


exports.listBySearch = (req,res)=> {
    let order = req.query.order ? req.query.order  : "desc"
    let sortBy  = req.query.sortBy ? req.query.sortBy  : "_id"
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let skip = parseInt(req.query.skip)
    let findArgs = {}


    for (let key in req.query.filters) {
        console.log(" key filters")
        if (req.body.filters[key].length > 0){
            console.log(" length")
            if(key === "price"){
                findArgs[key] ={
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }

            }else{
                findArgs[key] = req.body.filters[key]
                console.log("findArgs")
            }
        }
    }

   Product.find()
      .populate("category")
      .sort([[sortBy, order]])
      //.skip(skip)
     .limit(limit)
      .exec((err,data)=>{
        console.log("limit")
        if(err){
            return res.status(401).json({
                error: "Products not found",
                alert:console.log("Products not found")

            })
        }

        res.json({
            size: data.length,
            data
        })
      })


}



