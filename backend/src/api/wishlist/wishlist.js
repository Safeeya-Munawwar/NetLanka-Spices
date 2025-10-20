import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Get wishlist by userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
    });

    res.json(wishlist);
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// ✅ Add item to wishlist
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

   // POST /api/wishlist
const newItem = await prisma.wishlist.create({
  data: { userId, productId },
  include: { product: true } // optional but useful
});

res.json(newItem); // must include newItem.id

  } catch (error) {
    console.error("❌ Error adding to wishlist:", error);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

// ✅ Toggle wishlist (add/remove)
router.post("/toggle", async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId are required" });
  }

  try {
    // Check if item exists
    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      return res.json({ message: "Removed from wishlist", action: "removed" });
    }

    const added = await prisma.wishlist.create({
      data: { userId, productId },
    });

    res.json({ message: "Added to wishlist", action: "added", added });
  } catch (error) {
    console.error("❌ Error toggling wishlist:", error);
    res.status(500).json({ error: "Failed to toggle wishlist" });
  }
});

// ✅ Remove item from wishlist
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.wishlist.delete({
      where: { id },
    });

    res.json({ message: "Item removed" });
  } catch (error) {
    console.error("❌ Error removing wishlist item:", error);
    res.status(500).json({ error: "Failed to remove wishlist item" });
  }
});

export default router;
