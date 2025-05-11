const express = require('express');
const router = express.Router();
const { UserBook } = require('../../models');
const authenticateUser = require('../middleware/authenticate.js');

// Update reading progress
router.put('/:isbn', authenticateUser, async (req, res) => {
  try {
    const { currentPage, totalPages } = req.body;
    const { isbn } = req.params;

    const userBook = await UserBook.findOne({
      where: { 
        userId: req.user.id, 
        bookIsbn: isbn 
      }
    });

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in your library' });
    }

    // Validate input
    if (currentPage && totalPages && currentPage > totalPages) {
      return res.status(400).json({ error: 'Current page cannot exceed total pages' });
    }

    await userBook.updateProgress(currentPage, totalPages);
    
    res.json({
      success: true,
      progress: userBook.progressPercentage,
      status: userBook.status,
      lastReadAt: userBook.lastReadAt
    });

  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get progress for a book
router.get('/:isbn', authenticateUser, async (req, res) => {
  try {
    const userBook = await UserBook.findOne({
      where: {
        userId: req.user.id,
        bookIsbn: req.params.isbn
      },
      attributes: ['currentPage', 'totalPages', 'status', 'lastReadAt']
    });

    if (!userBook) {
      return res.status(404).json({ error: 'No progress data found' });
    }

    res.json({
      currentPage: userBook.currentPage,
      totalPages: userBook.totalPages,
      progressPercentage: userBook.progressPercentage,
      status: userBook.status,
      lastReadAt: userBook.lastReadAt
    });

  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

module.exports = router;