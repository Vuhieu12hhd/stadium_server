const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.checkLogin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next({ message: 'No authorization header provided' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return next({ message: 'Token invalid' });
    }
    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;
    next();
  });
};
exports.checkAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next({ message: 'No authorization header provided' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return next({ message: 'Token invalid' });
    }
    if (decoded.userRole !== 'ADMIN') {
      return next({ message: 'You have not permission' });
    }
    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;
    next();
  });
};
