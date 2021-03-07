import { useContext, useEffect, useState } from "react";
import { Search } from "../components/Search";
import { Filters } from "../components/Filters";
import { PokemonList } from "../components/PokemonList";
import { Pagination } from "../components/Pagination";
import { Link, Redirect } from "react-router-dom";
import { app } from "../services/FireBase";
import { Auth } from "../providers/AuthContext";

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]),
    [pokemonsFilters, setPokemonsFilters] = useState([]),
    [page, setPage] = useState(0),
    [totalPokemon, setTotalPokemon] = useState(0),
    [pokemonsPerPage] = useState(8),
    [name, setName] = useState(null),
    { user } = useContext(Auth);

  useEffect(() => {
    user
      ? user.displayName
        ? setName(user.displayName)
        : setName(user.email)
      : setName(null);
  }, [user]);

  useEffect(() => {
    setTotalPokemon(pokemonsFilters.length);
  }, [pokemonsFilters]);

  return (
    <>
      {user ? (
        <div className="container">
          <div className="header">
            <Link to="/">
              <i className="fas fa-chevron-left"></i>
            </Link>
            <h1>Pokédex</h1>
            <div className="exit-app">
              <i
                className="fas fa-sign-out-alt"
                onClick={() => app.auth().signOut()}
                key="logout"
              ></i>
            </div>
          </div>
          <div className="user">
            <span>Hi 😀 {name}</span>
          </div>
          <div className="search">
            <Search
              setPokemons={setPokemons}
              setPokemonsFilters={setPokemonsFilters}
            />

            <Filters
              setPokemonsFilters={setPokemonsFilters}
              setPokemons={setPokemons}
              setPage={setPage}
            />
          </div>

          {/* {message && <p>{message}</p>} */}
          <div className="pokeLis">
            <PokemonList
              pokemons={pokemons}
              pokemonsFilters={pokemonsFilters}
              page={page}
              pokemonsPerPage={pokemonsPerPage}
            />
          </div>

          {totalPokemon > 5 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPokemon={totalPokemon}
              pokemonsPerPage={pokemonsPerPage}
            />
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
