import React from "react";
import { useState } from "react";
export function Categories() {
  const [stateCategory, setStatecategory] = useState(0);

  const category = [
    "Все",
    "Мясные",
    "Вегатарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  function clickCategory(propertie) {
    setStatecategory(propertie);
  }

  return (
    <div className="categories">
      <ul>
        {category.map((el, index) => (
          <li
            key={el + "-" + index}
            className={stateCategory === index ? "active" : ""}
            onClick={() => clickCategory(index)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
