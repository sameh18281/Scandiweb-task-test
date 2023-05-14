import React, { Component } from "react";

import "./mini-shopping-cart.css";
import ShoppingCart from "./shopping-cart";
import cart from "./shopping-cart.png";
import { clearCart, miniCartClick, filterClick, dropdownClick} from "../../state-management/actions";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		isFilterOpen : state.handleClicks.isFilterOpen,
		isMiniCartOpen: state.handleClicks.isMiniCartOpen,
		isDropdownOpen : state.handleClicks.isDropdownOpen,
		currentCurrency: state.setCurrentCurrency.currentCurrency,
		cartProducts: state.addCartItem.cartProducts,
		fetchData: state.fetchData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		filterClick: () => dispatch(filterClick()),
		handleMiniCart: () => dispatch(miniCartClick()),
		handleDropdown: () => dispatch(dropdownClick()),
		clearCart: () => dispatch(clearCart()),
	};
};

class MiniShoppingCart extends Component {

	renderCartProducts = (cartProducts,products) => {
		return cartProducts.map((cartItem, index) => (
			<React.Fragment key={index}>
				<div className="mini-cart-items">
					<ShoppingCart
						isMini={true}
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

	handleClicks = () => {
		this.props.handleMiniCart();

		if (this.props.isDropdownOpen){
			this.props.handleDropdown();
		}
		if(this.props.isFilterOpen){
			this.props.filterClick();
		}
	};

	numberOfCartItems = () => {
		let numberOfCartItems = 0;
		this.props.cartProducts.forEach(
			(cartItem) => (numberOfCartItems += cartItem.quantity)
		);
		return numberOfCartItems;
	};

	cartTotalPrice = (products) => {
		let cartTotal = 0;
		this.props.cartProducts.forEach((cartItem) => {
			const currentCartItem = products.filter(
				(product) => product.id === cartItem.id
			);
			const currentCartPrice = currentCartItem[0].prices.filter(
				(price) => price.currency.symbol === this.props.currentCurrency
			)[0].amount;
			cartTotal += currentCartPrice * cartItem.quantity;
		});
		return cartTotal;
	};

	render() {
		const { cartProducts, isMiniCartOpen,} = this.props;
		const products = this.props.fetchData.products;
		const numberOfCartItems = this.numberOfCartItems();
		const cartTotal = this.cartTotalPrice(products);

		return (
			<React.Fragment>
				<div className="nav-shopping-cart">
					{/* MiniCart icon */}
					<button  onClick={() => this.handleClicks()}
						className="nav-cart-btn"
					>
						<img className="img" src={cart} alt="cart" height="20vh" />
						<div className="cart-info">{numberOfCartItems}</div>
					</button>

					{/* MiniCart body */}
					<div className={`mini-cart ${isMiniCartOpen ? "cart-active" : null}`}>
						{cartProducts.length === 0 ? (
							<div className="mini-empty">Your cart is empty ...</div>
						) : (
							<React.Fragment>
								{/* MiniCart info */}
								<p className="my-bag">
									My Bag.{" "}
									<span className="no-of-items">{numberOfCartItems} items</span>
								</p>

								{/* MiniCart product item */}
								{this.renderCartProducts(cartProducts,products)}

								{/* MiniCart bottom section (check out & View bag & total) */}
								<div className="total">
									<p id="total-p">Total :</p>
									<p id="total-number">
										{this.props.currentCurrency + cartTotal.toFixed(2)}
									</p>
								</div>
								<div className="mini-cart-btns">
									<Link className="link" to="/cart">
										<button onClick={()=> this.handleClicks()} className="view-bag">
											view bag
										</button>
									</Link>

									<button onClick={this.props.clearCart} className="checkout">
										check out
									</button>
								</div>
							</React.Fragment>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MiniShoppingCart);
