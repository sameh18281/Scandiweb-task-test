import React, { Component } from "react";

import "./navigation.css";
import logo from "./logo.png";

import DropdownMenu from "../dropdown/dropdownMenu";
import MiniShoppingCart from "../mini-shopping-cart/mini-shopping-cart";

import { withGraphQLData } from "../with-data-hoc/with-data";
import { dropdownClick, miniCartClick } from "../../state-management/actions";
import { CATEGORIES, errorMessage, loadingMessage } from "../with-data-hoc/data-constants";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
	return {
		currentCurrency: state.setCurrentCurrency.currentCurrency,
		isMiniCartOpen: state.handleClicks.isMiniCartOpen,
		isDropdownOpen: state.handleClicks.isDropdownOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleMiniCart: () => dispatch(miniCartClick()),
		handleDropdown: () => dispatch(dropdownClick()),
	};
};

class Navigation extends Component {
	handleClicks = () => {
		if (this.props.isDropdownOpen) {
			this.props.handleDropdown();
		}
		if (this.props.isMiniCartOpen) {
			this.props.handleMiniCart();
		}
	};

	renderCategories = (categories) => {
		return categories.map((category, index) => (
			<Link key={index} to="/" className="link">
				<li className={`${
						this.props.category === category.name ? "selected" : null
					}`}
					key={index}
					onClick={() => {this.props.onClick(category.name); }}
				>
					{category.name}
				</li>
			</Link>
		));
	};

	render() {
		const { currentCurrency, error, loading } = this.props;
		const categories = loading ? [] : this.props.data.categories;

		if(loading) return loadingMessage;

		if(error || !categories) return errorMessage;

		return (<div className="nav-container">
					<div onClick={this.handleClicks} className="nav">
						<ul>
							{this.renderCategories(categories)}
						</ul>
					</div>

					<div onClick={this.handleClicks} className="logo">
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
					</div>

					<div className="icons">
						<p className="currency" onClick={ () => { this.props.isMiniCartOpen ? this.props.handleMiniCart() : null; this.props.handleDropdown();}}>{currentCurrency}</p>
						<DropdownMenu />
						<MiniShoppingCart />
					</div>
					
				</div> );
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withGraphQLData(Navigation,CATEGORIES));
