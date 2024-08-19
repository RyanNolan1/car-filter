import "./App.css";
import { useState, useEffect } from "react";

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
          <Car carObj={car} key={car.vehicle_id} />
        ))}
      </ul>
    </div>
  );
}

function Car({ carObj }) {
  return (
    <div class="car">
      <div
        class="car-image-container"
        style={{
          backgroundImage: `url(${carObj.media_urls[0].thumb})`,
        }}
      >
        <p className="classification">{carObj.advert_classification}</p>
        <div className="car-features">
        <p>
          {carObj.odometer_value} {carObj.odometer_units}
        </p>
        <p>{carObj.body_type}</p>
        <p>{carObj.transmission}</p>
        </div>
      </div>
      <div className="car-details">
        <p>
          {carObj.plate} {carObj.make}
        </p>
        <p>{carObj.derivative}</p>
        <p>{carObj.model}</p>
        <p>
          {carObj.monthly_payment} /mo ({carObj.monthly_finance_type})
        </p>
        <p>£{carObj.price}</p>
      </div>
    </div>
  );
}

export default App;
