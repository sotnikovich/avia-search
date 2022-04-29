import { Filters, FlightProps} from "../types";
import flightsData from "../flights.json";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChangeEvent, Dispatch } from "react";
import {
  filterAirline,
  filterMaxPrice,
  filterMinPrice,
  filterTransfer,
  sortFlightDecrease,
  sortFlightDuration,
  sortFlightIncrease,
} from "../store/actions/sort";

const emptyFieldFiller = (field: any): string => {
  return field !== undefined ? field.caption : "";
};

export const setFlightsArray = (): Array<FlightProps> => {
  const flightsArray: Array<FlightProps> = [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  flightsData.result.flights.forEach((flight: any) => {
    const currentFlight = flight.flight;
    const forwardFlight = currentFlight.legs[0];
    const backFlight = currentFlight.legs[1];

    const resultFlight: FlightProps = {
      airline: currentFlight.carrier.caption,
      amount: currentFlight.price.total.amount,
      forwardFlight: {
        airline: forwardFlight.segments[0].airline.caption,
        departureCity: forwardFlight.segments[0].departureCity
          ? forwardFlight.segments[0].departureCity.caption
          : "",
        departureAirport: forwardFlight.segments[0].departureAirport.caption,
        departureAirportUid: forwardFlight.segments[0].departureAirport.uid,
        arrivalCity: emptyFieldFiller(
          forwardFlight.segments[forwardFlight.segments.length - 1].arrivalCity
        ),
        arrivalAirport: forwardFlight.segments[forwardFlight.segments.length - 1]
          .arrivalAirport.caption,
        arrivalAirportUid: forwardFlight.segments[forwardFlight.segments.length - 1]
          .arrivalAirport.uid,
        isTranfer: forwardFlight.segments.length > 1,
        duration: forwardFlight.duration,
        arrivalDate: forwardFlight.segments[forwardFlight.segments.length - 1].arrivalDate,
        departureDate: forwardFlight.segments[0].departureDate,
      },
      backFlight: {
        airline: backFlight.segments[0].airline.caption,
        departureCity: emptyFieldFiller(backFlight.segments[0].departureCity),
        departureAirport: backFlight.segments[0].departureAirport.caption,
        departureAirportUid: backFlight.segments[0].departureAirport.uid,
        arrivalCity: emptyFieldFiller(
          backFlight.segments[backFlight.segments.length - 1].arrivalCity
        ),
        arrivalAirport: backFlight.segments[backFlight.segments.length - 1].arrivalAirport
          .caption,
        arrivalAirportUid: backFlight.segments[backFlight.segments.length - 1].arrivalAirport
          .uid,
        isTranfer: backFlight.segments.length > 1,
        duration: backFlight.duration,
        arrivalDate: backFlight.segments[backFlight.segments.length - 1].arrivalDate,
        departureDate: backFlight.segments[0].departureDate,
      },
    };

    flightsArray.push(resultFlight);
  });

  return flightsArray;
};

export const minutesConverter = (count: number) => {
  const hours = Math.trunc(count / 60);
  const minutes = count % 60;
  return `${hours} ч ${minutes} мин`;
};

export const setTime = (date: string) => {
  const currentDate = new Date(date);
  return format(currentDate, "H:mm");
};

export const setDate = (date: string) => {
  const currentDate = new Date(date);
  return format(currentDate, "d MMM EEEEEE", { locale: ru });
};

export const sortFlightsIncreasePrice = (
  flights: Array<FlightProps>
): Array<FlightProps> => {
  return flights.sort((a, b) => {
    return Number(a.amount) - Number(b.amount);
  });
};

export const sortFlightsDecreasePrice = (
  flights: Array<FlightProps>
): Array<FlightProps> => {
  return flights.sort((a, b) => {
    return Number(b.amount) - Number(a.amount);
  });
};

export const sortFlightsIncreaseDuration = (
  flights: Array<FlightProps>
): Array<FlightProps> => {
  return flights.sort((a, b) => {
    return (
      a.forwardFlight.duration +
      a.backFlight.duration -
      (b.forwardFlight.duration + b.backFlight.duration)
    );
  });
};

export const filterFlightsTransfer = (
  initialFlights: Array<FlightProps>,
  isTranfer: boolean,
  isNoTransfer: boolean
): Array<FlightProps> => {
  if (isTranfer && !isNoTransfer) {
    return initialFlights.filter(
      (flight) => flight.forwardFlight.isTranfer && flight.backFlight.isTranfer
    );
  }
  if (!isTranfer && isNoTransfer) {
    return initialFlights.filter(
      (flight) =>
        !flight.forwardFlight.isTranfer && !flight.backFlight.isTranfer
    );
  }
  return initialFlights;
};

export const getAirlinesWithMinPrices = (
  flights: Array<FlightProps>,
  sortedFlights: Array<FlightProps>,
  selectedAirlines: Array<string>
) => {
  const result = [];
  const airlinesArray = new Set(flights.map((flight) => flight.airline));
  const sortedAirlinesArray = new Set(
    sortedFlights.map((flight) => flight.airline)
  );
  for (const item of airlinesArray) {
    const minPrice = flights
      .filter((flight) => flight.airline === item)
      .map((elem) => Number(elem.amount));
    result.push({
      name: item,
      value: item,
      price: Math.min(...minPrice),
      isActive: !sortedAirlinesArray.has(item),
      isSelected: selectedAirlines.includes(item),
    });
  }
  return result;
};

export const allFiltersHandler = (
  e: ChangeEvent,
  dispatch: Dispatch<any>,
  filters: Filters
) => {
  const { target } = e;
  switch (target.id) {
    case "decrease":
      dispatch(sortFlightDecrease());
      break;
    case "increase":
      dispatch(sortFlightIncrease());
      break;
    case "duration":
      dispatch(sortFlightDuration());
      break;

    case "transfer":
      dispatch(
        filterTransfer({
          isTransfer: !filters.filter.transfer,
          isNoTransfer: filters.filter.noTransfer,
        })
      );
      break;
    case "notransfer":
      dispatch(
        filterTransfer({
          isTransfer: filters.filter.transfer,
          isNoTransfer: !filters.filter.noTransfer,
        })
      );
      break;
    case "from":
      dispatch(filterMinPrice(filters.price.from));
      break;
    case "till":
      dispatch(filterMaxPrice(filters.price.till));
      break;
  }

  if ((target as HTMLInputElement).name === "Авиакомпании") {
    dispatch(filterAirline(target.id));
  }
};

export const filterFlights = (
  flights: Array<FlightProps>,
  filters: {
    filter: { noTransfer: boolean; transfer: boolean };
    price: { till: number; from: number };
    airlines: Array<string>;
    sort: string;
  }
) => {
  let results: Array<FlightProps> = [];

  switch (filters.sort) {
    case "decrease":
      results.push(...sortFlightsDecreasePrice(flights));
      break;
    case "increase":
      results.push(...sortFlightsIncreasePrice(flights));
      break;
    case "duration":
      results.push(...sortFlightsIncreaseDuration(flights));
      break;
    default:
      return;
  }

  if (filters.filter.transfer && !filters.filter.noTransfer) {
    results = [
      ...results.filter(
        (flight) =>
          flight.forwardFlight.isTranfer && flight.backFlight.isTranfer
      ),
    ];
  }

  if (!filters.filter.transfer && filters.filter.noTransfer) {
    results = [
      ...results.filter(
        (flight) =>
          !flight.forwardFlight.isTranfer && !flight.backFlight.isTranfer
      ),
    ];
  }

  if (filters.airlines.length) {
    results = [
      ...results.filter((flight) => filters.airlines.includes(flight.airline)),
    ];
  }

  return results.filter((flight) => {
    const sum = Number(flight.amount);
    if (sum > filters.price.from && sum < filters.price.till) return flight;
  });
};