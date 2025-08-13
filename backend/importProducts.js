import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";
import Product from "./models/productModel.js";

dotenv.config();

const products = [];

// Read CSV file
fs.createReadStream("products.csv")
  .pipe(csv())
  .on("data", (row) => {
    products.push({
      id: Number(row.id),
      name: row.name,
      img: row.img,
      price: Number(row.price),
      mrp: Number(row.mrp),
      rating: Number(row.rating),
      ratingTotal: Number(row.ratingTotal),
      discount: Number(row.discount),
      seller: row.seller,
      purl: row.purl
    });
  })
  .on("end", async () => {
    console.log("✅ CSV loaded, importing to MongoDB...");
    try {
      await mongoose.connect(process.env.MONGO_URI);
      await Product.insertMany(products);
      console.log("✅ Products imported successfully!");
      process.exit();
    } catch (error) {
      console.error("❌ Error importing products:", error);
      process.exit(1);
    }
  });
