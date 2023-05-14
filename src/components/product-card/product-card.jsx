import React, { Component } from "react";

import cart from ".//cart-icon.png";

import {
	changeQuantity,
	addItem,
	clearCart,
} from "../../state-management/actions";
import {
	quantityIncMessage,
	addToCartMessage,
} from "../with-data-hoc/data-constants";
import ModalPage from "../modal-page/modal-page";
import ProductModal from "../modal-page/product-modal";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		cartProducts: state.addCartItem.cartProducts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeQuantity: (id) => dispatch(changeQuantity(id)),
		addItem: (id) => dispatch(addItem(id)),
		clearCart: () => dispatch(clearCart()),
	};
};

class ProductCard extends Component {
	state = {
		data: {
			modalMessage: "",
			isOpen: false,
			selectAttributes: false,
		},
	};

	addToCart = (id) => {
		let data = { ...this.state.data };
		const product = this.props.cartProducts.filter(
			(item) => item.id === this.props.id
		);

		if (this.props.product.attributes.length === 0) {
			if (product.length === 0) {
				this.props.addItem({
					id: id,
					quantity: 1,
					attributes: "",
				});
				data.modalMessage = addToCartMessage;
				data.isOpen = true;
				this.setState({ data });
				return;
			} else {
				this.props.changeQuantity({
					id: id,
					case: "increase",
					attributes: "",
				});
				data.modalMessage = quantityIncMessage;
				data.isOpen = true;
				this.setState({ data });
				return;
			}
		} else {
			data.selectAttributes = true;
			this.setState({ data });
			return;
		}
	};

	changeModalBoolean = () => {
		this.setState((state) => {
			let data = { ...state.data };
			if (data.selectAttributes) {
				data.selectAttributes = !data.selectAttributes;
				return { data };
			}
		});

		this.setState((state) => {
			let data = { ...state.data };
			if (data.isOpen) {
				data.isOpen = !data.isOpen;
				return { data };
			}
		});
	};

	showMessage = (message) => {
		this.setState((state) => {
			let data = { ...state.data };
			if (!data.isOpen) {
				data.isOpen = !data.isOpen;
				data.modalMessage = message;
				return { data };
			}
		});
	};

	render() {
		const { name, url, price, id, brand, inStock, attributes } = this.props;
		return (
			<React.Fragment>
				<div className={`card ${this.props.inStock ? null : "out-of-stock"}`}>
					{inStock ? null : <span className="out-span">out of stock</span>}
					<Link className="link" to={`products/${id}`}>
						<div className="card-img">
							<img alt={name} src={url} />
						</div>

						<div className="product-details">
							<p className="product-name">
								{brand + ""} {name}
							</p>
							<p className="product-price">
								{price.currency.symbol + parseFloat(`${price.amount}`).toFixed(2) }
							</p>
						</div>
					</Link>

					{inStock ? (
						<button onClick={() => this.addToCart(id)} className="add-to-cart">
							<img width="100%" src={cart} alt="cart" />
						</button>
					) : null}
				</div>

				<ProductModal
					selectAttributes={this.state.data.selectAttributes}
					attributes={attributes}
					product={this.props.product}
					changeModalBoolean={this.changeModalBoolean}
					showMessage={this.showMessage}
				/>
				<ModalPage
					changeModalBoolean={this.changeModalBoolean}
					modalMessage={this.state.data.modalMessage}
					isOpen={this.state.data.isOpen}
				/>
			</React.Fragment>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
