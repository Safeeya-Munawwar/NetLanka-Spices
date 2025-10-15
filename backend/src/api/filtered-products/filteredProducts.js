import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const products = await req.prisma.product.findMany({
      where: category
        ? {
            category: {
              slug: { equals: category, mode: "insensitive" },
            },
          }
        : {},
      select: {
        id: true,
        title: true,
        image: true,
        priceLKR: true,
        priceUSD: true,
        category: true,
      },
    });    
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch filtered products" });
  }
});

export default router;
