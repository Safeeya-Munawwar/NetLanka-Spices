import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ CREATE Contact
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const contact = await prisma.contact.create({
      data: { name, email, phone, message },
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Failed to create contact" });
  }
});

// ✅ READ All Contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// ✅ READ Single Contact
router.get("/:id", async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id },
    });
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Error fetching contact" });
  }
});

// ✅ UPDATE Contact
router.put("/:id", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const updated = await prisma.contact.update({
      where: { id: req.params.id },
      data: { name, email, phone, message },
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Error updating contact" });
  }
});

// ✅ DELETE Contact
router.delete("/:id", async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: req.params.id } });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Error deleting contact" });
  }
});

export default router;
