import { useEffect, useState } from "react";

export const Filter = ({
  url,
  optionValue,
  filterName,
  selectFilter,
  setSelectFilter,
}) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchPokemonsFilters = async () => {
      const response = await fetch(`${url}`),
        data = await response.json();
      setFilter(data.results);
    };

    fetchPokemonsFilters();
  }, [url]);

  return (
    <select
      name={filterName}
      onChange={(e) => setSelectFilter(e.target.value)}
      value={selectFilter}
    >
      <option>{optionValue}</option>
      {filter?.map((filter, index) => {
        return (
          <option key={index + 1} value={index + 1}>
            {filter.name.split("-").join(" ")}
          </option>
        );
      })}
    </select>
  );
};
