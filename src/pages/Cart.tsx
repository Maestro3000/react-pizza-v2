import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cart from "../../public/cart-items.png";
import {CartEmpty, CartItemBlock} from "../components";
import {clearItems, selectCart} from "../redux/slices/Cart";
import React, {FC} from "react";

export const Cart: FC = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const {totalPrice, items} = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0,
  );

  const onClickClear = () => {
    if (
      window.confirm("Вы действительно хотите удалить все товары из корзины?")
    ) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty/>;
  }

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img alt="" src={cart}/> Корзина
        </h2>
        <button type="button" onClick={onClickClear} className="cart__clear">
          <img alt="" src="/trash.svg"/>
          <span>Очистить корзину</span>
        </button>
      </div>
      <div className="content__items">
        {items.map((item: any) => (
          <CartItemBlock key={item.id} {...item} />
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to={"/"}
            className="button button--outline button--add go-back-btn"
          >
            <img alt="" src="/grey-arrow-left.svg"/>
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};
