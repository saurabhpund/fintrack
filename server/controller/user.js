const db = require("../config/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { getEmailFromToken } = require('../util/util');
const pool = db.promise();

const getAllUser = async function (req, res) {
  db.connect(async (err) => {
    if (err) throw err;
    db.query("select * from users", (err, result) => {
      res.status(200).json(result);
    });
  });
};



const userAlreadyExists = async function (email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length > 0;
};

const updateUser = async function (req, res) {
        let fields = [], values = [];
        Object.entries(req.body).forEach(([key, value]) => {
            fields.push(`${key} = ?`);
            values.push(value);
        })
    
        try{
          const email = getEmailFromToken(req);
            console.log(fields.join(', '))
                db.execute(
                    `UPDATE users 
                    set ${fields.join(', ')} 
                    where  where email = ?`,
                     [...values, email],
                    (err, result) => {
                        if(err) throw err;
                        if (result.affectedRows > 0) {
                            res.status(200).json({message: "update successful"});
                        }
    
                    }
                );
        }catch(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"});
        }
};

const deleteUser = async function (req, res) {
  const email = getEmailFromToken(req);
  db.query("delete from users where email = ?", [email], (err, result) => {
    if (err) throw err;
    result.affectedRows === 0
      ? res.status(404).json({ message: "No matching user found" })
      : res.status(200).json({ message: "User deleted successfully" });
  });
};

const getEmail = async function (req, res) {
  const email = getEmailFromToken(req);
  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ email });
};

module.exports = { getAllUser, userAlreadyExists, deleteUser, getEmail };
