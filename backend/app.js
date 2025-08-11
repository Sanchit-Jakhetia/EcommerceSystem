const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));
app.use(cors()); // Add this before your routes
// Routes
app.use('/api/users', userRoutes); // API endpoint

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
