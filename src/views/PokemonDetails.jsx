import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Error404 } from "./Error404";
import { typeColors, colors } from "../helpers/Colors";
import { Auth } from "../providers/AuthContext";

const url = `https://pokeapi.co/api/v2`;

export const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState(null),
    [species, setSpecies] = useState(null),
    [locations, setLocations] = useState(null),
    { user } = useContext(Auth),
    params = useParams(),
    id = parseInt(params.id);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(`${url}/pokemon/${id}`),
        data = await response.json();

      if (id !== isNaN && id <= 649) {
        const id = data.id,
          name = data.name,
          poke_types = data.types.map((type) => type.type.name),
          abilities = data.abilities.map((ability) => ability.ability.name),
          type = typeColors.find((type) => poke_types.indexOf(type) > -1),
          color = colors[type],
          weight = (data.weight / 10).toFixed(1),
          height = (data.height / 10).toFixed(1),
          types = poke_types.map((type) => type).join(" / "),
          ability = abilities.map((ability) => ability).join(", "),
          icon = `../img/icons/${type}.svg`,
          image = `../img/images/${data.id}.svg`,
          stats = data.stats.map((stat) => {
            const stats = {
              stat_base: stat.base_stat,
              name: stat.stat.name,
            };

            return stats;
          });

        setPokemon({
          id,
          name,
          type,
          ability,
          color,
          weight,
          height,
          types,
          icon,
          image,
          stats,
        });
      }
    };

    fetchPokemons();
  }, [id]);

  useEffect(() => {
    const fetchPokemonsEntries = async () => {
      const response = await fetch(`${url}/pokemon-species/${id}`),
        data = await response.json();
      setSpecies(data);
    };

    if (id !== isNaN && id <= 649) fetchPokemonsEntries();
  }, [id]);

  useEffect(() => {
    const fetchPokemonsEncounters = async () => {
      const response = await fetch(`${url}/pokemon/${id}/encounters`),
        data = await response.json(),
        getLocations = data.map((encounters) => {
          const area = encounters.location_area.name.split("-"),
            region = area.splice(0, 1),
            location = { region, area };

          return location;
        });

      setLocations(getLocations);
    };

    if (id !== isNaN && id <= 649) fetchPokemonsEncounters();
  }, [id]);

  return (
    <>
      {user ? (
        <>
          {id !== isNaN && id <= 649 ? (
            <>
              {pokemon && species && locations ? (
                <div className="poke-detail">
                  <div
                    className="hero"
                    style={{ backgroundColor: `${pokemon.color}` }}
                  >
                    <Link to="/pokedex">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                    <div className="img-content">
                      <img src="./img/pokebola.svg" alt="" />
                      <img src={pokemon.image} alt={pokemon.name} />
                    </div>
                    <div className="name">
                      <p>{pokemon.name}</p>
                      <div>
                        <img src={pokemon.icon} alt="xd" />
                        <span>#{pokemon.id.toString().padStart(3)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="body-description">
                    <div className="container-details">
                      <p>
                        {species.flavor_text_entries[1].flavor_text.replace(
                          "\f",
                          "\n"
                        )}
                      </p>

                      <table className="col-s-12 col-md-5 details">
                        <h4>Details</h4>
                        <tbody>
                          <tr>
                            <td>Species:</td>
                            <td>{species.genera[7].genus}</td>
                          </tr>
                          <tr>
                            <td>Height:</td>
                            <td>{pokemon.height} m</td>
                          </tr>
                          <tr>
                            <td>Width:</td>
                            <td>{pokemon.weight} kg</td>
                          </tr>
                          <tr>
                            <td>Abilities:</td>
                            <td>{pokemon.ability.split("-").join(" ")}</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="col-s-12 col-md-5 skill">
                        <h4>Stats</h4>
                        <tbody>
                          {pokemon?.stats.map((stat) => {
                            return (
                              <tr key={stat.name}>
                                <td className="table-title">
                                  {stat.name.replace("-", "\n")}:
                                </td>
                                <td className="table-progress">
                                  <div className="progress">
                                    <div
                                      className="bar"
                                      style={{
                                        width: `${stat.stat_base}%`,
                                        background: pokemon.color,
                                      }}
                                    >
                                      <p className="percent">
                                        {stat.stat_base}%
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <table className="col-s-12 col-md-12 encounters">
                        <h4>Encounters</h4>
                        {locations.length !== 0 ? (
                          <>
                            {locations.map((location, index) => {
                              return (
                                <div
                                  key={index + 1}
                                  style={{
                                    backgroundColor: `${pokemon.color}`,
                                  }}
                                >
                                  <p>Region: {location.region}</p>
                                  <p>Area: {location.area.join(" ")}</p>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <p>There is no information about its location.</p>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-loading">
                  <div className="loading">
                    <div className="pokeball"></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Error404
              msg={`You can't always catch'em all`}
              linkTo={"/pokedex"}
            />
          )}
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
