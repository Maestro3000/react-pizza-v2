import { Categories, SortMenu, PizzaBlock, Pagination } from "../components";
import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../App";
import Skeleton from "../components/PizzaBlock/Skeleton";

export function Home() {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "попопулярности",
    sort: "rating",
  });

  useEffect(() => {
    const order = sortType.sort.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    fetch(
      `https://66ff45472b9aac9c997ebe81.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    )
      .then((response) => response.json())
      .then((res) => {
        if (typeof res === "string") {
          setItems([]);
          setIsLoading(false);

          return;
        }
        setItems(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzasItems = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((el) => <PizzaBlock key={el.id} {...el} />);
  const skeletonLoader = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <SortMenu value={sortType} fnSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonLoader : pizzasItems}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}
