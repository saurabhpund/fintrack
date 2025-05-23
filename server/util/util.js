const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const db = require("../config/db");

exports.getEmailFromToken = (req) => {
    if (!req.headers.authorization) {
        throw new Error("Authorization header not found");
    }
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.decode(token, JWT_SECRET);
  return decode.email;
}