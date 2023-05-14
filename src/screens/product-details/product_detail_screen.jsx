import React, { Component } from "react";

import "./product-detail.css";

import ProductImages from "../../components/product-details/product-images";
import ProductDetails from "../../components/product-details/product_details";

import { withGraphQLData } from "../../components/with-data-hoc/with-data";
import { errorMessage, loadingMessage, PRODUCT_DETAIL } from "../../components/with-data-hoc/data-constants";

class ProductDetailScreen extends Component {

	render() {
		const {loading, error} = this.props;
		const product = loading ? [] : this.props.data.product;

		if (loading) return loadingMessage;

		if (error || !product) return errorMessage;

		return (
			//Component container
			<div className="product-details-container">
				<ProductImages product={product} />
				<ProductDetails product={product} />
			</div>
		);
	}
}
export default withGraphQLData(ProductDetailScreen,PRODUCT_DETAIL);
