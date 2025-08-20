import bcrypt from "bcrypt";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;  // <-- frontend must send these
    console.log("🔍 Received from frontend:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔍 Stored hash in DB:", user.password);

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful:", user.name, user.email);
        res.json({ 
    message: "Login successful", 
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });


  } catch (err) {
    console.error("⚠️ Error in login:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
