export const Pagination = ({
  page,
  setPage,
  totalPokemon,
  pokemonsPerPage,
}) => {
  const pageItems = [];

  const maxPage = Math.ceil(totalPokemon / pokemonsPerPage);

  const onNextPage = () => setPage((page + 1) % maxPage);

  const onCurrentPage = (current) => setPage(current - 1);

  const onPrevPage = () => setPage((page - 1) % maxPage);

  for (let i = 1; i <= maxPage; i++) {
    pageItems.push(i);
  }

  return (
    <div className="pagination">
      <p>
        <span>{page + 1} </span>
        of
        <span> {maxPage}</span>
      </p>
      <div className="page-buttons">
        <button onClick={onPrevPage} disabled={!page}>
          Prev
        </button>
        {pageItems.map((currentPage) => {
          return (
            <span
              key={currentPage}
              onClick={() => onCurrentPage(currentPage)}
              className={currentPage === page + 1 ? "active" : ""}
            >
              {currentPage}
            </span>
          );
        })}
        <button onClick={onNextPage} disabled={page === maxPage - 1}>
          Next
        </button>
      </div>
    </div>
  );
};
