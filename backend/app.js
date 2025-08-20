import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // 🔹 Sessions (required by passport)
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // use a secure random string
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // set secure:true if using HTTPS
    })
  );
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
  // Initialize passport after dotenv config
  const { default: passport } = await import("./config/passport.js");
  app.use(passport.initialize());
  app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
  // MongoDB
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ DB Connection error:", err));

  // Routes
  app.use("/api/auth", authRoutes);

  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
  );
}

startServer().catch(console.error);
