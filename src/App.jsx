import { Header, Categories, SortMenu, PizzaBlock } from "./components";
import React, { useState, useEffect } from "react";
import Skeleton from "./components/PizzaBlock/Skeleton";
export function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://66ff45472b9aac9c997ebe81.mockapi.io/items")
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <SortMenu />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((el) => <PizzaBlock key={el.id} {...el} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
