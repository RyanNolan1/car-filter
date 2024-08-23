import "./App.css";
import { useState, useEffect } from "react";
import starOutline from "./img/star-outline.svg";
import starFull from "./img/star-full.svg";
import rightArrow from "./img/right-arrow.svg";
import leftArrow from "./img/left-arrow.svg";
import doubleRightArrow from "./img/double-right-arrow.svg";

function App() {
  const [cars, setCars] = useState([]);
  const [classification, setClassification] = useState("All");
  const [activeButton, setActiveButton] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [page, setPage] = useState(1);
  const [totalCars, setTotalCars] = useState([]);
  const [sort, setSort] = useState("lowest-price");
  
  const handleSetSort = (event) => {
    setSort(event.target.value);
    let carsCopy = [...cars];
    carsCopy.sort(( a, b) => sort === "lowest-price" ? b.monthly_payment - a.monthly_payment : a.monthly_payment - b.monthly_payment );
    setCars(carsCopy);
  };

  function handlePage(pageNumber) {
    setPage(pageNumber);
  }

  function handleSetActiveButton(buttonId) {
    setActiveButton(buttonId);
  }

  function handleSetActivePage(buttonId) {
    setActivePage(buttonId);
  }

  useEffect(
    function () {
      fetch(
        `https://corsproxy.io/?https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles?results_per_page=11&advert_classification=${classification}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalCars(data.meta.total);
          return data;
        })
        .then((data) => {
          let carsObj = data.data;
          if (classification === "Offers") {
            carsObj = carsObj.filter((car) => car.original_price !== car.price);
          }
          setCars(carsObj);
        });
    },
    [classification, page]
  );

  return (
    <div>
      <MobileFilter
        sort={sort}
        onHandleSetSort={handleSetSort}
        totalCars={totalCars}
        activeButton={activeButton}
        onHandleSetActiveButton={handleSetActiveButton}
        cars={cars}
        onSetClassification={setClassification}
      />
      <Filter
        sort={sort}
        onHandleSetSort={handleSetSort}
        activeButton={activeButton}
        onHandleSetActiveButton={handleSetActiveButton}
        cars={cars}
        onSetClassification={setClassification}
      />
      <ul className="car-grid">
        {cars.slice(0, 4).map((car) => {
          return <Car carObj={car} key={car.vehicle_id} />;
        })}
        <ValueForm key="value-form" />
        {cars.slice(4).map((car) => {
          return <Car carObj={car} key={car.vehicle_id} />;
        })}
      </ul>
      <Footer
        sort={sort}
        onHandleSetSort={handleSetSort}
        activePage={activePage}
        onHandleSetActivePage={handleSetActivePage}
        onHandlePage={handlePage}
      />
    </div>
  );
}

function Car({ carObj }) {
  const [toggleIcon, setToggleIcon] = useState(true);

  const handleToggle = () => {
    setToggleIcon(!toggleIcon);
  };

  return (
    <div className="car">
      <div className="mobile-car-image-container">
        <div className="mobile-images">
          <img src={carObj.media_urls[0].thumb} alt={carObj.name} />
          <img src={carObj.media_urls[1].thumb} alt={carObj.name} />
          <img src={carObj.media_urls[2].thumb} alt={carObj.name} />
          <img src={carObj.media_urls[0].thumb} alt={carObj.name} />
          <img src={carObj.media_urls[1].thumb} alt={carObj.name} />
          <img src={carObj.media_urls[2].thumb} alt={carObj.name} />
        </div>
      </div>
      <div
        className="car-image-container"
        style={{
          backgroundImage: `url(${carObj.media_urls[0].thumb})`,
        }}
      >
        <p className="classification">{carObj.advert_classification}</p>
        <div className="key-features">
          <p>{carObj.key_features[0]}</p>
          <p>{carObj.key_features[1]}</p>
          <p className="transmission">{carObj.key_features[2]}</p>
          <p>{carObj.key_features[3]}</p>
        </div>
      </div>
      <div className="car-details-container">
        <div className="car-details-derivative-container">
          <div className="car-details-derivative">
            <p>
              {carObj.plate} {carObj.make} {carObj.model}
            </p>
            <p className="derivative">{carObj.derivative}</p>
          </div>
          <p className="mobile-classification">
            {carObj.advert_classification}
          </p>
          <button onClick={handleToggle} className="star-button">
            <img
              className="star"
              src={toggleIcon ? starOutline : starFull}
              alt="star icon"
            />
          </button>
        </div>
        <div className="car-payment-container">
          <div className="mobile-car-payment-container">
            <p className="mobile-key-features">
              {carObj.key_features[0]}{" "}
              <span style={{ color: "#D1D6E0" }}>|</span>{" "}
              {carObj.key_features[1]}
            </p>
            <p>
              <span className="monthly-payment">£{carObj.monthly_payment}</span>{" "}
              /mo ({carObj.monthly_finance_type})
            </p>
          </div>
          <div className="price-calculate-container">
            <div className="price-container">
              <div
                className={
                  carObj.original_price === carObj.price
                    ? "car-cost-container"
                    : "car-cost-container-reverse"
                }
              >
                <p
                  className={
                    carObj.original_price === carObj.price
                      ? "car-cost-hidden"
                      : "original-price-discount"
                  }
                >
                  £{carObj.original_price}
                </p>
                <p
                  className={
                    carObj.original_price === carObj.price
                      ? "car-cost"
                      : "price-discount"
                  }
                >
                  £{carObj.price}
                </p>
              </div>
              <p className="mobile-key-features">
                <span className="mobile-transmission">
                  {capitaliseFirstLetter(carObj.key_features[2])}
                </span>{" "}
                <span style={{ color: "#D1D6E0" }}>|</span>{" "}
                {carObj.key_features[3]}
              </p>
            </div>
            <button className="calculate-finance">Calculate Finance</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function capitaliseFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Filter({
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

function Footer({
  onHandlePage,
  onHandleSetActivePage,
  activePage,
  sort,
  onHandleSetSort,
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <button onClick={scrollToTop} className="back-to-top-button">
        Back to top
      </button>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => {
            if (activePage >= 2) {
              onHandleSetActivePage(activePage - 1);
              onHandlePage(activePage - 1);
            }
          }}
        >
          <img src={leftArrow} alt="left arrow icon" />
        </button>
        <button
          className={activePage === 1 ? "active-button" : "pagination-button"}
          onClick={() => {
            onHandleSetActivePage(1);
            onHandlePage(1);
          }}
        >
          1
        </button>
        <button
          className={activePage === 2 ? "active-button" : "pagination-button"}
          onClick={() => {
            onHandleSetActivePage(2);
            onHandlePage(2);
          }}
        >
          2
        </button>
        <button
          className={activePage === 3 ? "active-button" : "pagination-button"}
          onClick={() => {
            onHandleSetActivePage(3);
            onHandlePage(3);
          }}
        >
          3
        </button>
        <button
          className="pagination-button"
          onClick={() => {
            if (activePage <= 2) {
              onHandleSetActivePage(activePage + 1);
              onHandlePage(activePage + 1);
            }
          }}
        >
          <img src={rightArrow} alt="right arrow icon" />
        </button>
        <button
          className="pagination-button"
          onClick={() => {
            if (activePage <= 2) {
              onHandleSetActivePage(activePage + 2);
              onHandlePage(activePage + 2);
            }
          }}
        >
          <img src={doubleRightArrow} alt="double right arrow icon" />
        </button>
      </div>
      <select value={sort} onChange={onHandleSetSort} className="sort-dropdown">
        <option value="lowest-price">Lowest price</option>
        <option value="highest-price">Highest price</option>
      </select>
    </footer>
  );
}

function MobileFilter({
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

function ValueForm() {
  return (
    <div className="value-form-container">
      <div className="value-form-top-container">
        <h1>Value your car</h1>
        <p>
          Find out{" "}
          <span className="value-form-text">the value of your car</span> in just
          a few minutes
        </p>
      </div>
      <form className="value-form">
        <label className="form-label">
          <p className="input-title">
            VRM<span className="asterisk">*</span>
          </p>
          <input
            maxLength="10"
            className="form-input"
            type="text"
            name="VRM"
            placeholder="Enter VRM"
          />
        </label>
        <label className="form-label">
          <p className="input-title">
            Mileage<span>*</span>
          </p>
          <input
            className="form-input"
            type="number"
            name="Mileage"
            placeholder="Enter mileage"
          />
        </label>
        <input
          className="value-form-submit"
          type="submit"
          value="Value my car"
        />
        <input
          className="value-form-submit-mobile"
          type="submit"
          value="Get valuation"
        />
      </form>
    </div>
  );
}

export default App;
