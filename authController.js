const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { username, password, firstName, lastName, age, gender, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Пользователь с таким email уже существует.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
      role: role || "editor", // По умолчанию роль - редактор
    });

    await user.save();

    res.redirect("/login"); // Перенаправляем на страницу логина после успешной регистрации
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера.");
  }
};
