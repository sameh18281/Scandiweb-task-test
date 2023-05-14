import React, { Component } from "react";

import CartDetails from "./cart-details";
import CartImage from "./cart-image";


class ShoppingCart extends Component {

	render() {
		const {products, productID} = this.props;
		const product = products.filter(product => product.id === productID)[0];

		return (
			<React.Fragment>
				<CartDetails
					isMini={this.props.isMini}
					product={product}
					quantity={this.props.quantity}
					attributes={this.props.attributes}
				/>
				<CartImage isMini={this.props.isMini} product={product} />
			</React.Fragment>
		);
	}
}

export default ShoppingCart;
