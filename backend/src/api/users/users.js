const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../../middleware/authMiddleware");
const prisma = new PrismaClient();

// Get all users (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update user (admin only)
router.patch("/:id", authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied" });
      }
  
      const { name, email, role } = req.body;
  
      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: req.params.id },
        data: { name, email, role },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });  

// Delete user (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
