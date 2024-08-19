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
          <Car carObj={car} key={car.name}
          />
        ))}
      </ul>
    </div>
  );
}

function Car({ carObj }) {
  return (
    <div>
            <p>{carObj.advert_classification}</p>
            <p>{carObj.odometer_units}</p>
            <p>{carObj.odometer_value}</p>
            <p>{carObj.transmission}</p>
            <p>{carObj.plate}</p>
            <p>{carObj.make}</p>
            <p>{carObj.model}</p>
            <p>{carObj.derivative}</p>
            <p>{carObj.body_type}</p>
            <p>{carObj.fuel_type}</p>
    </div>
  );
}

export default App;
