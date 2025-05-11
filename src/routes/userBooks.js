const express = require('express');
const router = express.Router();
const { UserBook, Book } = require('../models');
const authenticateUser = require('../middleware/auth');

// Add a book to user's collection
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { bookIsbn, status } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!bookIsbn) {
      return res.status(400).json({ error: 'Book ISBN is required' });
    }

    // Check if book exists in Books table
    const bookExists = await Book.findByPk(bookIsbn);
    if (!bookExists) {
      return res.status(404).json({ error: 'Book not found in database' });
    }

    // Check if user already has this book
    const existingUserBook = await UserBook.findOne({
      where: { userId, bookIsbn }
    });

    if (existingUserBook) {
      return res.status(409).json({ 
        error: 'Book already exists in your collection',
        userBook: existingUserBook 
      });
    }

    // Create new UserBook entry
    const userBook = await UserBook.create({
      userId,
      bookIsbn,
      status: status || 'to-read', // Default status
      addedAt: new Date()
    });

    res.status(201).json({
      message: 'Book added to your collection',
      userBook: {
        id: userBook.id,
        bookIsbn: userBook.bookIsbn,
        status: userBook.status,
        addedAt: userBook.addedAt
      }
    });

  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Failed to add book to collection' });
  }
});

module.exports = router;