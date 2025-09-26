import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const prisma = req.prisma; // use Prisma from index.js
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });

    const usersCount = await prisma.user.count();
    const productsCount = await prisma.product.count();
    const categoriesCount = await prisma.category.count();

    res.json({ users: usersCount, products: productsCount, categories: categoriesCount });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
