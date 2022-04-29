import Filter from "./Filter";
import { sortFilterData, filterData, priceFilterData } from "../filters";
import { useSelector } from "react-redux";
import { CommonReducersType } from "../store/reducers";
import { getAirlinesWithMinPrices } from "../utils/utils";

export default function FilterList() {
  const flights = useSelector(
    (state: CommonReducersType) => state.init.flights
  );

  const { sortedFlights, airlines } = useSelector(
    (state: CommonReducersType) => ({
      sortedFlights: state.sort.sortedFlights,
      airlines: state.sort.airlines,
    })
  );

  return (
    <aside className="filterList">
      <Filter
        title="Сортировать"
        type="radio"
        filterData={sortFilterData}
      />
      <Filter
        title="Фильтровать"
        type="checkbox"
        filterData={filterData}
      />
      <Filter title="Цена" type="text" filterData={priceFilterData} />
      <Filter
        title="Авиакомпании"
        type="checkbox"
        filterData={getAirlinesWithMinPrices(flights, sortedFlights, airlines)}
      />
    </aside>
  );
}