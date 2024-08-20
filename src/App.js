import "./App.css";
import { useState, useEffect } from "react";
import starOutline from "./img/star-outline.svg";
import starFull from "./img/star-full.svg";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(function () {
    fetch(
      "https://corsproxy.io/?https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles"
    )
      .then((res) => res.json())
      .then((data) => setCars(data.data));
  }, []);

  return (
    <div>
      <ul className="car-grid">
        {cars.map((car) => (
          <Car
            carObj={car}
            key={car.vehicle_id}
          />
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
          <img onClick={handleToggle} className="star" src={toggleIcon ? starOutline : starFull} alt="star icon"/>
        </div>
        <div className="car-cost-container">
          <p>
            <span className="monthly-payment">£{carObj.monthly_payment}</span>{" "}
            /mo ({carObj.monthly_finance_type})
          </p>
          <p className="car-cost">£{carObj.price}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
