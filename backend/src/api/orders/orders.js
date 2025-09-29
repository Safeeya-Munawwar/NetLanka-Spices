import express from "express";
const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  const { userId, items, totalPrice, paymentMethod } = req.body;

  if (!items || items.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  try {
    const order = await req.prisma.order.create({
      data: {
        userId,
        totalPrice: parseFloat(totalPrice),
        paymentMethod,
        status: "Pending",
        items: {
          create: items.map((i) => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order creation failed:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await req.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders by user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await req.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
