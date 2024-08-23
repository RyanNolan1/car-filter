export default function Filter({
    activeButton,
    onSetClassification,
    cars,
    onHandleSetActiveButton,
    onHandleSetSort,
    sort,
  }) {
    return (
      <nav className="filter">
        <div className="car-count-buttons">
          <p className="car-totals">Showing {cars.length} Cars</p>
          <button
            className={activeButton === 0 ? "active-button" : "filter-button"}
            onClick={() => {
              onHandleSetActiveButton(0);
              onSetClassification("All");
            }}
          >
            All
          </button>
          <button
            className={activeButton === 1 ? "active-button" : "filter-button"}
            onClick={() => {
              onHandleSetActiveButton(1);
              onSetClassification("Used");
            }}
          >
            Used
          </button>
          <button
            className={activeButton === 2 ? "active-button" : "filter-button"}
            onClick={() => {
              onHandleSetActiveButton(2);
              onSetClassification("New");
            }}
          >
            New
          </button>
          <button
            className={activeButton === 3 ? "active-button" : "filter-button"}
            onClick={() => {
              onHandleSetActiveButton(3);
              onSetClassification("Offers");
            }}
          >
            Offers
          </button>
        </div>
        <select value={sort} onChange={onHandleSetSort} className="sort-dropdown">
          <option value="lowest-price">Lowest price</option>
          <option value="highest-price">Highest price</option>
        </select>
      </nav>
    );
  }