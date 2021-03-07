import { useContext, useEffect, useState } from "react"
import { Search } from "../components/Search"
import { Filters } from "../components/Filters"
import { PokemonList } from "../components/PokemonList"
import { Pagination } from "../components/Pagination"
import { Link, Redirect } from "react-router-dom"
import { app } from '../services/FireBase'
import { Auth } from '../providers/AuthContext'

export const Pokedex = () => {
    const
        [pokemons, setPokemons] = useState([]),
        [pokemonsFilters, setPokemonsFilters] = useState([]),
        [message, setMessage] = useState(null),
        [page, setPage] = useState(0),
        [totalPokemon, setTotalPokemon] = useState(0),
        [pokemonsPerPage, setPokemonsPerPage] = useState(5),
        [name, setName] = useState(null),
        { user } = useContext(Auth)

    useEffect(() => {
        user ? user.displayName
            ? setName(user.displayName)
            : setName(user.email)
            : setName(null)
    }, [user])

    useEffect(() => {
        setTotalPokemon(pokemonsFilters.length)
    }, [pokemonsFilters])

    return (
        <>{user ?
            <div className="container">
                <div className="header">
                    <div className="header-nav">
                        <span>
                            <Link to="/">
                                back to home
                        </Link>
                        </span><h1> Pokedex</h1>
                    </div>
                    <div className="user">
                        <span>hi, {name}</span>
                        <button
                            onClick={() => app.auth().signOut()}
                            key="logout"
                        >Sign Out</button>
                    </div>
                </div>
                <Search
                    setPokemons={setPokemons}
                    setPokemonsFilters={setPokemonsFilters} />

                <Filters
                    setPokemonsFilters={setPokemonsFilters}
                    setPokemons={setPokemons}
                    setPage={setPage} />

                {message && <p>{message}</p>}

                <PokemonList
                    pokemons={pokemons}
                    pokemonsFilters={pokemonsFilters}
                    page={page}
                    pokemonsPerPage={pokemonsPerPage} />

                {totalPokemon > 5 &&
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPokemon={totalPokemon}
                        pokemonsPerPage={pokemonsPerPage} />
                }
            </div>
            : <Redirect to="/" />
        }</>
    )
}