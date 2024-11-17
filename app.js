const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { registerUser } = require("./controllers/authController");
const portfolioRoutes = require("./routes/portfolioRoutes");
const User = require("./models/User");

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Подключение MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("База данных подключена"))
  .catch((err) => console.error(err));

// Middleware для проверки аутентификации
function checkAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

// Маршрут по умолчанию: перенаправление на регистрацию
app.get("/", (req, res) => {
  res.redirect("/register");
});

// Маршрут регистрации
app.get("/register", (req, res) => {
  res.render("register", { title: "Регистрация" });
});

app.post("/register", registerUser);

// Маршрут логина
app.get("/login", (req, res) => {
  res.render("login", { title: "Логин" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Пользователь не найден");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Неверный пароль");
    }

    req.session.userId = user._id;
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
});

// Главная страница с портфолио (доступна только после авторизации)
app.get("/home", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      throw new Error("Пользователь не найден.");
    }

    console.log("Роль пользователя:", user.role);

    // Передаём данные пользователя и роль
    res.render("home", {
      title: "Портфолио Астаны",
      user,
      userRole: user.role,
      portfolioItems: await require("./models/portfolio").find()
    });
  } catch (err) {
    console.error("Ошибка при загрузке главной страницы:", err.message);
    res.status(500).send("Ошибка при загрузке главной страницы.");
  }
});

// Выход
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Ошибка выхода");
    }
    res.redirect("/login");
  });
});

// Подключение маршрутов для портфолио
app.use("/", portfolioRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
