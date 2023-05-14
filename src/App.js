import React, { Component } from "react";
import "./App.css";
import ProductDetailScreen from "./screens/product-details/product_detail_screen";
import ProductCardScreen from "./screens/product-card/product_card_screen";
import Navigation from "./components/navigation/navigation";
import ShoppingCartScreen from "./screens/shopping-cart/shopping-cart-screen";
import {dropdownClick,miniCartClick,fetchData,} from "./state-management/actions";
import {ALL_DATA,errorMessage,loadingMessage,} from "./components/with-data-hoc/data-constants";

import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		isDropdownOpen: state.handleClicks.isDropdownOpen,
		isMiniCartOpen: state.handleClicks.isMiniCartOpen,
		fetchData: state.fetchData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleMiniCart: () => dispatch(miniCartClick()),
		handleDropdown: () => dispatch(dropdownClick()),
		fetchProducts: (data) => dispatch(fetchData(data)),
	};
};

class App extends Component {
	state = {
		currenctCategory: "all",
	};

	handleCategory = (category) => {
		this.setState({
			currenctCategory: category,
		});	
	};

	componentDidMount() {
		this.fetchProducts();
	}

	fetchProducts = async () => {
		try {
			const data = await this.props.client.query({
				query: ALL_DATA,
			});
			this.props.fetchProducts({
				products: data.data.category.products,
				loading: data.loading,
				error: false,
			});
		} catch (error) {
			this.props.fetchProducts({
				products: [],
				loading: false,
				error: true,
			});
		}
	};

	render() {
		const { currenctCategory } = this.state;
		const { isMiniCartOpen, isDropdownOpen, handleDropdown, handleMiniCart } = this.props;
		const {loading, error } = this.props.fetchData;

		if (loading) return loadingMessage;

		if (error) return errorMessage;

		return (
			<div className="App">
				<Navigation onClick={this.handleCategory} category={currenctCategory} />
				<div className="content-container">
					<div
						className={`cart-overlay ${isMiniCartOpen ? "active" : null}`}
						onClick={isMiniCartOpen ? handleMiniCart : null}
					></div>
					<div
						className={`dropdown-overlay ${isDropdownOpen ? "active" : null}`}
						onClick={isDropdownOpen ? handleDropdown : null}
					></div>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<div className="products-container">
									<ProductCardScreen category={currenctCategory} />
								</div>
							}
						/>

						<Route
							exact
							path="/products/:productID"
							element={<ProductDetailScreen />}
						/>

						<Route
							exact
							path="/cart"
							element={<ShoppingCartScreen />}
						/>

						<Route exact path="/home" element={<Navigate replace to="/" />} />

					</Routes>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
