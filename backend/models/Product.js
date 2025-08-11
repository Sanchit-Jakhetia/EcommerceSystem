const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  images: [String],
  price: Number,
  mrp: Number,
  rating: Number,
  ratingTotal: Number,
  discount: Number,
  seller: String,
  purl: String,
});

module.exports = mongoose.model("Product", productSchema);
