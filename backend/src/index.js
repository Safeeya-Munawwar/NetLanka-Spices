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

app.use("/api/register", registerApi);
app.use("/api/login", loginApi);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
