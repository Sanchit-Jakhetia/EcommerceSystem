const User = require('../models/User');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // ← This fetches all users from MongoDB
    res.status(200).json(users);     // ← Sends them as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
