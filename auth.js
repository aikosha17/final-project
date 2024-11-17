const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");

// Страница регистрации
router.get("/register", (req, res) => {
  res.render("register", { title: "Регистрация" });
});

// Обработка формы регистрации
router.post("/register", registerUser);

module.exports = router;
