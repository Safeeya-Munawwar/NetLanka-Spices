import express from "express";
const router = express.Router();

// GET filtered products by category name
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // e.g., ?category=Herbs

    const products = await req.prisma.product.findMany({
      where: category
        ? {
            category: {
              title: {
                equals: category,
                mode: "insensitive", // case-insensitive
              },
            },
          }
        : {},
      include: { category: true },
    });

    res.json(products);
  } catch (err) {
    console.error("Failed to fetch filtered products:", err);
    res.status(500).json({ error: "Failed to fetch filtered products" });
  }
});

export default router;
