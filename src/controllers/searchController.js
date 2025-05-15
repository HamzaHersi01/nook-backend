const { getBookByIsbnFromOpenLib } = require('../utils/api/openLibraryService');
const {searchOpenLibForBook} = require('../utils/api/openLibraryService');
const {getAuthorFromOpenLib} = require('../utils/api/openLibraryService');
const axios = require('axios');

exports.searchBookByISBN = async (req, res) => {
  const { isbn } = req.params;

  try {
    const editionRes = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
    const editionData = editionRes.data;

    // Get the first cover ID (optional fallback to null)
    const coverId = editionData.covers?.[0] || null;

    // Extract work ID from works array
    const workKey = editionData.works?.[0]?.key; // e.g. "/works/OL123W"

    let description = '';
    let authorName = 'Unknown Author';

    // Fetch work details (description, author)
    if (workKey) {
      const workRes = await axios.get(`https://openlibrary.org${workKey}.json`);
      const workData = workRes.data;

      // Description can be a string or an object with `value`
      if (typeof workData.description === 'string') {
        description = workData.description;
      } else if (typeof workData.description === 'object') {
        description = workData.description.value;
      }

      // Fetch author name from author key (first one)
      const authorKey = workData.authors?.[0]?.author?.key;
      if (authorKey) {
        const authorRes = await axios.get(`https://openlibrary.org${authorKey}.json`);
        authorName = authorRes.data.name || 'Unknown Author';
      }
    }

    const bookResponse = {
      title: editionData.title,
      bookAuthor: authorName,
      cover: coverId
        ? `http://192.168.0.20:3001/covers/mediumCover/${coverId}`
        : null,
      workID: workKey?.replace('/works/', '') || null,
      first_publish_year: parseInt(
        editionData.publish_date?.match(/\d{4}/)?.[0] || '0'
      ),
      number_of_pages_median: editionData.number_of_pages || null,
      description: description || null,
    };

    res.json(bookResponse);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: 'Book not found for given ISBN.' });
  }
};

exports.searchBooksByTitle = async (req, res) => {
  const { item } = req.params;
  const data = await searchOpenLibForBook(item);
  const searchResponse = [];

  for (let doc of data.docs) {
    if (!doc.cover_i || !doc.cover_edition_key || !doc.key) continue;

    try {
      const editionRes = await axios.get(`https://openlibrary.org/books/${doc.cover_edition_key}.json`);
      const pageCount = editionRes.data.number_of_pages;

      if (!pageCount) continue;

      const searchItem = {
        title: doc.title,
        author_name: doc.author_name,
        cover_edition_key: doc.cover_i,
        //"/works/" to get just the work ID
        workID: doc.key.replace('/works/', ''),
        smallCoverURL: `http://192.168.0.20:3001/covers/mediumCover/${doc.cover_i}`,
        first_publish_year: doc.first_publish_year,
        number_of_pages_median: pageCount,
      };

      searchResponse.push(searchItem);
    } catch (error) {
      console.warn(`Skipping "${doc.title}" due to edition fetch error.`);
      continue;
    }
  }

  res.json(searchResponse);
};




exports.searchAuthor = async (req, res) =>{
  const { authorKey } = req.params;
  const authorSearchResponse = await getAuthorFromOpenLib(authorKey);
  //TODO: transform data if need be. unsure if i need this one to be honest but will keep for time being
  res.json(authorSearchResponse)
}