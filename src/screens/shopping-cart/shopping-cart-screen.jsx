import React, { Component } from "react";

import "./shopping-cart.css";
import ShoppingCart from "../../components/mini-shopping-cart/shopping-cart";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		currentCurrency: state.setCurrentCurrency.currentCurrency,
		cartProducts: state.addCartItem.cartProducts,
		fetchData: state.fetchData,
	};
};

class ShoppingCartScreen extends Component {
	renderCartItems = (cartProducts, products) => {
		return cartProducts.map((cartItem, index) => (
			<React.Fragment key={index}>
				<div className="shopping-cart-item">
					<ShoppingCart
						isMini={false}
						productID={cartItem.id}
						quantity={cartItem.quantity}
						attributes={cartItem.attributes}
						products={products}
					/>
				</div>
				<hr></hr>
			</React.Fragment>
		));
	};

	render() {
		const { cartProducts} = this.props;
		const { products } = this.props.fetchData;

		if (cartProducts.length === 0)
			return <div className="loading"> Your cart is empty ...</div>;

		return (
			<div className="shopping-cart-container">
				<p>Cart</p>
				<hr></hr>
				{this.renderCartItems(cartProducts, products)}
				<div className="main-cart-btn">
					<button onClick={this.props.clearCart} className="checkout">
						checkout
					</button>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(ShoppingCartScreen);
