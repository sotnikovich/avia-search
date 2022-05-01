import { FC } from "react";
import Segment from "./Segment";
import { FlightProps } from "../types/types";

const Flight: FC<FlightProps> = (flight) => {
  return (
    <div className="flight">
      <div className="flight__header">
        <span className="flight__carrier">{flight.airline}</span>
        <p className="flight__price">
          {flight.amount} &#8381; <br />
          <span className="flight__price-span">
            Стоимость для одного взрослого пассажира
          </span>
        </p>
      </div>
      <>
        <Segment {...flight.forwardFlight} />
        <hr className="flight__line" />
        <Segment {...flight.backFlight} />
      </>
      <button className="flight__button">ВЫБРАТЬ</button>
    </div>
  );
};

export default Flight;
