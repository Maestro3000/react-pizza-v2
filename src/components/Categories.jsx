import React from "react";
export function Categories({ value, onClickCategory }) {
  const category = [
    "Все",
    "Мясные",
    "Вегатарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {category.map((categoryName, index) => (
          <li
            key={categoryName + "-" + index}
            className={value === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
