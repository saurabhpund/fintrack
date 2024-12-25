const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  
    req.user = decoded; 
    next();  
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;