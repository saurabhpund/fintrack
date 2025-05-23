const { userAlreadyExists } = require("../controller/user");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const pool = db.promise();

module.exports = async function (req, res, next) {
  const { email, password } = req.body;
  // check user exist 
  if (!(await userAlreadyExists(email))) {
    return res.status(404).json({ message: "Email not found" });
  }
  const [user] = await pool.query("select password from users where email = ? limit 1", [
    email,
  ]);

  // check password match
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    res.status(401).json({ message: "invalid password" });
    return;
  }

  const token = jwt.sign({email} , JWT_SECRET, { expiresIn: "8h" });
  res.status(200).json({ message: "Login successful", token});
};
