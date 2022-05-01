export const generateKey = (key: number): string => {
  return `${key}_${new Date().getTime()}`;
};

export const sortFilterData = [
    {
      name: "по возрастанию цены",
      value: "increase",
    },
    {
      name: "по убыванию цены",
      value: "decrease",
    },
    {
      name: "по времени в пути",
      value: "duration",
    },
  ];
  
  export const filterData = [
    {
      name: "1 пересадка",
      value: "transfer",
    },
    {
      name: "без пересадок",
      value: "notransfer",
    },
  ];
  
  export const airlinesFilterData = [
    {
      name: "Аэрофлот",
      value: "airline",
      price: 32600,
    },
  ];