import express from "express";
const router = express.Router();

// Get user cart
// Get user cart (Safe Upsert)
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
    console.error("Error fetching/creating cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});


// Update user cart
// Update user cart
router.post("/:userId", async (req, res) => {
  const { prisma } = req;
  const { userId } = req.params;
  const { items } = req.body;

  try {
    // Ensure the cart exists (no duplicate create)
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    // Clear old items and insert new ones
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    const createdItems = await Promise.all(
      items.map((item) =>
        prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          },
        })
      )
    );

    res.json({ ...cart, items: createdItems });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});


export default router;
