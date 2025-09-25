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
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
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

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email, role },
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Deactivate user (admin only)
// Deactivate user (admin only)
router.patch("/:id/deactivate", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { active: false },
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true }, // add createdAt
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// Activate user (admin only)
// Activate user
router.patch("/:id/activate", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });

    const user = await prisma.user.update({
      where: { id: req.params.id },  // use string directly
      data: { active: true },
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Account inactive or not found" });
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
