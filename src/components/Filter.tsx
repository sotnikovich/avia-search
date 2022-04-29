import { FC } from "react";
import { generateKey } from "../filters";
import { useDispatch, useSelector } from "react-redux";
import { allFiltersHandler } from "../utils/utils";
import { CommonReducersType } from "../store/reducers";

type SingleFilterProps = {
  title: string;
  filterData: Array<{
    name: string;
    value: string;
    price?: number;
    isActive?: boolean;
    isSelected?: boolean;
  }>;
  type: string;
};

const Filter: FC<SingleFilterProps> = ({ title, filterData, type }) => {
  const dispatch = useDispatch();
  const { checked, isTransfer, isNoTransfer, from, till } = useSelector(
    (state: CommonReducersType) => ({
      checked: state.sort.checkedSort,
      isTransfer: state.sort.isTransfer,
      isNoTransfer: state.sort.isNoTransfer,
      from: state.sort.minPrice,
      till: state.sort.maxPrice,
    })
  );

  return (
    <>
      <p className="filter__title">{title}</p>
      <form className="filter__list">
        {filterData.map((item, i) => (
          <span className="filter__item" key={generateKey(i)}>
            {title === "Цена" && `${item.name}`}
            <input className="filter__button"
              type={type}
              id={item.value}
              name={title}
              onChange={(e) => {
                allFiltersHandler(e, dispatch, {
                  sort: checked,
                  filter: {
                    transfer: isTransfer,
                    noTransfer: isNoTransfer,
                  },
                  price: {
                    from: item.value === "from" ? Number(e.target.value) : from,
                    till: item.value === "till" ? Number(e.target.value) : till,
                  },
                });
              }}
              min={title === "Цена" ? 0 : undefined}
              max={title === "Цена" ? 1000000 : undefined}
              defaultChecked={
                ((item.value === checked && title === "Сортировать") ||
                  (item.value === "transfer" &&
                    isTransfer &&
                    title === "Фильтровать") ||
                  (item.value === "notransfer" &&
                    isNoTransfer &&
                    title === "Фильтровать") ||
                  (title === "Авиакомпании" && item.isSelected)) &&
                true
              }
              disabled={title === "Авиакомпании" ? item.isActive : false}
              pattern={title === "Цена" ? "[0-9]+" : undefined}
              value={
                title === "Цена" && item.value === "from"
                  ? from
                  : title === "Цена" && item.value === "till"
                  ? till
                  : ""
              }
            />
            {title !== "Цена" && `- ${item.name}`}{" "}
            {title === "Авиакомпании" && `от ${item.price} руб.`} <br />
          </span>
        ))}
      </form>
    </>
  );
};

export default Filter;