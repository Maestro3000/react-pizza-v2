import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setListSortItems} from "../redux/slices/Filter";
import {SortPropertyEnum} from "../redux/slices/Filter/filterSlice";

type listOptionsItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};


export const listOptions: listOptionsItem[] = [
  {name: "попопулярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC},
  {name: "попопулярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC},
  {name: "цене (DESC)", sortProperty: SortPropertyEnum.PRISE_DESC},
  {name: "цене (ASC)", sortProperty: SortPropertyEnum.PRISE_ASC},
  {name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC},
  {name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC},
];

export function SortMenu() {
  const dispatch = useDispatch();
  const {sort} = useSelector(selectFilter);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const onClickListItems = (obj: listOptionsItem) => {
    dispatch(setListSortItems(obj));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // @ts-ignore
    document.addEventListener("mousedown", handleClickOutside);
    // @ts-ignore
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Sort</title>
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <button onClick={() => setIsOpen(!isOpen)} type="button">
          <span>{sort.name}</span>
        </button>
      </div>
      {isOpen && (
        <button
          type="button"
          ref={popupRef}
          onClick={() => setIsOpen(false)}
          className="sort__popup"
        >
          <ul>
            {listOptions.map((obj, _i) => (
              <button
                key={JSON.stringify(obj)}
                onClick={() => onClickListItems(obj)}
                type="button"
              >
                <li
                  className={sort.sortProperty === obj.sortProperty && "active"}
                >
                  {obj.name}
                </li>
              </button>
            ))}
          </ul>
        </button>
      )}
    </div>
  );
}
