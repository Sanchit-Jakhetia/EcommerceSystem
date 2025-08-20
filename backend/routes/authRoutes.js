import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashed });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Login (local strategy)
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

// 🔹 Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // ✅ redirect user to frontend dashboard
    res.redirect("http://localhost:5500/dashboard.html"); 
    // (change 5500 if your frontend runs on a different port)
  }
);


router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });

  const { _id, name, email, role, addresses, phoneNumbers } = req.user;
  res.json({ _id, name, email, role, addresses, phoneNumbers });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({ message: "Google login success", user: req.user });
  }
);

// 🔹 Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out" });
  });
});

export default router;
