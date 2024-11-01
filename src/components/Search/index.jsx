import debounce from "lodash.debounce";
import React, { useCallback, useContext, useRef, useState } from "react";
import { SearchContext } from "../../App";

import styles from "./search.module.scss";
export function Search() {
	const [value, setValue] = useState("");
	const { searchValue, setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();
	const onClickClear = () => {
		setValue("");
		setSearchValue("");
		inputRef.current.focus();
	};
	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};
	const updateSearchValue = useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 250),
		[],
	);
	return (
		<div className={styles.root}>
			<img
				alt=""
				className={styles.icon}
				src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-512.png"
			/>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Поиск пиццы..."
			/>
			{value && (
				<svg
					onClick={onClickClear}
          onKeyDown={""}
					className={styles.clearIcon}
					version="1.1"
					viewBox="0 0 24 24"
					xmlSpace="preserve"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
				>
          <title>items</title>
					<path
						d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
						id="exit"
					/>
				</svg>
			)}
		</div>
	);
}
