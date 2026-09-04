const express = require('express')
const cors = require('cors')
const pool = require('./db/database')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

pool.query('SELECT NOW()', (error, result) => {
  if (error) {
    console.error('Error al conectar con PostgreSQL:', error)
  } else {
    console.log('Conección con PostgreSQL exitosa')
    console.log('Hora de PostgreSQL:', result.rows[0].now)
  }
})

app.post('/api/recipes', async (req, res) => {
  try {
    const { name, description, ingredients, instructions } = req.body

    const result = await pool.query(
      `INSERT INTO recipes (name,description, ingredients, instructions)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, description, ingredients, instructions]
    )
    res.status(201).json(result.rows[0])
  } catch (error){
    console.error('Error al crear las recetas:', error)
    res.status(500).json({
      error: 'Error al crear las recetas'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})