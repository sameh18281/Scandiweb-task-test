import {
	CHANGE_PRICE,
	ADD_CART_ITEM,
	CHANGE_QUANTITY,
	CLEAR_CART,
	DROPDOWN_CLICK,
	MINICART_CLICK,
	FILTER_CLICK,
	DATA,
} from "./constants";

export const setCurrency = (text) => ({
	type: CHANGE_PRICE,
	payload: text,
});

export const addItem = (data) => ({
	type: ADD_CART_ITEM,
	payload: data,
});

export const changeQuantity = (data) => ({
	type: CHANGE_QUANTITY,
	payload: data,
});

export const clearCart = () => ({
	type: CLEAR_CART,
});

export const dropdownClick = () => ({
	type: DROPDOWN_CLICK,
});

export const miniCartClick = () => ({
	type: MINICART_CLICK,
});

export const fetchData = (data) => ({
	type : DATA,
	payload : data,
});

export const filterClick =() => ({
	type : FILTER_CLICK,
});
