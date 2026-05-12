const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Token lo header se
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token nahi hai, login karo' });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token invalid hai' });
  }
};