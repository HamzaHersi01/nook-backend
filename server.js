const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const booksRoutes = require('./src/routes/search.js');
const worksRoutes = require('./src/routes/works.js')
const coversRoutes = require('./src/routes/covers.js')

const PORT = process.env.PORT
const app = express()

app.use(express.json());
app.get('/', (req, res) =>{
  res.send("hello world")
})

app.use('/search', booksRoutes);
app.use('/works/', worksRoutes);
app.use('/covers/', coversRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});