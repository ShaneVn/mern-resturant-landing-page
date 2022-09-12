const mongoose = require("mongoose");



const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true,},
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
