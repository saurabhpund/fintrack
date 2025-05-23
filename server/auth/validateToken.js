const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const verifyToken = (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            if(user.exp * 1000 < new Date().getTime()) {
                return res.status(401).json({ message: 'Token expired' });
            }else {
                req.user = user;
                res.status(200).json({ message: 'Token is valid' });
            }

        });
    }catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {verifyToken}