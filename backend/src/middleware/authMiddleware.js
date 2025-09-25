const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || !user.active) {
      return res.status(403).json({ msg: "Account inactive or not found" });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = authMiddleware;
