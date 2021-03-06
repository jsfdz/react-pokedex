import { useEffect, useState } from "react";
import { typeColors, colors } from "../helpers/Colors";

export const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(url),
        data = await response.json();

      const id = data.id.toString().padStart(3, "0"),
        name = data.name.split("-").join(" "),
        poke_types = data.types.map((type) => type.type.name),
        type = typeColors.find((type) => poke_types.indexOf(type) > -1),
        color = colors[type],
        types = poke_types.map((type) => type).join(" / "),
        icon = `../img/icons/${type}.svg`,
        image = `../img/images/${data.id}.svg`;
      setPokemon({ id, name, type, color, types, icon, image });
    };

    fetchPokemons();
  }, [url]);

  return (
    <div className="pokeCard" style={{ backgroundColor: `${pokemon.color}` }}>
      <div className="inner">
        <div className="content">
          <span>#{pokemon.id}</span>
          <h3 className="name">{pokemon.name}</h3>
          <div className="content-icon">
            <div className="icon">
              <img
                src={pokemon.icon}
                alt={pokemon.name}
                style={{ width: "18px" }}
              />
            </div>
            <span className="item">
              <span className="value">{pokemon.types}</span>
            </span>
          </div>
        </div>

        <div className="images">
          <div className="bg-container img-opacity">
            <img src="./img/pokebola.svg" alt="Pokebola" />
          </div>
          <div className="img-container">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        </div>
      </div>
    </div>
  );
};
