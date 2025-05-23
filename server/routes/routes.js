const express = require('express');
const signup = require('../auth/signup');
const { getAllUser, deleteUser, getEmail } = require('../controller/user');
const { addTransaction, getTransaction, updateTransaction, deleteTransaction } = require('../controller/transaction');
const login = require('../auth/login');
const router = express.Router();   
const authenticateUser = require('../middleware/authMiddleware');
const { getCategorizedTransaction, getTransactionStats, getAvgStats,  } = require('../service/transactionService');
const { verifyToken } = require('../auth/validateToken');
const { getEmailFromToken } = require('../util/util');


router.get('/', async function (req, res){res.json({message: 'Welcome to the Financial Tracking API!'});});
router.post('/auth/signup', signup, login);
router.post('/auth/login', login);
router.get('/getusers', authenticateUser, getAllUser);
router.delete('/deleteuser', authenticateUser, deleteUser);
router.post('/addtransaction',authenticateUser,addTransaction);
router.get('/gettransaction', authenticateUser,getTransaction);
router.post('/updatetransaction/',authenticateUser, updateTransaction);
router.delete('/deletetransaction', authenticateUser,deleteTransaction);    

router.get('/getCategorizedTransaction', authenticateUser, getCategorizedTransaction);
router.get('/getTransactionStats', authenticateUser, getTransactionStats);
router.get('/getAvgStats', authenticateUser, getAvgStats);

router.post('/verify', verifyToken);
router.get('/getEmail', authenticateUser,  getEmail);

module.exports = router;