import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: String,
  parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Category', categorySchema);
