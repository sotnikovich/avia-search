import { useState } from "react";
import Flight from "./Flight";
import { useSelector } from "react-redux";
import { CommonReducersType } from "../store/reducers";
import { FlightProps } from "../types/types";

export default function FlightsList() {
  const [count, setCount] = useState<number>(2);
  const flights = useSelector(
    (state: CommonReducersType) => state.sort.sortedFlights
  );

  //const renderFlights = () => {
  // return flights.map((flight: FlightProps, i) => {
  //if (i < count) return <Flight key={i} {...flight} />;
  //});
  //};

  return (
    <div className="flightList">
      {flights.map((flight: FlightProps, i) => {
        if (i < count) return <Flight key={i} {...flight} />;
      })}
      <button className="showMoreBtn" onClick={() => setCount(count + 2)}>
        Показать еще
      </button>
    </div>
  );
}
