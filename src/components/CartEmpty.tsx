import { Link } from "react-router-dom";
import imageEmpty from "../../public/empty-cart.png";
import React, { FC } from "react";

export const CartEmpty: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={imageEmpty} alt="Empty cart" />
      <div className="button button--black">
        <Link to={"/"}>
          {" "}
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
