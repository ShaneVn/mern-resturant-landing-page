const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js")
const utils = require("../utils")


const orderRoute = express.Router()


orderRoute.post("/", expressAsyncHandler(async(req,res)=>{
    const {orderItems, grandTotal, user, firstName, lastName, phone, loginEmail,contactEmail} = req.body
        const newOrder = new Order({
            orderItems,
            grandTotal,
            user,
            firstName,
            lastName,
            phone,
            loginEmail,
            contactEmail,
        })

        const order = await newOrder.save()
        res.status(201).send({message:'New Order Created', order})
}))

orderRoute.get("/history", utils.isAuth, expressAsyncHandler(async(req,res)=>{
    const orderHistory = await Order.find({user: req.user._id}).sort({_id:-1})
    res.send(orderHistory)
}))


module.exports = orderRoute