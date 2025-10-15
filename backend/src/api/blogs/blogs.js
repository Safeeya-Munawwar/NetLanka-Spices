import express from "express";
import multer from "multer";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ----------------------- Multer setup -----------------------
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

// ----------------------- GET all blogs -----------------------
router.get("/", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------- GET single blog -----------------------
router.get("/:id", async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------- POST create blog -----------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, date, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ error: "Title, category, and description are required" });
    }

    const image = req.file ? `/uploads/blogs/${req.file.filename}` : "";
    const blogDate = date ? new Date(date) : new Date();

    const newBlog = await prisma.blog.create({
      data: {
        title,
        category,
        date: blogDate,
        description,
        image,
      },
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------- PUT update blog -----------------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, category, date, description } = req.body;
    const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const image = req.file ? `/uploads/blogs/${req.file.filename}` : blog.image;
    const blogDate = date ? new Date(date) : blog.date;

    const updatedBlog = await prisma.blog.update({
      where: { id: req.params.id },
      data: {
        title: title || blog.title,
        category: category || blog.category,
        date: blogDate,
        description: description || blog.description,
        image,
      },
    });

    res.json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------- DELETE blog -----------------------
router.delete("/:id", async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Remove image file from disk if exists
    if (blog.image) {
      const filePath = blog.image.replace(/^\//, ""); // remove leading slash
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
