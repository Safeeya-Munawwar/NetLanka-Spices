import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await req.prisma.product.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await req.prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await req.cloudinary.uploader.upload(req.file.path, {
        folder: "spices_products",
      });
      imageUrl = result.secure_url;
    }
    const newProduct = await req.prisma.product.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        priceLKR: parseFloat(req.body.priceLKR),
        priceUSD: parseFloat(req.body.priceUSD),
        quantity: parseInt(req.body.quantity),
        image: imageUrl,
        active: req.body.active === "true" || req.body.active === true,
        categoryId: req.body.categoryId,
      },
    });    
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = req.body.existingImage || "";

    if (req.file) {
      const result = await req.cloudinary.uploader.upload(req.file.path, {
        folder: "spices_products",
      });
      imageUrl = result.secure_url;
    }
    const updatedProduct = await req.prisma.product.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        description: req.body.description,
        priceLKR: parseFloat(req.body.priceLKR),
        priceUSD: parseFloat(req.body.priceUSD),
        quantity: parseInt(req.body.quantity),
        image: imageUrl,
        active: req.body.active === "true" || req.body.active === true,
        categoryId: req.body.categoryId,
      },
    });    
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await req.prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
