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
      <ul>
        {cars.map((car) => (
          <Car carObj={car} key={car.vehicle_id}
          />
        ))}
      </ul>
    </div>
  );
}

function Car({ carObj }) {
  return (
    <div>
            <img src={carObj.media_urls[0].thumb} alt={carObj.name} />
            <p>{carObj.advert_classification}</p>
            <p>{carObj.odometer_value} {carObj.odometer_units}</p>
            <p>{carObj.plate} {carObj.make}</p>
            <p>{carObj.body_type}</p>
            <p>{carObj.derivative}</p>
            <p>{carObj.transmission}</p>
            <p>{carObj.model}</p>
            <p>{carObj.monthly_payment} /mo ({carObj.monthly_finance_type})</p>
            <p>£{carObj.price}</p>
    </div>
  );
}

export default App;
