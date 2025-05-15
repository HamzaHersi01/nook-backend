const express = require('express');
const router = express.Router();
const { UserBook } = require('../../models'); 
const authenticateUser = require('../middleware/authenticate');
const axios = require('axios');

// Add a book to user's collection
router.post('/addBook', authenticateUser, async (req, res) => {
  const { workID, status } = req.body;
  const userId = req.user.id;

  if (!workID || !status) {
    return res.status(400).json({ error: 'Work ID and status are required' });
  }

  try {
    const [userBook, created] = await UserBook.findOrCreate({
      where: { userId, workID },
      defaults: {
        status,
        addedAt: new Date(),
      },
    });

    if (!created) {
      userBook.status = status;
      await userBook.save();
    }

    res.status(200).json({
      message: created ? 'Book added to collection' : 'Book status updated',
      userBook,
    });
  } catch (error) {
    console.error('Error upserting book:', error);
    res.status(500).json({ error: 'Failed to add or update book' });
  }
});

// GET /userBooks/myBooks
router.get('/myBooks', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const userBooks = await UserBook.findAll({ where: { userId } });

    const enrichedBooks = await Promise.all(
      userBooks.map(async (userBook) => {
        try {
          const workID = userBook.workID;
          const { data } = await axios.get(`http://192.168.0.20:3001/works/getBookDetails/${workID}`);

          return {
            id: userBook.id,
            workID,
            status: userBook.status,
            addedAt: userBook.addedAt,
            title: data.title,
            cover: data.cover,
            number_of_pages_median: data.number_of_pages_median,
            first_publish_year: data.created ? new Date(data.created).getFullYear() : 'N/A',
          };
        } catch (err) {
          console.error(`Error fetching details for ${userBook.workID}:`, err.message);
          return {
            id: userBook.id,
            workID: userBook.workID,
            status: userBook.status,
            title: '[Details unavailable]',
          };
        }
      })
    );

    res.json(enrichedBooks);
  } catch (error) {
    console.error('Error fetching user books:', error);
    res.status(500).json({ error: 'Failed to fetch user books' });
  }
});


module.exports = router;
