// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

const states = ['idle', 'pending', 'resolved', 'rejected']
const idle = states[0]
const pending = states[1]
const resolved = states[2]
const rejected = states[3]

function PokemonInfo({pokemonName}) {
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState({status: idle, pokemon: null})

  React.useEffect(() => {
    if (pokemonName === '') return

    setStatus({status: pending})

    fetchPokemon(pokemonName).then(
      pokemonData => {
        setStatus({status: resolved, pokemon: pokemonData})
      },
      error => {
        setError(error)
        setStatus({status: rejected})
      },
    )
  }, [pokemonName])

  switch (status.status) {
    case idle:
      return 'Submit a pokemon'
    case pending:
      return <PokemonInfoFallback name={pokemonName} />
    case rejected:
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    case resolved:
      return <PokemonDataView pokemon={status.pokemon} />
      throw new Error('This should be impossible')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
