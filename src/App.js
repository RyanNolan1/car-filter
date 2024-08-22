import "./App.css";
import { useState, useEffect } from "react";
import starOutline from "./img/star-outline.svg";
import starFull from "./img/star-full.svg";

function App() {
  const [cars, setCars] = useState([]);
  const [classification, setClassification] = useState("All");
  const [activeButton, setActiveButton] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [page, setPage] = useState(1);
  const [totalCars, setTotalCars] = useState([]);

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
        totalCars={totalCars}
        activeButton={activeButton}
        onHandleSetActiveButton={handleSetActiveButton}
        cars={cars}
        onSetClassification={setClassification}
      />
      <Filter
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
          <p className="mobile-classification">{carObj.advert_classification}</p>
          <button onClick={handleToggle} className="star-button">
            <img
              className="star"
              src={toggleIcon ? starOutline : starFull}
              alt="star icon"
            />
          </button>
        </div>
        <div className="car-payment-container">
          <p>
            <span className="monthly-payment">£{carObj.monthly_payment}</span>{" "}
            /mo ({carObj.monthly_finance_type})
          </p>
          <div className="price-calculate-container">
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
            <button className="calculate-finance">Calculate Finance</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Filter({
  activeButton,
  onSetClassification,
  cars,
  onHandleSetActiveButton,
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
      <select className="sort-dropdown">
        <option value="lowest-price">Lowest price</option>
        <option value="highest-price">Highest price</option>
      </select>
    </nav>
  );
}

function Footer({ onHandlePage, onHandleSetActivePage, activePage }) {
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
          &larr;
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
          &rarr;
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
          &raquo;
        </button>
      </div>
      <select className="sort-dropdown">
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
        <select className="sort-dropdown">
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
        <p>Find out the value of your car in just a few minutes</p>
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
      </form>
    </div>
  );
}

export default App;
