import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// POST Bulk Order Request
router.post("/", async (req, res) => {
    const { name, email, phone, company, message, productList, quantity, weight } = req.body;
  
    if (!name || !email || !message)
      return res.status(400).json({ message: "Name, Email and Message are required" });
  
    try {
      // Save to MongoDB
      const bulkOrder = await req.prisma.bulkOrder.create({
        data: { name, email, phone, company, message, productList, quantity, weight },
      });
  
      // Send Email to Admin
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: `New Bulk Order Request from ${name}`,
        html: `
          <h3>Bulk Order Request Details</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Company:</b> ${company || "N/A"}</p>
          <p><b>Product:</b> ${productList || "N/A"}</p>
          <p><b>Quantity:</b> ${quantity || "N/A"}</p>
          <p><b>Weight:</b> ${weight || "N/A"}</p>
          <p><b>Message:</b><br>${message}</p>
          <p><i>Sent via NetLanka Spices Website</i></p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({ message: "Bulk order request sent successfully!", bulkOrder });
    } catch (err) {
      console.error("Bulk order creation failed:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });  

// GET all bulk orders (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await req.prisma.bulkOrder.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bulk orders" });
  }
});

// PATCH /bulk-orders/:id/status
router.patch("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!["pending", "confirmed", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
  
    try {
      const updatedOrder = await req.prisma.bulkOrder.update({
        where: { id },
        data: { status },
      });
  
      res.json(updatedOrder);
    } catch (err) {
      console.error("Failed to update bulk order status:", err.message);
      res.status(500).json({ message: "Failed to update status" });
    }
  });
  

export default router;
