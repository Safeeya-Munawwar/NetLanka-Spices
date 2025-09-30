import express from "express";
import fs from "fs";
const router = express.Router();

// Create Category
router.post("/", async (req, res) => {
  try {
    const upload = req.upload.single("image");
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const { title, description, active } = req.body;
      const prisma = req.prisma;
      const cloudinary = req.cloudinary;

      let imageUrl = "/1.jpeg";
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "spices_categories",
          });
          imageUrl = result.secure_url;
          fs.unlinkSync(req.file.path);
        } catch (uploadErr) {
          return res.status(500).json({ error: uploadErr.message });
        }
      }

      const slugify = (text) =>
        text.toString().toLowerCase().replace(/\s+/g, "-");
      
      const newCategory = await prisma.category.create({
        data: {
          title,
          slug: slugify(title),  // generate slug
          description,
          image: imageUrl,
          active: active === "true",
        },
      });      

      res.status(201).json(newCategory);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const prisma = req.prisma;
    const categories = await prisma.category.findMany({
      orderBy: { dateCreated: "desc" },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single category
router.get("/:id", async (req, res) => {
  try {
    const prisma = req.prisma;
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const upload = req.upload.single("image");
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const { title, description, active } = req.body;
      const prisma = req.prisma;
      const cloudinary = req.cloudinary;

      const dataToUpdate = {
        title,
        description,
        active: active === "true",
      };

      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "spices_categories",
          });
          dataToUpdate.image = result.secure_url;
          fs.unlinkSync(req.file.path);
        } catch (uploadErr) {
          return res.status(500).json({ error: uploadErr.message });
        }
      }

      const updatedCategory = await prisma.category.update({
        where: { id: req.params.id },
        data: dataToUpdate,
      });

      res.json(updatedCategory);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const prisma = req.prisma;
    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
