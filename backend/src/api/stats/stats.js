import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const prisma = req.prisma;

    if (req.user.role !== "admin")
      return res.status(403).json({ msg: "Access denied" });

    // Total counts
    const usersCount = await prisma.user.count();
    const productsCount = await prisma.product.count();
    const categoriesCount = await prisma.category.count();
    const ordersCount = await prisma.order.count();
    const bulkOrdersCount = await prisma.bulkOrder.count();
    const messagesCount = await prisma.contact.count();

    // New / pending counts
    const newOrdersCount = await prisma.order.count({ where: { status: "Pending" } });
    const newBulkOrdersCount = await prisma.bulkOrder.count({ where: { status: "pending" } });
    const newMessagesCount = await prisma.contact.count({ where: { read: false } }); // make sure 'read' boolean exists in Contact model

    res.json({
      users: usersCount,
      products: productsCount,
      categories: categoriesCount,
      orders: ordersCount,
      bulkOrders: bulkOrdersCount,
      messages: messagesCount,
      newOrders: newOrdersCount,        // 👈 new pending orders
      newBulkOrders: newBulkOrdersCount, // 👈 new pending bulk orders
      newMessages: newMessagesCount,     // 👈 unread messages
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

export default router;
