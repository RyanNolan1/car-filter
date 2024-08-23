import rightArrow from "./img/right-arrow.svg";
import leftArrow from "./img/left-arrow.svg";
import doubleRightArrow from "./img/double-right-arrow.svg";

export default function Footer({
    onHandlePage,
    onHandleSetActivePage,
    activePage,
    sort,
    onHandleSetSort,
  }) {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
      <footer>
        <button onClick={scrollToTop} className="back-to-top-button">
          Back to top
        </button>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => {
              if (activePage >= 2) {
                onHandleSetActivePage(activePage - 1);
                onHandlePage(activePage - 1);
              }
            }}
          >
            <img src={leftArrow} alt="left arrow icon" />
          </button>
          <button
            className={activePage === 1 ? "active-button" : "pagination-button"}
            onClick={() => {
              onHandleSetActivePage(1);
              onHandlePage(1);
            }}
          >
            1
          </button>
          <button
            className={activePage === 2 ? "active-button" : "pagination-button"}
            onClick={() => {
              onHandleSetActivePage(2);
              onHandlePage(2);
            }}
          >
            2
          </button>
          <button
            className={activePage === 3 ? "active-button" : "pagination-button"}
            onClick={() => {
              onHandleSetActivePage(3);
              onHandlePage(3);
            }}
          >
            3
          </button>
          <button
            className="pagination-button"
            onClick={() => {
              if (activePage <= 2) {
                onHandleSetActivePage(activePage + 1);
                onHandlePage(activePage + 1);
              }
            }}
          >
            <img src={rightArrow} alt="right arrow icon" />
          </button>
          <button
            className="pagination-button"
            onClick={() => {
              if (activePage <= 2) {
                onHandleSetActivePage(activePage + 2);
                onHandlePage(activePage + 2);
              }
            }}
          >
            <img src={doubleRightArrow} alt="double right arrow icon" />
          </button>
        </div>
        <select value={sort} onChange={onHandleSetSort} className="sort-dropdown">
          <option value="lowest-price">Lowest price</option>
          <option value="highest-price">Highest price</option>
        </select>
      </footer>
    );
  }