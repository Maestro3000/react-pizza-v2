import qs from "qs";
import React, {FC, useRef} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Categories, Pagination, PizzaBlock, SortMenu} from "../components";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {listOptions} from "../components/SortMenu.js";

import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/Filter";
import {selectSearch} from "../redux/slices/Search";
import {selectPizza} from "../redux/slices/Pizza";
import {fetchPizzas, type SearchPizzaParams} from "../redux/slices/Pizza/pizzaSlice";
import {useAppDispatch} from "../redux/store";

export const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(null);
  const isMounted = useRef(null);

  // @ts-ignore
  const {categoryId, sort, currentPage} = useSelector(selectFilter);
  // @ts-ignore
  const {value} = useSelector(selectSearch);

  const {items, status} = useSelector(selectPizza);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = value ? `search=${value}` : "";

    dispatch(fetchPizzas({order, sortBy, category, search, currentPage}));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = listOptions.find(
        (obj) => obj.sortProperty === params.sortBy,
      );
      console.log(sort)
      dispatch(
        setFilters({
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          value: params.search,
          sort: sort || listOptions[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, value, currentPage]);

  React.useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, value, currentPage])

  const pizzaItems = items.map((el: any) => (

    <PizzaBlock {...el} />

  ));
  const skeletonLoader = [...new Array(6)].map((el, index) => (
    <Skeleton key={Math.random()}/>
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory}/>
        <SortMenu/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2> Произошла ошибка 😕</h2>
          <p>
            К сожалению не удалось получить пиццы, попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items" /* key={index} */>
          {status === "loading" ? skeletonLoader : pizzaItems}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  );
};
