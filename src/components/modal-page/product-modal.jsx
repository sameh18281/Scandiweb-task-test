import React, { Component } from "react";

import ProductAttributes from "../product-details/product-attributes";
import { addItem, changeQuantity } from "../../state-management/actions";
import {addToCartMessage,quantityIncMessage,sortObject} from "../with-data-hoc/data-constants";
import "./modal-page.css";

import { connect } from "react-redux";

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

class ProductModal extends Component {
	setAttribute = (attributeName, attributeValue) => {
		this.setState({ [attributeName]: attributeValue });
	};

	allAttributesSelected = () => {
		if (
			this.state === null ||
			Object.keys(this.state).length < this.props.attributes.length
		) {
			return "please, select attributes first";
		}
		if (Object.keys(this.state).length === this.props.attributes.length) {
			return true;
		}
	};

	addOrIncreaseCart = () => {
		if (this.allAttributesSelected() === true) {
			const productID = this.props.product.id;
			const currentAttributes = sortObject(this.state);
			const productExist = this.props.cartProducts.filter(
				(cartItem) =>
					cartItem.id === productID &&
					JSON.stringify(cartItem.attributes) ===
						JSON.stringify(currentAttributes)
			);
			if (productExist.length === 0) {
				this.props.addItem({
					id: productID,
					quantity: 1,
					attributes: currentAttributes,
				});
				this.props.changeModalBoolean();
				this.props.showMessage(addToCartMessage);
				return;
			} else {
				this.props.changeQuantity({
					id: productID,
					case: "increase",
					attributes: currentAttributes,
				});
				this.props.changeModalBoolean();
				this.props.showMessage(quantityIncMessage);
				return;
			}
		} else {
			return;
		}
	};

	confirmClass = () => {
		return this.allAttributesSelected() === true ? 'confirm' : null;
	};

	render() {
		let { selectAttributes } = this.props;
		return (
			<div className={`products-overlay ${selectAttributes ? "active" : null}`}>
				<div className="products-modal">
					{this.allAttributesSelected() !== true ? (
						<p className="attribute-error">{this.allAttributesSelected()}</p>
					) : null}
					<ProductAttributes
						attributes={this.props.attributes}
						product={this.props.product}
						updateState={this.setAttribute}
					/>
					<button className={`confirm-btn ${this.confirmClass()}`} disabled={!this.allAttributesSelected()} onClick={this.addOrIncreaseCart}>
						confirm
						<div className={`btn-bg ${this.confirmClass()}`} ></div>
					</button>
					<button onClick={this.props.changeModalBoolean} className="close-btn">
						x
					</button>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
