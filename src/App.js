import "./App.css";
import { useState, useEffect } from "react";
import starOutline from "./img/star-outline.svg";
import starFull from "./img/star-full.svg";

function App() {
  const [cars, setCars] = useState([]);
  const [classification, setClassification] = useState("All");
  const [activeButton, setActiveButton] = useState(0);
  const [page, setPage] = useState(1);


  function handlePage(pageNumber) {
    setPage(pageNumber)
  }

  function handleSetActiveButton(buttonId) {
    setActiveButton(buttonId);
  }

  useEffect(
    function () {
      fetch(
        `https://corsproxy.io/?https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles?results_per_page=11&advert_classification=${classification}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          let carsObj = data.data;
          if (classification === "Offers") {
            carsObj = carsObj.filter((car) => car.original_price !== car.price);
          }
          setCars(carsObj);
        });
    },
    [classification]
  );

  return (
    <div>
      <Filter
        activeButton={activeButton}
        onHandleSetActiveButton={handleSetActiveButton}
        cars={cars}
        onSetClassification={setClassification}
      />
      <ul className="car-grid">
        {cars.map((car) => (
          <Car carObj={car} key={car.vehicle_id} />
        ))}
      </ul>
      <Footer onHandlePage={handlePage} />
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

function Footer({ onHandlePage }) {
  return (
    <footer>
      <button>Back to top</button>
      <div className="pagination">
        <button>&laquo;</button>
        <button onClick={() => onHandlePage(1)}>1</button>
        <button onClick={() => onHandlePage(2)}>2</button>
        <button onClick={() => onHandlePage(3)}>3</button>
        <button onClick={() => onHandlePage(4)}>4</button>
        <button>&raquo;</button>
      </div>
      <select className="sort-dropdown">
        <option value="lowest-price">Lowest price</option>
        <option value="highest-price">Highest price</option>
      </select>
    </footer>
  );
}

export default App;
