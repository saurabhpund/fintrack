// auth/signup.js
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { userAlreadyExists } = require("../controller/user");

module.exports = async function (req, res, next) {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    if (await userAlreadyExists(email)) {
      return res.status(409).json({ message: "User already exists" });
    }
    db.query(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullName, email, hash]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
