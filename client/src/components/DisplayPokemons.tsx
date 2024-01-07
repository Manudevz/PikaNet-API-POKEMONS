import { useState } from "react"
import axios from 'axios'



export const DisplayPokemons = () => {
  const [pokemons, setpokemons] = useState([])

  useEffect(() => {
    const getPokemons = async () => {
      const pokemonsFromServer = await axios.get('http://localhost:3000')
      setpokemons(pokemonsFromServer)
    }
    getPokemons()
    return () => {
      second
    }
  }, [third])
    (() => {
      first

      return () => {
        second
      }
    }, [third])

  return (
    <div>DisplayPokemons</div>
  )
}
