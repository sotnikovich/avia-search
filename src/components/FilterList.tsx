import Filter from "./Filter";
import { sortFilterData, filterData } from "../filters/filters";
import { priceFilterHandler } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { CommonReducersType } from "../store/reducers";
import { getAirlinesWithMinPrices } from "../utils/utils";

function FilterList() {
  const flights = useSelector(
    (state: CommonReducersType) => state.init.flights
  );

  const { sortedFlights, airlines } = useSelector(
    (state: CommonReducersType) => ({
      sortedFlights: state.sort.sortedFlights,
      airlines: state.sort.airlines,
    })
  );

  const dispatch = useDispatch();
  const { from, till } = useSelector((state: CommonReducersType) => ({
    from: state.sort.minPrice,
    till: state.sort.maxPrice,
  }));

  return (
    <aside className="filterList">
      <Filter title="Сортировать" type="radio" filterData={sortFilterData} />
      <Filter title="Фильтровать" type="checkbox" filterData={filterData} />

      <h2 className="filter__title">Цена</h2>
      <div className="filterList__input">
        <label className="label">От</label>
        <input
          className="input"
          name="from"
          id="from"
          type="text"
          value={from}
          onChange={(e) => {
            priceFilterHandler(e, dispatch, {
              price: {
                from: Number(e.target.value),
                till: Number(e.target.value),
              },
            });
          }}
        ></input>
      </div>

      <div className="filterList__input">
        <label className="label">До</label>
        <input
          className="input"
          name="till"
          id="till"
          type="text"
          value={till}
          onChange={(e) => {
            priceFilterHandler(e, dispatch, {
              price: {
                from: Number(e.target.value),
                till: Number(e.target.value),
              },
            });
          }}
        ></input>
      </div>

      <Filter
        title="Авиакомпании"
        type="checkbox"
        filterData={getAirlinesWithMinPrices(flights, sortedFlights, airlines)}
      />
    </aside>
  );
}

export default FilterList;
