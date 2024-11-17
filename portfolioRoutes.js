const express = require("express");
const router = express.Router();
const Portfolio = require("../models/portfolio");

// Middleware для проверки роли администратора
function checkAdmin(req, res, next) {
  if (req.session.userRole !== "admin") {
    return res.status(403).send("Доступ запрещён.");
  }
  next();
}

// Получение данных для главной страницы
router.get("/", async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find(); // Получаем все записи
    res.render("home", {
      title: "Портфолио Астаны",
      portfolioItems,
      userRole: req.session.userRole
    });
  } catch (err) {
    console.error("Ошибка при загрузке данных:", err);
    res.status(500).send("Ошибка при загрузке данных.");
  }
});

// Добавление новой карусели
router.post("/add", checkAdmin, async (req, res) => {
  try {
    const { title, description, images } = req.body;

    // Создаём новую запись
    const newPortfolioItem = new Portfolio({
      title,
      description,
      images: images.split(",").map((img) => img.trim()),
    });
    await newPortfolioItem.save();
    res.redirect("/");
  } catch (err) {
    console.error("Ошибка при добавлении данных:", err);
    res.status(500).send("Ошибка при добавлении данных.");
  }
});

// Обновление карусели
router.post("/update/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images } = req.body;

    await Portfolio.findByIdAndUpdate(id, {
      title,
      description,
      images: images.split(",").map((img) => img.trim()),
      updatedAt: new Date(),
    });
    res.redirect("/");
  } catch (err) {
    console.error("Ошибка при обновлении данных:", err);
    res.status(500).send("Ошибка при обновлении данных.");
  }
});

// Удаление карусели
router.post("/delete/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await Portfolio.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Ошибка при удалении данных:", err);
    res.status(500).send("Ошибка при удалении данных.");
  }
});

module.exports = router;
