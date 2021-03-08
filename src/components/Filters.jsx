import { useEffect, useState } from "react";
import { Filter } from "./Filter";

const url = `https://pokeapi.co/api/v2`;

export const Filters = ({ setPokemonsFilters, setPokemons, setPage }) => {
  const [selectTypeFilter, setSelectTypeFilter] = useState(""),
    [selectAbilityFilter, setSelectAbilityFilter] = useState("");

  useEffect(() => {
    const fetchPokemonsType = async () => {
      const response = await fetch(`${url}/type/${selectTypeFilter}`),
        data = await response.json();

      const filter = data.pokemon.filter(
        (data) =>
          data.pokemon.url.includes(data.pokemon.url.split("/")[6]) &&
          data.pokemon.url.split("/")[6] <= 649
      );

      setPokemonsFilters(filter);
      setSelectAbilityFilter("");
      setPokemons([]);
      setPage(0);
    };

    if (selectTypeFilter !== "") fetchPokemonsType();
  }, [selectTypeFilter, setPokemonsFilters, setPokemons, setPage]);

  useEffect(() => {
    const fetchPokemonsAbility = async () => {
      const response = await fetch(`${url}/ability/${selectAbilityFilter}`),
        data = await response.json();

      const filter = data.pokemon.filter(
        (data) =>
          data.pokemon.url.includes(data.pokemon.url.split("/")[6]) &&
          data.pokemon.url.split("/")[6] <= 649
      );

      setPokemonsFilters(filter);
      setSelectTypeFilter("");
      setPokemons([]);
      setPage(0);
    };

    if (selectAbilityFilter !== "") fetchPokemonsAbility();
  }, [selectAbilityFilter, setPokemonsFilters, setPokemons, setPage]);

  return (
    <div className="filters-form">
      <p>Use the advanced search to find Pokémon by type or ability.</p>
      <div className="filters">
        <Filter
          filterName={"type"}
          selectFilter={selectTypeFilter}
          setSelectFilter={setSelectTypeFilter}
          optionValue={"Select Type"}
          url={`${url}/type`}
        />

        <Filter
          filterName={"ability"}
          selectFilter={selectAbilityFilter}
          setSelectFilter={setSelectAbilityFilter}
          optionValue={"Select Ability"}
          url={`${url}/ability?offset=0&limit=327`}
        />
      </div>
    </div>
  );
};
