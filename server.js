const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
let books = [];
let nextId = 1;

app.use(express.json());

function validateBook(body) {
  if (
    !body ||
    typeof body.title !== 'string' ||
    !body.title.trim() ||
    typeof body.author !== 'string' ||
    !body.author.trim()
  ) {
    return null;
  }

  return {
    title: body.title.trim(),
    author: body.author.trim(),
  };
}

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const details = validateBook(req.body);

  if (!details) {
    return res.status(400).json({ error: 'title and author are required strings.' });
  }

  const book = { id: nextId++, ...details };
  books.push(book);
  return res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  const details = validateBook(req.body);

  if (!details) {
    return res.status(400).json({ error: 'title and author are required strings.' });
  }

  books[bookIndex] = { id, ...details };
  return res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  books.splice(bookIndex, 1);
  return res.status(204).send();
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }

  return next(err);
});

app.listen(port, () => {
  console.log(`Books API listening on http://localhost:${port}`);
});