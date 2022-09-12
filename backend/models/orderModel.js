const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        total: { type: Number },
        product: {type: mongoose.Schema.Types.ObjectId, ref:"Product"}
      },
    ],
    grandTotal: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone:{type:Number, require:true},
    loginEmail:{type:String},
    contactEmail:{type:String}
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
