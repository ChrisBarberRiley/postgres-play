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
  try {
    const { rowCount, rows } = await pool.query(
      'INSERT INTO todo (description, done) VALUES ($1, $2) RETURNING *',
      [req.body.description, false],
    );

    if (rowCount === 0) {
      res.json({
        message: 'Failed to insert todo',
      });
    } else {
      res.json({
        message: 'Successfully added todo',
        data: rows[0],
      });
    }
  } catch (e) {
    res.json(e.message);
    console.log(e.message);
  }
});

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todo');
    res.json({
      data: rows,
    });
  } catch (e) {
    res.json(e.message);
    console.log(e.message);
  }
});

// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { rowCount, rows } = await pool.query(
      'SELECT * FROM todo WHERE id = $1',
      [req.params.id],
    );
    if (rowCount === 0) {
      res.json({
        message: 'No todo found',
      });
    } else {
      res.json({
        message: 'Todo found',
        data: rows[0],
      });
    }
  } catch (e) {
    res.json(e.message);
    console.log(e.message);
  }
});

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { rowCount, rows } = await pool.query(
      'UPDATE todo SET description = $1, done = $2 WHERE id = $3 RETURNING *',
      [req.body.description, req.body.done, req.params.id],
    );
    if (rowCount === 0) {
      res.json({
        message: 'No todo found',
      });
    } else {
      res.json({
        message: 'Successfully updated todo',
        data: rows[0],
      });
    }
  } catch (e) {
    console.log(e.message);
    res.json(e.message);
  }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM todo WHERE id = $1 RETURNING *',
      [req.params.id],
    );
    if (rowCount === 0) {
      res.json({
        message: 'No todo found',
      });
    } else {
      res.json({
        message: 'Successfully deleted todo',
      });
    }
  } catch (e) {
    console.log(e.message);
    res.json(e.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
