const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  products: [
    {
      productid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  orderDate: { type: Date, default: Date.now },
  shipStreet: String,
  shipHome: String,
  shipCity: String,
  status: Boolean,
  totalAmount: Number,
});

module.exports = mongoose.model("Order", orderSchema);
