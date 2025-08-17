import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;  // ✅ must be "token"

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Create JWT for your own app
    const appToken = jwt.sign(
      { userId: sub, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: appToken, user: { email, name, picture } });
  } catch (err) {
    console.error("Google login failed:", err);
    res.status(400).json({ error: "Invalid Google token" });
  }
});

export default router;
