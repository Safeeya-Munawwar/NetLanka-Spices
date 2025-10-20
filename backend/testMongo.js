import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const uri = process.env.DATABASE_URL;

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
