const db = require("../config/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
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
    
        const token = req.headers.authorization.split(' ')[1];
        try{
            const decode = jwt.decode(token, JWT_SECRET);
            const email = decode.email;
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
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.decode(token, JWT_SECRET);
  const email = decode.email;
  db.query("delete from users where email = ?", [email], (err, result) => {
    if (err) throw err;
    result.affectedRows === 0
      ? res.status(404).json({ message: "No matching user found" })
      : res.status(200).json({ message: "User deleted successfully" });
  });
};

module.exports = { getAllUser, userAlreadyExists, deleteUser };
