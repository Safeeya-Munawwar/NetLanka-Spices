import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/services";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const upload = multer({ storage });

// ✅ GET all services
router.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST (create service)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, buttonText, link } = req.body;
    const image = req.file ? `/uploads/services/${req.file.filename}` : "";
    const newService = await prisma.service.create({
      data: { title, description, image, buttonText, link },
    });
    res.json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE service
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      const { title, description, buttonText, link } = req.body;
      const updateData = { title, description, buttonText, link };
  
      if (req.file) {
        updateData.image = `/uploads/services/${req.file.filename}`;
      }
  
      const updated = await prisma.service.update({
        where: { id: req.params.id },
        data: updateData,
      });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;
