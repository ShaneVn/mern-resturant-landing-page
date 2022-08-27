const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, inque: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
