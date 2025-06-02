const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { getEmailFromToken } = require("../util/util");

const JWT_SECRET = process.env.JWT_SECRET;
const addTransaction = async (req, res) => {
  const {
    amount,
    transaction_type,
    category,
    note,
    payee,
    date,
    time,
    paymentType,
  } = req.body;
  if (!amount || !transaction_type || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const email = getEmailFromToken(req);
    db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return res.status(500).json({ message: "User fetch failed" });
        const userId = results[0].id;

        db.query(
          "INSERT INTO transactions(user_id, amount, transaction_type, category, note, payee, payment_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [userId, amount, transaction_type, category, note, payee, paymentType],
          (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: "insertion successful" });
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTransaction = async (req, res) => {
  const email = getEmailFromToken(req);

  try {
    const query = `
      SELECT 
        t.id,
        t.amount,
        t.transaction_type,
        t.transaction_date,
        t.category,
        t.note,
        t.payee,
        t.payment_type
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      WHERE u.email = ?
      ORDER BY t.transaction_date DESC
    `;

    db.execute(query, [email], (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Database query failed" });
      }

      res.status(200).json(results);
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateTransaction = async (req, res) => {
  const transactionId = req.query.id;
  let fields = [],
    values = [];
  Object.entries(req.body).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.decode(token, JWT_SECRET);
    const email = decode.email;
    console.log(fields.join(", "));
    db.execute(
      `UPDATE transactions 
                set ${fields.join(", ")} 
                where id = ? and user_id = (select id from users where email = ?)`,
      [...values, transactionId, email],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "update successful" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.query.id;
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.decode(token, JWT_SECRET);
    const email = decode.email;
    db.execute(
      "DELETE FROM transactions WHERE id =? and user_id = (select id from users where email =?)",
      [transactionId, email],
      (err, result) => {
        if (err) throw err;

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "No matching transaction found" });
        }

        res.status(200).json({ message: "deletion successful" });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
