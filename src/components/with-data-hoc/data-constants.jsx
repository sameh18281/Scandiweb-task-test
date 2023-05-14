import { gql } from "@apollo/client";

import React from "react";

export const PRODUCTS = "PRODUCTS";

export const PRODUCT_DETAIL = "PRODUCT_DETAIL";

export const CURRENCIES = "CURRENCIES";

export const CATEGORIES = "CATEGORIES";

export const ALL = "ALL";

/*product-card-screen data */
export const PRODUCTS_DATA = gql`
	query products($category: String!) {
		category(input: { title: $category }) {
			name
			products {
				name
				brand
				id
				gallery
				inStock
				attributes {
					name
					type
					items {
						value
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

/*product-detail-screen data */
export const DETAILS_DATA = gql`
	query product_details($id: String!) {
		product(id: $id) {
			name
			id
			inStock
			gallery
			description
			brand
			attributes {
				name
				type
				items {
					value
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
		}
	}
`;

/*category names data */
export const CURRENCIES_DATA = gql`
	query currencies {
		currencies {
			label
			symbol
		}
	}
`;

/*category names data */
export const CATEGORIES_NAMES = gql`
	query category_names {
		categories {
			name
		}
	}
`;

export const ALL_DATA = gql`
	query productsData {
		category {
			products {
				id
				name
				brand
				inStock
				category
				gallery
				prices {
					currency {
						label
						symbol
					}
					amount
				}
				attributes {
					name
					type
					items {
						value
					}
				}
			}
		}
	}
`;

export const errorMessage = (
	<div className="loading">Error!..., please try again later</div>
);

export const loadingMessage = <div className="loading">Loading...</div>;

export const addToCartMessage = "Added to cart !";
export const quantityIncMessage = "Quantity increased !";

export const sortObject = (obj) => Object.keys(obj).sort().reduce((prev, curr) => ((prev[curr] = obj[curr]), prev), {});

export const isEqual = (a, b) => (JSON.stringify(a) === JSON.stringify(b));
