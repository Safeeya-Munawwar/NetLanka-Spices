import express from "express";
const router = express.Router();

// Helper: parse user input to KG
const parseWeightToKg = (weight) => {
  if (!weight) return 1;           // default 1 kg
  if (typeof weight === "number") return weight;
  const w = weight.toString().toLowerCase().trim();
  if (w.endsWith("g")) return parseFloat(w) / 1000;
  if (w.endsWith("kg")) return parseFloat(w);
  // if just number, assume grams if <100, else kg
  const num = parseFloat(w);
  return num > 100 ? num : num / 1000;
};


// Get cart (safe upsert)
router.get("/:userId", async (req, res) => {
  const { prisma } = req;
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: { items: true },
    });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Update cart
router.post("/:userId", async (req, res) => {
  const { prisma } = req;
  const { userId } = req.params;
  const { items } = req.body;

  try {
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    // Delete old items
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Only create items with valid numbers
    const createdItems = await Promise.all(
      (items || []).map((item) => {
        const priceLKR = Number(item.priceLKR);
        const priceUSD = Number(item.priceUSD);
        const quantity = Number(item.quantity);
        const weight = parseWeightToKg(item.weight);

        if (
          !item.productId ||
          !item.name ||
          isNaN(priceLKR) ||
          isNaN(priceUSD) ||
          isNaN(quantity) ||
          isNaN(weight)
        ) {
          console.warn("Skipping invalid cart item:", item);
          return null;
        }

        return prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            name: item.name,
            priceLKR,
            priceUSD,
            quantity,
            weight,
            image: item.image || "",
          },
        });
      })
    );

    // Remove nulls
    const validItems = createdItems.filter(Boolean);

    res.json({ ...cart, items: validItems });
  } catch (err) {
    console.error("Cart update failed:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});


export default router;
