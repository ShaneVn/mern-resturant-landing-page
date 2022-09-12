const productData =require("../ProductData.js")
const express = require("express")
const seedRouter = express.Router();
const Product = require("../models/productModel.js")



// seedRouter.get('/', async (req, res) => {
//    await Product.deleteMany({})
//     const createdProducts = await Product.insertMany(productData);
//     res.send({ createdProducts});
//   });

module.exports = seedRouter;

