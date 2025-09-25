import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import cloudinary from "./config/cloudinary.js";

// Routes
import categoriesApi from "./api/categories/categories.js";
import registerApi from "./api/register/register.js";
import loginApi from "./api/login/login.js";
import productsApi from "./api/products/products.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // serve uploaded images

// Multer setup
const upload = multer({ dest: "uploads/" });

// Make prisma, cloudinary, and multer available in req
app.use((req, res, next) => {
  req.prisma = prisma;
  req.cloudinary = cloudinary;
  req.upload = upload;
  next();
});

// Routes
app.use("/api/register", registerApi);
app.use("/api/login", loginApi);
app.use("/api/categories", categoriesApi);
app.use("/api/products", productsApi);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
