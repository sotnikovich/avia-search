import { useEffect } from "react";
import FilterList from "./FilterList";
import FlightsList from "./FlightList";
import { useDispatch, useSelector } from "react-redux";
import { filterFlights, setFlightsArray } from "../utils/utils";
import { setFlights } from "../store/actions/sort";
import { getFlights } from "../store/actions/default";
import { CommonReducersType } from "../store/reducers/index";

function App() {
  const dispatch = useDispatch();
  const { sort, transfer, noTransfer, from, till, airlines } = useSelector(
    (state: CommonReducersType) => ({
      sort: state.sort.checkedSort,
      transfer: state.sort.isTransfer,
      noTransfer: state.sort.isNoTransfer,
      from: state.sort.minPrice,
      till: state.sort.maxPrice,
      airlines: state.sort.airlines,
    })
  );

  useEffect(() => {
    const initFlights = setFlightsArray();
    dispatch(getFlights(initFlights));
    const filteredFlights = filterFlights(initFlights, {
      sort: sort,
      filter: {
        transfer: transfer,
        noTransfer: noTransfer,
      },
      price: {
        from: from,
        till: till,
      },
      airlines,
    });
    if (filteredFlights) {
      dispatch(setFlights(filteredFlights));
    }
  }, [dispatch, from, transfer, noTransfer, sort, till, airlines]);

  return (
    <>
      <div className="main">
        <FilterList />
        <FlightsList />
      </div>
    </>
  );
}

export default App;
