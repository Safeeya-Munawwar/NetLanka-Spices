import express from "express";
import multer from "multer";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/blogs";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const upload = multer({ storage });

// ✅ GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single blog by id
router.get("/:id", async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST (create blog)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, date, description } = req.body;
    const image = req.file ? `/uploads/blogs/${req.file.filename}` : "";
    const newBlog = await prisma.blog.create({
      data: { title, category, date, description, image },
    });
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT (update blog)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, category, date, description } = req.body;
    const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    let image = blog.image;
    if (req.file) {
      image = `/uploads/blogs/${req.file.filename}`;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: req.params.id },
      data: { title, category, date, description, image },
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE blog
router.delete("/:id", async (req, res) => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
