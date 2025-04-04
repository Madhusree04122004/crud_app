const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'userdb',
  password: 'madhusree',
  port: 5432,
});

// CREATE USER
app.post('/users', async (req, res) => {
  try {
    const { name, password, age, dob, degree } = req.body;
    
    console.log("Received Data:", req.body); // Debugging Line

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, password, age, dob, degree) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, age, dob, degree',
      [name, hashedPassword, parseInt(age), dob, degree]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// READ USERS
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, age, dob, degree FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// UPDATE USER
app.put('/users/:id', async (req, res) => {
  try {
    const { name, password, age, dob, degree } = req.body;
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await pool.query(
      'UPDATE users SET name=$1, password=COALESCE($2, password), age=$3, dob=$4, degree=$5 WHERE id=$6 RETURNING id, name, age, dob, degree',
      [name, hashedPassword, age, dob, degree, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE USER
app.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
