const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express()
const db = new sqlite3.Database('./todos.db')

// Middleware
app.use(cors())
app.use(express.json())

// Initialize the database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      completed BOOLEAN
    )
  `)
})

// Routes
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return res.status(500).send(err.message)
    res.json(rows)
  })
})

app.post('/api/todos', (req, res) => {
  const { title } = req.body
  db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false], function (err) {
    if (err) return res.status(500).send(err.message)
    res.json({ id: this.lastID, title, completed: false })
  })
})

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).send(err.message)
    res.sendStatus(200)
  })
})

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body
  db.run(
    'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id],
    function (err) {
      if (err) return res.status(500).send(err.message)
      res.sendStatus(200)
    },
  )
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
