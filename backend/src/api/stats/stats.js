const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../../middleware/authMiddleware");
const prisma = new PrismaClient();

router.get("/", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
  
    try {
      const usersCount = await prisma.user.count();
  
      res.json({ 
        users: usersCount,
        products: 0,
        categories: 0,
        orders: 0,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
   

module.exports = router;
