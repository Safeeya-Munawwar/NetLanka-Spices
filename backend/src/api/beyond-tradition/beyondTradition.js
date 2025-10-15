import express from "express";
import multer from "multer";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer for multiple image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/beyondTradition";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const upload = multer({ storage });

// ✅ GET all BeyondTradition entries
router.get("/", async (req, res) => {
  try {
    const items = await prisma.beyondTradition.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single entry
router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.beyondTradition.findUnique({
      where: { id: req.params.id },
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST (create entry) – multiple images
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    const images = req.files ? req.files.map((f) => `/uploads/beyondTradition/${f.filename}`) : [];
    const newItem = await prisma.beyondTradition.create({
      data: { title, subtitle, description, images },
    });
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT (update entry)
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    const item = await prisma.beyondTradition.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ error: "Not found" });

    const images = req.files && req.files.length > 0
      ? req.files.map((f) => `/uploads/beyondTradition/${f.filename}`)
      : item.images;

    const updatedItem = await prisma.beyondTradition.update({
      where: { id: req.params.id },
      data: { title, subtitle, description, images },
    });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await prisma.beyondTradition.delete({ where: { id: req.params.id } });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
