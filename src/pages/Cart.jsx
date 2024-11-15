import React from "react";
import { CartEmpty, CartItem } from "../components";
import { Header } from "../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../redux/slices/cartSlice";
import cart from "../../public/cart-items.png";
export const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (
      window.confirm("Вы действительно хотите удалить все товары из корзины?")
    ) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <img alt="" src={cart} /> Корзина
              </h2>
              <div onClick={onClickClear} className="cart__clear">
                <img alt="" src="/trash.svg" />
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
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
                  <img alt="" src="/grey-arrow-left.svg" />
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
