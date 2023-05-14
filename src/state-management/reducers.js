import {
	CHANGE_PRICE,
	ADD_CART_ITEM,
	CHANGE_QUANTITY,
	CLEAR_CART,
	DROPDOWN_CLICK,
	MINICART_CLICK,
	FILTER_CLICK,
	DATA
} from "./constants";

const initialCurrencyState = {
	currentCurrency: "$",
};

export const setCurrentCurrency = (
	state = initialCurrencyState,
	action = {}
) => {
	switch (action.type) {
	case CHANGE_PRICE:
		return { ...state, currentCurrency: action.payload };
	default:
		return state;
	}
};

const initialCartState = {
	cartProducts: [],
};

export const addCartItem = (state = initialCartState, action = {}) => {
	switch (action.type) {
	case ADD_CART_ITEM:
		return {
			...state,
			cartProducts: state.cartProducts.concat(action.payload),
		};
	case CHANGE_QUANTITY: {
		const index = state.cartProducts.findIndex(
			(product) =>
				product.id === action.payload.id &&
					JSON.stringify(product.attributes) ===
						JSON.stringify(action.payload.attributes)
		);
		const copyArray = [...state.cartProducts];
		if (action.payload.case === "increase") {
			copyArray[index].quantity += 1;
		}
		if (action.payload.case === "decrease") {
			if (copyArray[index].quantity === 1) {
				const deletProduct = copyArray.filter(
					(item) => item !== copyArray[index]
				);
				return { ...state, cartProducts: deletProduct };
			}
			copyArray[index].quantity -= 1;
		}
		return { ...state, cartProducts: copyArray };
	}
	case CLEAR_CART: {
		const clearCart = [];
		return { ...state, cartProducts: clearCart };
	}
	default:
		return state;
	}
};

const initialClickState = {
	isDropdownOpen: false,
	isMiniCartOpen: false,
	isFilterOpen : false,
};

export const handleClicks = (state = initialClickState, action = {}) => {
	switch (action.type) {
	case DROPDOWN_CLICK: {
		const isDropdownOpen = state.isDropdownOpen;
		return { ...state, isDropdownOpen: !isDropdownOpen };
	}
	case MINICART_CLICK: {
		const isMiniCartOpen = state.isMiniCartOpen;
		return { ...state, isMiniCartOpen: !isMiniCartOpen };
	}
	case FILTER_CLICK : {
		const isFilterOpen = state.isFilterOpen;
		return {...state, isFilterOpen : !isFilterOpen};
	}
	default:
		return state;
	}
};

const initialProducts = {
	products : [],
	loading : true,
	error : false,
};

export const fetchData = (state = initialProducts , action = {}) => {
	switch(action.type){
	case DATA : {
		const {products,loading,error} = action.payload;
		return {...state, products, loading, error};
	}
	default :
		return state;
	}
};