import express from "express";
const router = express.Router();

const parseWeightToKg = (weight) => {
  if (!weight) return 1;
  if (typeof weight === "number") return weight;
  const w = weight.toString().toLowerCase().trim();
  if (w.endsWith("g")) return parseFloat(w) / 1000;
  if (w.endsWith("kg")) return parseFloat(w);
  const num = parseFloat(w);
  return isNaN(num) ? 1 : num;
};

// ✅ Get or create cart
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

// ✅ Update entire cart
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

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    const validItems = await Promise.all(
      (items || []).map(async (item) => {
        const priceLKR = Number(item.priceLKR) || 0;
        const priceUSD = Number(item.priceUSD) || 0;
        const quantity = Number(item.quantity) || 1;
        const weight = parseWeightToKg(item.weight);

        if (!item.productId || !item.name || isNaN(priceLKR) || isNaN(priceUSD))
          return null;

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

    res.json({ ...cart, items: validItems.filter(Boolean) });
  } catch (err) {
    console.error("Cart update failed:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

export default router;
