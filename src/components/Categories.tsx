import React, { FC } from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

export const Categories: FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const category = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {category.map((categoryName, index) => (
          <button
            type="button"
            onClick={() => onClickCategory(index)}
            key={index + categoryName}
          >
            <li className={value === index ? "active" : ""}>{categoryName}</li>
          </button>
        ))}
      </ul>
    </div>
  );
};
