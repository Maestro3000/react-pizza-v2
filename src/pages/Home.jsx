import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

import { SearchContext } from "../App";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Categories, SortMenu, PizzaBlock, Pagination } from "../components";

export function Home() {
  const dispath = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispath(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispath(setCurrentPage(number));
  };

  useEffect(() => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://66ff45472b9aac9c997ebe81.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzasItems = items.map((el) => <PizzaBlock key={el.id} {...el} />);
  const skeletonLoader = [...new Array(6)].map((_, index) => (
    <Skeleton key={_} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <SortMenu />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonLoader : pizzasItems}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}
