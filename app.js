const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' },
];

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/create', (req, res) => {
  res.render('create.html');
});

app.post('/create', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.redirect('/read');
});

app.get('/read', (req, res) => {
  res.render('read.html', { books });
});

app.get('/update/:book_id', (req, res) => {
  const bookId = parseInt(req.params.book_id);
  const book = books.find(b => b.id === bookId);
  res.render('update.html', { book });
});

app.post('/update/:book_id', (req, res) => {
  const bookId = parseInt(req.params.book_id);
  const book = books.find(b => b.id === bookId);
  book.title = req.body.title;
  book.author = req.body.author;
  res.redirect('/read');
});

app.delete('/delete/:book_id', (req, res) => {
  const bookId = parseInt(req.params.book_id);
  books = books.filter(b => b.id !== bookId);
  res.render('read.html', { books });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
