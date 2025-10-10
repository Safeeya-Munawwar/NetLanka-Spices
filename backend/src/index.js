import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import cloudinary from "./config/cloudinary.js";
import registerApi from "./api/register/register.js";
import loginApi from "./api/login/login.js";
import categoriesApi from "./api/categories/categories.js";
import productsApi from "./api/products/products.js";
import usersApi from "./api/users/users.js";
import statsApi from "./api/stats/stats.js";
import ordersApi from "./api/orders/orders.js";
import filteredProductsAPi from "./api/filtered-products/filteredProducts.js";
import cartsApi from "./api/carts/carts.js";
import searchApi from "./api/search/search.js";


dotenv.config();

const app = express();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use((req, res, next) => {
  req.prisma = prisma;
  req.cloudinary = cloudinary;
  req.upload = upload;
  next();
});
app.use("/api/register", registerApi);
app.use("/api/login", loginApi);
app.use("/api/categories", categoriesApi);
app.use("/api/products", productsApi);
app.use("/api/users", usersApi);
app.use("/api/stats", statsApi);
app.use("/api/orders", ordersApi);
app.use("/api/filtered-products", filteredProductsAPi);
app.use("/api/carts", cartsApi);


app.use("/api/search", searchApi);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
