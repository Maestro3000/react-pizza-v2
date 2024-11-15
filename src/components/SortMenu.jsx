import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setListSortItems } from "../redux/slices/filterSlice";

export  const listOptions = [
  { name: "попопулярности (DESC)", sortProperty: "rating" },
  { name: "попопулярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];
export function SortMenu() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef(null);

 

  const onClickListItems = (obj) => {
    dispatch(setListSortItems(obj));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
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
        <span onClick={() => setIsOpen(!isOpen)} /* onKeyDown={""} */>{sort.name}</span>
      </div>
      {isOpen && (
        <div
          ref={popupRef}
          onClick={() => setIsOpen(false)}
          /* onKeyDown={""} */
          className="sort__popup"
        >
          <ul>
            {listOptions.map((obj, i) => (
              <li
                key={obj}
                className={sort.sortProperty === obj.sortProperty && "active"}
                onClick={() => onClickListItems(obj)}
               /*  onKeyDown={""} */
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
