import "./App.css";
import { useState, useEffect } from "react";
import ValueForm from "./ValueForm";
import MobileFilter from "./MobileFilter";
import Footer from "./Footer";
import Filter from "./Filter";
import Car from "./Car"

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

export default App;
