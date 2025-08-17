import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  label: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
}, { _id: true });

const phoneSchema = new mongoose.Schema({
  label: String,
  number: String
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
  addresses: [addressSchema],
  phoneNumbers: [phoneSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
