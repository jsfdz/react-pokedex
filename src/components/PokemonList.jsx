import { Link, useRouteMatch } from "react-router-dom"
import { PokemonCard } from "./PokemonCard"

const url = `https://pokeapi.co/api/v2`

export const PokemonList = ({ pokemons, pokemonsFilters, page, pokemonsPerPage }) => {

    const match = useRouteMatch()
    return (
        <div className="pokeList">
            {pokemons?.map(pokemon => {

                return (
                    <Link key={pokemon.id} to={`${match.url}/${pokemon.id}`}>
                        <PokemonCard url={`${url}/pokemon/${pokemon.id}`} />
                    </Link>
                )
            })}

            {pokemonsFilters?.slice(page * pokemonsPerPage, pokemonsPerPage * (page + 1)).map((filter) => {
                return (
                    <Link key={filter.pokemon.url.split("/")[6]} to={`${match.url}/${filter.pokemon.url.split("/")[6]}`}>
                        <PokemonCard url={filter.pokemon.url} />
                    </Link>
                )
            })}
        </div>
    )
}