import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  price: Number,
  mrp: Number,
  rating: Number,
  ratingTotal: Number,
  discount: Number,
  seller: String,
  purl: String
});

const Product = mongoose.model("Product", productSchema);

export default Product;
