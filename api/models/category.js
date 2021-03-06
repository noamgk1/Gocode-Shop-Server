const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: String,
});

module.exports = mongoose.model("Category", categorySchema);
