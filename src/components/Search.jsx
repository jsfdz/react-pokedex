import React, { useEffect, useState } from "react"

const url = `https://pokeapi.co/api/v2`

export const Search = ({ setPokemons, setPokemonsFilters }) => {
    const
        [searchQuery, setSearchQuery] = useState(''),
        [pokemonID, setPokemonID] = useState(null)

    useEffect(() => {
        const
            fetchPokemons = async () => {
                // try {
                const
                    response = await fetch(`${url}/pokemon/${pokemonID}`),
                    data = await response.json()
                if (data.id <= 649) {
                    setPokemons([data])
                    setPokemonsFilters([])
                } else {
                    // setMessage('lo siento todavia no capturamos mas de 649 pokemon')
                }
                // } catch (err) {
                //     setMessage('ese pokemon no existe')
                // }
            }

        if (pokemonID !== null) fetchPokemons()
    }, [pokemonID, setPokemons, setPokemonsFilters])

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonID(searchQuery)
        setSearchQuery('')
    }

    return (
        <div className="search-form">
            <p>Search for Pokémon by name or using the National Pokédex number.</p>
            <form onSubmit={handleSubmit}>
                <div className="search-input">
                    <div className="icon-search">
                        {/* <FontAwesomeIcon icon={faSearch} /> */}
                    </div>
                    <input
                        type="search"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}