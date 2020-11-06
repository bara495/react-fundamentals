// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

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
  const [status, setStatus] = React.useState({
    status: pokemonName ? pending : idle,
    pokemon: null,
  })

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
      throw error
    case resolved:
      return <PokemonDataView pokemon={status.pokemon} />
      throw new Error('This should be impossible')
  }
}

const ErrorFallback = ({error, resetErrorBoundary}) => (
  <div role="alert">
    There was an error:{' '}
    <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
)

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  const handleReset = () => {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={pokemonName}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
