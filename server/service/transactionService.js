const db = require('../config/db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const getCategorizedTransaction = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, JWT_SECRET);
        const month = req.body.month || new Date().getMonth() + 1;
        db.execute(
            "Select category, sum(amount) as total from transactions where user_id = (SELECT id FROM users WHERE email = ?) and transaction_type = 'expense' and MONTH(transaction_date) = ?  group by category", [user.email, month], (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                }
                res.status(200).json(result);
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getTransactionStats = (req, res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, JWT_SECRET);
        const month = req.body.month || new Date().getMonth() + 1;
        db.execute(
            "select transaction_type, sum(amount) as total from transactions where user_id = (select id from users where email = ?) and Month(transaction_date) = ? group by transaction_type", [user.email, month], (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                }
                res.status(200).json(result);
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAvgStats = (req, res,) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, JWT_SECRET);
        const month = req.body.month || new Date().getMonth() + 1;
        db.execute(
            `select 
            transaction_type, count(transaction_type) as count, 
            sum(amount) / count(Distinct Date(transaction_date)) as average, sum(amount) as total
            from transactions 
            where user_id = (select id from users where email = ?) and Month(transaction_date) = ? 
            group by transaction_type`, [user.email, month], (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                }
                res.status(200).json(result);
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getCategorizedTransaction, getTransactionStats, getAvgStats};