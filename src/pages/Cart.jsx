import React from "react";
import { CartItem } from "../components";
import { Header } from "../components";
import { Link } from "react-router-dom";
export const Cart = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <img src="/cart.svg" /> Корзина
              </h2>
              <div className="cart__clear">
                <img src="/trash.svg" />
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
              <CartItem />
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Всего пицц: <b>3 шт.</b>
                </span>
                <span>
                  Сумма заказа: <b>900 ₽</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to={"/"}
                  className="button button--outline button--add go-back-btn"
                >
                  <img src="/grey-arrow-left.svg" />
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
