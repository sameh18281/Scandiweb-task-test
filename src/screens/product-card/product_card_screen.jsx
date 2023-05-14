import React, { Component } from "react";

import "./product-card.css";

import ProductCard from "../../components/product-card/product-card";
import Filter from "../../components/filter/filter";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		currentCurrency: state.setCurrentCurrency.currentCurrency,
		fetchData: state.fetchData,
	};
};

class ProductCardScreen extends Component {
	renderProducts = (products, currentCurrency) => {
		return products.map((product, index) => {
			return (
				<ProductCard
					key={index}
					id={product.id}
					name={product.name}
					url={product.gallery[0]}
					inStock={product.inStock}
					brand={product.brand}
					attributes={product.attributes}
					product={product}
					price={
						product.prices.filter(
							(item) => item.currency.symbol === currentCurrency
						)[0]
					}
				/>
			);
		});
	};

	render() {
		const {category} = this.props;
		const {products} = this.props.fetchData;
		const params = new URLSearchParams(location.search);

		let isSearchEmpty = location.search.toString() === '';

		let categorizedProducts =
			category === "all"
				? products
				: products.filter((product) => product.category === category);

		let filteredProducts = [];

		products.map(product => params.forEach((parValue,parKey) => {
			product.attributes.map(attribute => {
				if(attribute.name === parKey.replaceAll('-',' ') && (attribute.items.some(item => item.value === parValue))){
					if(!JSON.stringify(filteredProducts).includes(product.id)){
						filteredProducts.push(product);
					}
				}
			});
		}));
		
		if (categorizedProducts.length === 0)
			return <div className="loading"> Oops ! looks like store is empty !</div>;

		return (
			<React.Fragment>
				<h1 className="category-name">{isSearchEmpty ?`${category} Category` : 'Filtered products'}</h1>
				<Filter products={categorizedProducts} />
				{this.renderProducts(isSearchEmpty ? categorizedProducts : filteredProducts, this.props.currentCurrency)}
			</React.Fragment>
		);
	}
}
export default connect(mapStateToProps)(ProductCardScreen);
