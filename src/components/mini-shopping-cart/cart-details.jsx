import React, { Component } from "react";

import { changeQuantity } from "../../state-management/actions";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		currentCurrency: state.setCurrentCurrency.currentCurrency,
		cartProducts: state.addCartItem.cartProducts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeQuantity: (data) => dispatch(changeQuantity(data)),
	};
};

class CartDetails extends Component {


	changeQuantity = (id, increaseOrDecrease, prodAttributes) => {
		console.log(this.props.attributes);
		this.props.changeQuantity({ id: id, case: increaseOrDecrease, attributes: prodAttributes}); 
	};

	renderCartItemAttributes = () => {
		return Object.entries(this.props.attributes).map(([key, value], index) => (
			<div key={index}>
				<p>{key} : </p>
				<button
					style={key === "Color" ? { backgroundColor: value } : null}
					className={key === "Color" ? "color" : null}
				>
					{key === "Color" ? "" : value}
				</button>
			</div>
		));
	};

	getProductPrice = () => {
		return this.props.product.prices.filter(
			(priceItem) => priceItem.currency.symbol === this.props.currentCurrency
		)[0];
	};

	render() {
		const { product, isMini } = this.props;
		const price = this.getProductPrice();

		return (
			<div className={`${isMini ? "mini-cart-details" : "main-cart-details"}`}>
				<div className="first-section">
					<div>
						<p className="cart-brand" >{product.brand}</p>
						<p className="cart-product" >{product.name}</p>
					</div>

					<div>
						<p className="cart-price">
							{price.currency.symbol + price.amount}
						</p>
					</div>

					<div className="mini-size-btns">
						{this.renderCartItemAttributes()}
					</div>
				</div>

				<div className="second-section">
					<button
						className="plus-btn"
						onClick={() => this.changeQuantity(product.id, "increase", this.props.attributes)}
					>
						+
					</button>

					<p className="mini-cart-quantity">{this.props.quantity}</p>

					<button
						className="minus-btn"
						onClick={() => this.changeQuantity(product.id, "decrease",this.props.attributes)}
					>
						-
					</button>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);
