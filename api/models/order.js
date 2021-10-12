const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      qty: Number,
    },
  ],
  orderDate: { type: Date, default: Date.now },
  userDetail: [],
  totalAmount: Number,
});

module.exports = mongoose.model("Order", orderSchema);
