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

  console.log(cars)

  return (
    <div>
      <ul></ul>
    </div>
  );
}

export default App;
