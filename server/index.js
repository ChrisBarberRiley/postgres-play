import cors from 'cors';
import express from 'express';
import pool from './db.js';

const app = express();

// Middleware //
// Enable CORS
app.use(cors());

// json
app.use(express.json());

// Routes //
// create a todo
app.post('/todos', async (req, res) => {
  const result = await pool.query(
    'INSERT INTO todo (description, done) VALUES ($1, $2)',
    [req.body.description, false],
  );

  console.log('result', result);
  res.json('Create todo');
});

// get all todos
app.get('/todos', (req, res) => {
  res.json('Get all todos');
});

// get a todo
app.get('/todos/:id', (req, res) => {
  res.json('Get a todo');
});

// update a todo
app.put('/todos/:id', (req, res) => {
  res.json('Update a todo');
});

// delete a todo
app.delete('/todos/:id', (req, res) => {
  res.json('Delete a todo');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
