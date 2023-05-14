import React, { Component } from "react";

import ProductAttributes from "./product-attributes";
import ModalPage from "../modal-page/modal-page";
import { addItem, changeQuantity } from "../../state-management/actions";
import { addToCartMessage,quantityIncMessage, sortObject } from "../with-data-hoc/data-constants";

import { connect } from "react-redux";
import DOMPurify from "dompurify";

const mapStateToProps = (state) => {
	return {
		currentCurrency: state.setCurrentCurrency.currentCurrency,
		cartProducts: state.addCartItem.cartProducts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (data) => dispatch(addItem(data)),
		changeQuantity: (id) => dispatch(changeQuantity(id)),
	};
};

class ProductDetails extends Component {
	state = {
		data: {
			attributesLength: this.props.product.attributes.length,
			modalMessage: "",
			isOpen: false,
		},
	};

	setAttribute = (attributeName, attributeValue) => {
		this.setState({ [attributeName]: attributeValue });
	};

	addToCart = (id) => {
		let data = { ...this.state.data };
		const product = this.props.cartProducts.filter((item) => item.id === id);
		const attributes = Object.entries(this.state).filter(([key]) => key !== "data");

		if (Object.keys(this.state).length === 1 && this.state.data.attributesLength > 0 ) {
			data.modalMessage = "Please, select product attributes";
			this.setState({ data });
			return;
		}

		if (Object.keys(this.state).length - 1 < this.state.data.attributesLength) {
			data.modalMessage = 'please, select "ALL" product attributes!';
			this.setState({ data });
			return;
		}

		if (product.length === 0) {
			if (this.state.data.attributesLength === 0) {
				this.props.addItem({
					id: id,
					quantity: 1,
					attributes: '',
				});
				data.modalMessage = addToCartMessage;
				this.setState({ data });
				return;
			}

			if (Object.keys(this.state).length - 1 ===this.state.data.attributesLength) {
				this.props.addItem({
					id: id,
					quantity: 1,
					attributes: sortObject(Object.fromEntries(attributes)),
				});
				data.modalMessage = addToCartMessage;
				this.setState({ data });
				return;
			}
		}

		if (product.length !== 0) {
			let productWithExistingAttributes;

			product.forEach((existingProduct) => {
				if (
					JSON.stringify(sortObject(Object.fromEntries(attributes))) ===
					JSON.stringify(existingProduct.attributes)
				) {
					productWithExistingAttributes = existingProduct;
				}
			});
			
			if (this.state.data.attributesLength === 0) {
				this.props.changeQuantity({
					id: id,
					case: "increase",
					attributes: '',
				});
				data.modalMessage = quantityIncMessage;
				this.setState({ data });
				return;
			}

			if (productWithExistingAttributes === undefined) {
				this.props.addItem({
					id: id,
					quantity: 1,
					attributes: sortObject(Object.fromEntries(attributes)),
				});
				data.modalMessage =	addToCartMessage;
				this.setState({ data });
				return;
			} else {
				this.props.changeQuantity({
					id: id,
					case: "increase",
					attributes: sortObject(Object.fromEntries(attributes)),
				});
				data.modalMessage = quantityIncMessage;
				this.setState({ data });
				return;
			}
		}
	};

	changeModalBoolean = () => {
		this.setState((state) => {
			let data = { ...state.data };
			data.isOpen = !data.isOpen;
			return { data };
		});
	};

	render() {
		const { product } = this.props;
		const price = product.prices.filter((item) => item.currency.symbol === this.props.currentCurrency)[0];
		
		return (
			<React.Fragment>
				<div className="details">
					<div>
						<h2 className="brand-name">{product.brand}</h2>
						<h3 className="product-name">{product.name}</h3>
					</div>

					<ProductAttributes
						updateState={this.setAttribute}
						attributes={product.attributes}
						product={product}
					/>

					<div className="price">
						<p>price :</p>
						<p>{price.currency.symbol + parseFloat(`${price.amount}`).toFixed(2)}</p>
					</div>

					<div className="details-btn">
						<button
							className={product.inStock ? null : "disabled"}
							disabled={product.inStock ? false : true}
							onClick={() => {
								this.addToCart(product.id);
								this.changeModalBoolean();
							}}
						>
							{product.inStock ? "add to cart" : "out of stock"}
						</button>
					</div>

					<div
						className="description"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(product.description),
						}}
					></div>

					<ModalPage
						isOpen={this.state.data.isOpen}
						modalMessage={this.state.data.modalMessage}
						changeModalBoolean={() => this.changeModalBoolean()}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
