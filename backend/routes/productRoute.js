const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js")



const foodProductsRoute = express.Router()


foodProductsRoute.get("/mainCourse", expressAsyncHandler(async(req,res)=>{
    const {query} = req
    const mainCourse = query.mainCourse 
    const sideDish = query.sideDish
    
    const foodProducts = await Product.find({  $or: [ { category: mainCourse  }, { category: sideDish} ] })
    res.send(foodProducts)
}))





module.exports = foodProductsRoute


