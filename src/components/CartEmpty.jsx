import { Link } from "react-router-dom";
import { Header } from "./Header";
import imageEmpty from "../../public/empty-cart.png";
export const CartEmpty = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>
              Корзина пустая <icon>😕</icon>
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
        </div>
      </div>
    </div>
  );
};
