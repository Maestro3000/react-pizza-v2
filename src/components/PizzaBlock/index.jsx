import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
export const PizzaBlock = (props) => {
  const { imageUrl, title, price, sizes, types, id } = props;
  const [pizzaOptions, setPizzaOptions] = useState(0);
  const [pizzaSizes, setPizzaSizes] = useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypes[pizzaOptions],
      size: sizes[pizzaSizes],
    };
    dispatch(addItem(item));
  };

  const pizzaTypes = {
    0: "тонкое",
    1: "традиционное",
  };

  function clickSizePizzas(options) {
    setPizzaSizes(options);
  }

  function clickPizzaOptions(properties) {
    setPizzaOptions(properties);
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el, index) => (
              <li
                key={`${id}-type-${el}`}
                className={pizzaOptions === index ? "active" : ""}
                onClick={() => clickPizzaOptions(index)}
              >
                {pizzaTypes[el]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((el, index) => (
              <li
                key={`${id}-size-${el}`}
                className={pizzaSizes === index ? "active" : ""}
                onClick={() => clickSizePizzas(index)}
              >
                {el} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <i>+</i>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};
