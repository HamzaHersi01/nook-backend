const { getWorkDetailsFromOpenLib, getEditionsOfBookFromOpenLib } = require('../utils/api/openLibraryService');

exports.getWorkDetails = async (req, res) => {
  const { workID } = req.params;

  try {
    const data = await getWorkDetailsFromOpenLib(workID);

    // Handle description 
    const description =
      typeof data.description === 'string'
        ? data.description
        : data.description?.value || 'No description available';

    // Get first cover ID
    const coverID = Array.isArray(data.covers) && data.covers.length > 0 ? data.covers[0] : null;

    // Format authorID safely
    const rawAuthorID = data.authors?.[0]?.author?.key || null;
    const authorID = rawAuthorID ? rawAuthorID.replace('/authors/', '') : null;

    const bookInfo = {
      title: data.title,
      description,
      cover: coverID
        ? `http://192.168.0.20:3001/covers/mediumCover/${coverID}`
        : null,
      created: data.created?.value || null,
      workID: workID, // Already stripped from frontend
      authorID: authorID,
      number_of_pages: data.number_of_pages

    };

    res.json(bookInfo);
  } catch (error) {
    console.error('Error fetching work details:', error.message);
    res.status(404).json({ error: 'Work not found or invalid format' });
  }
};

exports.getEditions = async (req, res) => {
  const { workID } = req.params;

  try {
    const editions = await getEditionsOfBookFromOpenLib(workID);
    res.json(editions);
  } catch (err) {
    console.error('Error fetching editions:', err.message);
    res.status(500).json({ error: 'Failed to fetch editions' });
  }
};
