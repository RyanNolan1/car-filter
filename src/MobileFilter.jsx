

export default function MobileFilter({
    activeButton,
    onSetClassification,
    cars,
    onHandleSetActiveButton,
    totalCars,
    onHandleSetSort,
    sort,
  }) {
    return (
      <nav className="mobile-filter">
        <div className="mobile-car-count-buttons">
          <button
            className={
              activeButton === 0 ? "mobile-active-button" : "mobile-filter-button"
            }
            onClick={() => {
              onHandleSetActiveButton(0);
              onSetClassification("All");
            }}
          >
            All
          </button>
          <button
            className={
              activeButton === 1 ? "mobile-active-button" : "mobile-filter-button"
            }
            onClick={() => {
              onHandleSetActiveButton(1);
              onSetClassification("Used");
            }}
          >
            Used
          </button>
          <button
            className={
              activeButton === 2 ? "mobile-active-button" : "mobile-filter-button"
            }
            onClick={() => {
              onHandleSetActiveButton(2);
              onSetClassification("New");
            }}
          >
            New
          </button>
          <button
            className={
              activeButton === 3 ? "mobile-active-button" : "mobile-filter-button"
            }
            onClick={() => {
              onHandleSetActiveButton(3);
              onSetClassification("Offers");
            }}
          >
            Offers
          </button>
        </div>
        <div className="mobile-car-count-sort">
          <p className="mobile-car-totals">
            Showing {cars.length} of {totalCars} cars
          </p>
          <select
            value={sort}
            onChange={onHandleSetSort}
            className="sort-dropdown"
          >
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest price</option>
          </select>
        </div>
      </nav>
    );
  }