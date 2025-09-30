import express from "express";
const router = express.Router();

// Get user cart
router.get("/:userId", async (req, res) => {
  const { prisma } = req;
  const { userId } = req.params;

  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Update user cart
router.post("/:userId", async (req, res) => {
  const { prisma } = req;
  const { userId } = req.params;
  const { items } = req.body;

  try {
    // Get or create cart
    let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // Delete old items
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Add new items
    const createdItems = await Promise.all(
      items.map(item =>
        prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId, // frontend must send this
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
    console.error(err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

export default router;
