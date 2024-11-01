import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza, removePizza } from "../../redux/slices/counterSlice";

export const PizzaBlock = (props) => {
	const { imageUrl, title, price, sizes, types, id } = props;
	const dispatch = useDispatch();
	const { arrPizzas } = useSelector((state) => state.counter);
	const [pizzaOptions, setPizzaOptions] = useState(0);
	const [pizzaSizes, setPizzaSizes] = useState(0);

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

	function addPizzaWithId() {
		dispatch(addPizza(id));
	}

	function removePizzaWithId() {
		dispatch(removePizza(id));
	}

	const pizzaCount = arrPizzas.filter((el) => el === id).length;

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
								onKeyDown={""}
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
								onKeyDown={""}
							>
								{el} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<div className="button button--outline button--add">
						<i onClick={removePizzaWithId} onKeyDown={""}>
							-
						</i>
						<span>{pizzaCount}</span>
						<i onClick={addPizzaWithId} onKeyDown={""}>
							+
						</i>
					</div>
				</div>
			</div>
		</div>
	);
};
