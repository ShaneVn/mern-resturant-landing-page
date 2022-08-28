const product =require("../data.js")
const express = require("express")
const seedRouter = express.Router();
const Product = require("../models/productModel.js")

console.log(product)

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(product.wines);
    res.send({ createdProducts});
  });

module.exports = seedRouter;

