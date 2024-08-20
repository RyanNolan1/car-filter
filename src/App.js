import "./App.css";
import { useState, useEffect } from "react";
import starOutline from "./img/star-outline.svg";
import starFull from "./img/star-full.svg";

function App() {
  const [cars, setCars] = useState([]);
  const [classification, setClassification] = useState("All");

  useEffect(
    function () {
      fetch(
        `https://corsproxy.io/?https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles?results_per_page=36&advert_classification=${classification}`
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
      <Filter cars={cars} onSetClassification={setClassification} />
      <ul className="car-grid">
        {cars.map((car) => (
          <Car carObj={car} key={car.vehicle_id} />
        ))}
      </ul>
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

function Filter({ onSetClassification, cars }) {
  return (
    <nav className="filter">
      <div className="car-count-buttons">
        <p className="car-totals">Showing {cars.length} Cars</p>
        <button
          className="filter-button"
          onClick={() => onSetClassification("All")}
        >
          All
        </button>
        <button
          className="filter-button"
          onClick={() => onSetClassification("Used")}
        >
          Used
        </button>
        <button
          className="filter-button"
          onClick={() => onSetClassification("New")}
        >
          New
        </button>
        <button
          className="filter-button"
          onClick={() => onSetClassification("Offers")}
        >
          Offers
        </button>
      </div>
      <select>
        <option value="lowest-price">Lowest price</option>
      </select>
    </nav>
  );
}

export default App;
