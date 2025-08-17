import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  price: Number,
  mrp: Number,
  discount: Number,
  rating: { type: Number, default: 0 },
  ratingTotal: { type: Number, default: 0 },
  stock: Number,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  productUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
