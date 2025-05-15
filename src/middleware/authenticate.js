const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Load secret from environment

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get Authorization header

  // If the header is missing or not a Bearer token, reject request
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract token from the header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user data to request object
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    // Token is invalid or expired
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
