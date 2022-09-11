const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, inque: true },
//     image: { type: String, require: true },
//     price: { type: Number, require: true },
//     description: { type: String, require: true },
//   },
//   {
//     timestamps: true,
//   }
// );

const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, uinque: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
