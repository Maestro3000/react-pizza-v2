import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cart from "../../public/cart-items.png";
import { CartEmpty, CartItem } from "../components";
import { clearItems } from "../redux/slices/Cart/index.js";
import { selectCart } from "../redux/slices/Cart/selector";

export const Cart = () => {
  const dispatch = useDispatch();
  const {totalPrice, items} = useSelector( selectCart );
  const totalCount = items.reduce( ( sum, item ) => sum + item.count, 0 );

  const onClickClear = () => {
    if (
      window.confirm( "Вы действительно хотите удалить все товары из корзины?" )
    ) {
      dispatch( clearItems() );
    }
  };

  if ( !totalPrice ) {
    return <CartEmpty/>;
  }

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img alt="" src={ cart }/> Корзина
        </h2>
        <button
          type="button"
          onClick={ onClickClear }
          className="cart__clear"
        >
          <img alt="" src="/trash.svg"/>
          <span>Очистить корзину</span>
        </button>
      </div>
      <div className="content__items">
        { items.map( ( item ) => (
          <CartItem key={ item.id } { ...item } />
        ) ) }
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
                <span>
                  Всего пицц: <b>{ totalCount } шт.</b>
                </span>
          <span>
                  Сумма заказа: <b>{ totalPrice } ₽</b>
                </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to={ "/" }
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
