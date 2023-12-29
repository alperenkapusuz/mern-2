const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkTokenAndRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      const userRole = decoded.userId;
      User.findById(userRole).then((user) => {
        if (requiredRole.includes(user.role)) {
          next();
        } else {
          return res.status(401).json({ message: 'Access denied' });
        }
      });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = checkTokenAndRole;

// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization').split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied' });
//   }
//   try {
//     const decoded = jwt.verify(token, 'your-secret-key');
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = verifyToken;
