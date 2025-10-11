import express from "express";
const router = express.Router();

// 🔍 Unified Search Endpoint
router.get("/", async (req, res) => {
  const prisma = req.prisma;
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Case-insensitive search in products and categories
    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10, // limit results
      }),
      prisma.category.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
    ]);

    res.json({ products, categories });
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> c79935df29b4f33658f07a730f63486072312712
