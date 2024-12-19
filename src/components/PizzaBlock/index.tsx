import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/slices/Cart";
import {selectCartItemById} from "../../redux/slices/Cart/selector";
import type {CartItem} from "../../redux/slices/Cart/cartSlice.js";
import {Link} from "react-router-dom";

type PizzaBlockProps = {
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: string[];
  id: number;
};
export const PizzaBlock: FC<PizzaBlockProps> = ({imageUrl, title, price, sizes, types, id,}) => {
  const [pizzaOptions, setPizzaOptions] = useState(0);
  const [pizzaSizes, setPizzaSizes] = useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  // @ts-ignore
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = (e) => {
    e.preventDefault();
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypes[pizzaOptions],
      size: sizes[pizzaSizes],
      count: 0
    };
    dispatch(addItem(item));
  };

  const pizzaTypes = {
    0: "тонкое",
    1: "традиционное",
  };

  function clickSizePizzas(options: any) {
    setPizzaSizes(options);
  }

  function clickPizzaOptions(properties: any) {
    setPizzaOptions(properties);
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el, index) => (
              <button
                type="button"
                key={`${id}-type-${el}`}
                onClick={() => clickPizzaOptions(index)}
              >
                <li className={pizzaOptions === index ? "active" : ""}>
                  {pizzaTypes[el]}
                </li>
              </button>
            ))}
          </ul>
          <ul>
            {sizes.map((el, index) => (
              <button
                key={`${id}-size-${el}`}
                type="button"
                onClick={() => clickSizePizzas(index)}
              >
                <li className={pizzaSizes === index ? "active" : ""}>
                  {el} см.
                </li>
              </button>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            type="button"
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <i>+</i>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
