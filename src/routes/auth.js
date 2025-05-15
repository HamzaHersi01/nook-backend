// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

// Import the User model
const { User } = require('../../models');

// Get JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// =====================
// Signup Route
// =====================
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    await User.create({ email, passwordHash });

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// =====================
// Login Route
// =====================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check credentials
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Debug logs (optional)
    console.log('User ID:', user.id);
    console.log('User email:', user.email);
    console.log('Token:', token);

    // Respond with token and user info
    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
