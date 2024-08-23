import { useState } from "react";
import starOutline from "./img/star-outline.svg";
import starFull from "./img/star-full.svg";

function capitaliseFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default function Car({ carObj }) {
    const [toggleIcon, setToggleIcon] = useState(true);
  
    const handleToggle = () => {
      setToggleIcon(!toggleIcon);
    };
  
    return (
      <div className="car">
        <div className="mobile-car-image-container">
          <div className="mobile-images">
            <img src={carObj.media_urls[0].thumb} alt={carObj.name} />
            <img src={carObj.media_urls[1].thumb} alt={carObj.name} />
            <img src={carObj.media_urls[2].thumb} alt={carObj.name} />
            <img src={carObj.media_urls[0].thumb} alt={carObj.name} />
            <img src={carObj.media_urls[1].thumb} alt={carObj.name} />
            <img src={carObj.media_urls[2].thumb} alt={carObj.name} />
          </div>
        </div>
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
            <p className="mobile-classification">
              {carObj.advert_classification}
            </p>
            <button onClick={handleToggle} className="star-button">
              <img
                className="star"
                src={toggleIcon ? starOutline : starFull}
                alt="star icon"
              />
            </button>
          </div>
          <div className="car-payment-container">
            <div className="mobile-car-payment-container">
              <p className="mobile-key-features">
                {carObj.key_features[0]}{" "}
                <span style={{ color: "#D1D6E0" }}>|</span>{" "}
                {carObj.key_features[1]}
              </p>
              <p>
                <span className="monthly-payment">£{carObj.monthly_payment}</span>{" "}
                /mo ({carObj.monthly_finance_type})
              </p>
            </div>
            <div className="price-calculate-container">
              <div className="price-container">
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
                <p className="mobile-key-features">
                  <span className="mobile-transmission">
                    {capitaliseFirstLetter(carObj.key_features[2])}
                  </span>{" "}
                  <span style={{ color: "#D1D6E0" }}>|</span>{" "}
                  {carObj.key_features[3]}
                </p>
              </div>
              <button className="calculate-finance">Calculate Finance</button>
            </div>
          </div>
        </div>
      </div>
    );
  }