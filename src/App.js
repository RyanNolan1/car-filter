import './App.css';
import { useState } from "react";

function App() {
  const [cars, setCars] = useState([]);

  fetch('https://corsproxy.io/?https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles')
  .then((res) => res.json())
  .then((data) => console.log(data))

}

export default App;


