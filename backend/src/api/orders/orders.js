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
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            weightKg: i.weightKg, // 👈 include this
            image: i.image,
          })),
        },        
      },
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
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
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update order status (Admin)
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await req.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

// Get orders for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userOrders = await req.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    res.json(userOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

// Delete an order (Admin)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await req.prisma.orderItem.deleteMany({
      where: { orderId: id },
    });
    await req.prisma.order.delete({
      where: { id },
    });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
