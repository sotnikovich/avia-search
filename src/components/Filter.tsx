import { FC } from "react";
import { generateKey } from "../filters/filters";
import { useDispatch, useSelector } from "react-redux";
import { allFiltersHandler } from "../utils/utils";
import { CommonReducersType } from "../store/reducers/index";

type FilterProps = {
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

const Filter: FC<FilterProps> = ({ title, filterData, type }) => {
  const dispatch = useDispatch();
  const { checked, isTransfer, isNoTransfer } = useSelector(
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
      <h2 className="filter__title">{title}</h2>
      <form className="filter__list">
        {filterData.map((item, i) => (
          <span className="filter__item" key={generateKey(i)}>
            <input
              className="filter__button"
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
