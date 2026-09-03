const express = require('express')
const cors = require('cors')
const pool = require('./db/database')

const app = express()

app.use(cors())

const PORT = 3000

pool.query('SELECT NOW()', (error, result) => {
  if (error) {
    console.error('Error al conectar con PostgreSQL:', error)
  } else {
    console.log('Conección con PostgreSQL exitosa')
    console.log('Hora de PostgreSQL:', result.rows[0].now)
  }
})

app.get('/api/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes')
    res.json(result.rows)
  } catch (error){
    console.error('Error al obtener las recetas:', error)
    res.status(500).json({
      error: 'Error al obtener las recetas'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})