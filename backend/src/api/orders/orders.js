import express from "express";
const router = express.Router();

// Create Order
// Create Order
router.post("/", async (req, res) => {
  const { userId, items, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    // Map items for Prisma
    const itemsForOrder = items.map(item => ({
      productId: item.productId,
      name: item.name || "Unknown Product",
      quantity: Number(item.quantity || 1),
      priceLKR: Number(item.priceLKR || 0),
      priceUSD: Number(item.priceUSD || 0),
      weightKg: Number(item.weightKg || 1),
      image: item.image || "",
    }));

    // Calculate totals
    const totalPriceLKR = itemsForOrder.reduce((sum, i) => sum + i.priceLKR * i.quantity, 0);
    const totalPriceUSD = itemsForOrder.reduce((sum, i) => sum + i.priceUSD * i.quantity, 0);

    const order = await req.prisma.order.create({
      data: {
        user: userId ? { connect: { id: userId } } : undefined,
        totalPriceLKR,
        totalPriceUSD,
        paymentMethod,
        status: "Pending",
        items: { create: itemsForOrder },
      },
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order creation failed:", err);
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
    console.error("Failed to fetch all orders:", err);
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
    console.error("Failed to update order status:", err);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

// Get orders for a specific user
// Get orders for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userOrders = await req.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: true, // <- fix here
        user: { select: { id: true, name: true, email: true } },
      },
    });
    res.json(userOrders);
  } catch (err) {
    console.error("Failed to fetch user orders:", err);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});



// Delete an order (Admin)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await req.prisma.orderItem.deleteMany({ where: { orderId: id } });
    await req.prisma.order.delete({ where: { id } });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
