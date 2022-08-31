const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js")


const orderRoute = express.Router()


orderRoute.post("/", expressAsyncHandler(async(req,res)=>{
    const {orderItems, grandTotal, user, firstName, lastName, phone} = req.body
        const newOrder = new Order({
            orderItems,
            grandTotal,
            user,
            firstName,
            lastName,
            phone
        })

        const order = await newOrder.save()
        res.status(201).send({message:'New Order Created', order})
}))


module.exports = orderRoute