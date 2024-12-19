import {useDispatch} from "react-redux";
import {addItem, minusItem, removeItem} from "../redux/slices/Cart";
import React, {FC} from "react";
import type {CartItem} from "../redux/slices/Cart/cartSlice";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};

export const CartItemBlock: FC<CartItemProps> = ({id, title, price, count, imageUrl, type, size,}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItem),
    );
  };

  const onClickMinus = () => {
    if (count !== 0) {
      dispatch(minusItem(id));
    } else if (!count) {
      dispatch(removeItem(id));
    }
  };

  const onClickRemoveItem = () => {
    if (window.confirm("Вы действительно хотите удалить товар из корзины?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          type="button"
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <img alt="" src="/minus.svg"/>
        </button>
        <b>{count}</b>
        <button
          type="button"
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <img alt="" src="/plus.svg"/>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button
          type="button"
          onClick={onClickRemoveItem}
          className="button button--outline button--circle"
        >
          <img alt="" src="/close.svg"/>
        </button>
      </div>
    </div>
  );
};
