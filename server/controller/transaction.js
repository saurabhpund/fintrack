const db = require('../config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const addTransaction = async(req, res) => {
    const {amount, type, category, description} =  req.body;
    if(!amount ||!type ||!category ){
        return res.status(400).json({message: "Missing required fields"});
    }
    const token = req.headers.authorization.split(' ')[1];
    try{
        const decode = jwt.decode(token, JWT_SECRET);
        const email = decode.email;
            db.query('INSERT INTO transactions(amount, transaction_type, category, descriptions, user_id) values (?, ?, ?, ?, (select id from users where email = ? limit 1))', [amount, type, category, description, email],
                (err, result) => {
                    if(err) throw err;
                    if (result.affectedRows > 0){
                        res.status(200).json({message: "insertion successful"});
                    }

                }
            );
         
  

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"});
    }
}

const getTransaction = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, JWT_SECRET);
    const email = decode.email;
    try{
        db.execute("select t.amount, t.transaction_type, t.transaction_date, t.descriptions, t.id from transactions t join users u on t.user_id = u.id where u.email = ?",[email], (err, result) => {
            res.status(200).json(result);
    });
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"});
    }
}

const updateTransaction = async(req, res) => {   
    const transactionId = req.query.id;
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
                `UPDATE transactions 
                set ${fields.join(', ')} 
                where id = ? and user_id = (select id from users where email = ?)`,
                 [...values, transactionId, email],
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
}

const deleteTransaction = async(req, res) => {
    try{
        const transactionId = req.query.id;
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token, JWT_SECRET);
        const email = decode.email;
            db.execute('DELETE FROM transactions WHERE id =? and user_id = (select id from users where email =?)', [transactionId, email],
                (err, result) => {
                    if(err) throw err;

                    if (result.affectedRows === 0) {
                        return res.status(404).json({ message: "No matching transaction found" });
                    }

                    res.status(200).json({message: "deletion successful"});
                }
            );
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {getTransaction, addTransaction, updateTransaction, deleteTransaction};