const express = require("express")
const User = require("../models/userModel.js")
const data = require("../data.js")


const seedRouter = express.Router()

seedRouter.get('/', async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.sampleUser);
    res.send({ createdUsers });
  });


 
module.exports = seedRouter