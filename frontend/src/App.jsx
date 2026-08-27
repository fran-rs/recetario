import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { useEffect, useState } from 'react'

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch('http://localhost:3000/api/recipes')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las recetas')
      }

      return response.json()
    })
    .then((data) => {
      setRecipes(data)
      setLoading(false)
    })
    .catch(() => {
      setError('No se pudieron guardar las recetas')
      setLoading(false)
    })
  }, [] )

   return (
    <div>
      <h1>Mi Recetario</h1>
      <p>Bienvenidos a mi aplicación de recetas</p>

      {loading && <p>Cargando recetas...</p>}

      {error && <p>{error}</p>}

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
