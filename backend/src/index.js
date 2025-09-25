const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Import APIs
const registerApi = require("./api/register/register");
const loginApi = require("./api/login/login");
const usersApi = require("./api/users/users");
const statsApi = require("./api/stats/stats");

app.use("/api/register", registerApi);
app.use("/api/login", loginApi);
app.use("/api/users", usersApi);
app.use("/api/stats", statsApi);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
