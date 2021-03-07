import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Error404 } from './Error404'
import { typeColors, colors } from '../helpers/Colors'
import { Auth } from '../providers/AuthContext'
// import axios from 'axios'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const url = `https://pokeapi.co/api/v2`

export const PokemonDetails = () => {

    const
        [pokemon, setPokemon] = useState(null),
        [species, setSpecies] = useState(null),
        [locations, setLocations] = useState(null),
        { user } = useContext(Auth),
        params = useParams(),
        id = parseInt(params.id)

    useEffect(() => {
        const
            fetchPokemons = async () => {
                const
                    response = await fetch(`${url}/pokemon/${id}`),
                    data = await response.json()

                if (id !== isNaN && id <= 649) {
                    const
                        id = data.id,
                        name = data.name,
                        poke_types = data.types.map((type) => type.type.name),
                        abilities = data.abilities.map(ability => ability.ability.name),
                        type = typeColors.find((type) => poke_types.indexOf(type) > -1),
                        color = colors[type],
                        weight = (data.weight / 10).toFixed(1),
                        height = (data.height / 10).toFixed(1),
                        types = poke_types.map((type) => type).join(" / "),
                        ability = abilities.map((ability) => ability).join(", "),
                        icon = `../img/icons/${type}.svg`,
                        image = `../img/images/${data.id}.svg`,
                        stats = data.stats.map(stat => {
                            const stats = {
                                stat_base: stat.base_stat,
                                name: stat.stat.name
                            }

                            return stats
                        })

                    setPokemon({ id, name, type, ability, color, weight, height, types, icon, image, stats })
                } else {
                    // setMessage('lo siento todavia no capturamos mas de 649 pokemon')
                }

            }

        fetchPokemons()
    }, [id])

    useEffect(() => {
        const
            fetchPokemonsEntries = async () => {
                const
                    response = await fetch(`${url}/pokemon-species/${id}`),
                    data = await response.json()
                setSpecies(data)
            }

        if (id !== isNaN && id <= 649) fetchPokemonsEntries()
    }, [id])

    useEffect(() => {
        const
            fetchPokemonsEncounters = async () => {
                const
                    response = await fetch(`${url}/pokemon/${id}/encounters`),
                    data = await response.json(),
                    getLocations = data.map(encounters => {
                        const
                            area = encounters.location_area.name.split('-'),
                            region = area.splice(0, 1),
                            location = { region, area }

                        return location
                    })

                setLocations(getLocations)
            }

        if (id !== isNaN && id <= 649) fetchPokemonsEncounters()
    }, [id])

    return (
        <>{user ?
            <>{id !== isNaN && id <= 649 ?
                <>{pokemon && species && locations ?
                    <div className="poke-detail">
                        <div className="hero" style={{ backgroundColor: `${pokemon.color}` }}>
                            <div className="header-details">
                                <div className="navigation">
                                    <span>
                                        <Link to="/pokedex">
                                            {/* <FontAwesomeIcon icon={faArrowLeft} /> */} back to pokedex
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            <div className="images">
                                <div className="bg-container">
                                    <img src={pokemon.icon} alt={pokemon.name} />
                                </div>
                                <div className="img-container">
                                    <img src={pokemon.image} alt={pokemon.name} />
                                </div>
                            </div>
                            <div className="container">
                                <div className="title-name">
                                    <h1>{pokemon.name}</h1>
                                </div>
                                <div className="pokemon-id">
                                    <span>
                                        #{pokemon.id.toString().padStart(3, "0")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="body-container">
                            <div className="container">
                                <div className="description">
                                    {species.flavor_text_entries[1].flavor_text.replace('\f', '\n')}
                                </div>

                                <h4>INFO</h4>
                                <table className="table-info">
                                    <tbody>
                                        <tr>
                                            <td className="table-title">species:</td>
                                            <td className="table-description">{species.genera[7].genus}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-title">type:</td>
                                            <td className="table-description">{pokemon.types}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-title">height:</td>
                                            <td className="table-description">{pokemon.height} m</td>
                                        </tr>
                                        <tr>
                                            <td className="table-title">width:</td>
                                            <td className="table-description">{pokemon.weight} kg</td>
                                        </tr>
                                        <tr>
                                            <td className="table-title">abilities:</td>
                                            <td className="table-description">{pokemon.ability.split('-').join(' ')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h4>STATS</h4>
                                <table className="table-stats">
                                    <tbody>
                                        {pokemon.stats.map(stat => {
                                            return (
                                                <tr key={stat.name}>
                                                    <td className="table-title">{stat.name.replace('-', '\n')}:</td>
                                                    <td className="table-description">{stat.stat_base}</td>
                                                    <td className="table-progress">
                                                        <div className="progress">
                                                            <div className="bar" style={{ width: `${stat.stat_base}%`, background: pokemon.color }}>
                                                                <p className="percent">{stat.stat_base}%</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>

                                <h4>ENCOUNTERS</h4>
                                <table className="table-encounters">
                                    <tbody>
                                        {locations.length !== 0 ?
                                            <>
                                                <tr>
                                                    <th className="table-title">Region:</th>
                                                    <th className="table-title">Area:</th>
                                                </tr>
                                                {
                                                    locations.map((location, index) => {
                                                        return (
                                                            <tr key={index + 1}>
                                                                <td className="table-description">{location.region}</td>
                                                                <td className="table-description">{location.area.join(' ')}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <tr>
                                                <td className="table-description">There is no information about its location.</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="bg-loading">
                        <div className="loading">
                            <div className="pokeball"></div>
                        </div>
                    </div>
                }</>
                :
                <Error404 msg={`You can't always catch'em all`} linkTo={'/pokedex'} />
            }</>
            :
            <Redirect to="/" />
        }</>
    )
}