/* eslint-disable react/display-name */
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React from "react";

import { 
    PRODUCTS_DATA , PRODUCTS,
    DETAILS_DATA, PRODUCT_DETAIL,
    CURRENCIES_DATA, CURRENCIES,
    CATEGORIES_NAMES, CATEGORIES,
 } from "./data-constants";

export const withGraphQLData = (Component, dataType) => (props) => {
	let loading, data, error;

    if(dataType === PRODUCTS){
    const category = props.category;
    ({loading, data, error} = useQuery(PRODUCTS_DATA, {variables: {category: category,},}));
    }

    if(dataType === PRODUCT_DETAIL){
        const params = useParams();
        const id = params.productID;
        ({loading, data, error} = useQuery(DETAILS_DATA, {variables: {id: id,},}));
    }

    if(dataType === CURRENCIES){
        ({loading, data, error} = useQuery(CURRENCIES_DATA));
    }

    if(dataType === CATEGORIES){
        ({loading, data, error} = useQuery(CATEGORIES_NAMES));
    }

	return <Component {...props} loading={loading} data={data} error={error}/>;

};
