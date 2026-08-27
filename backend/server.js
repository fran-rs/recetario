const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola desde mi backend')
})

app.get('/api/recipes', (req, res) => {
  const recipes = [
    {
      id: 1,
      name: 'Pasta con tomate'
    },
    {
      id: 2,
      name: 'Torta de chocolate'
    },
    {
      id: 3,
      name: 'Ensalada Cesar'
    }
  ]

  res.json(recipes)
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})