/* eslint-disable no-prototype-builtins */
import React, { Component } from "react";

import './filter.css';
import slider from './slider.png';
import chevron from './chev-right.png';
import chevLeft from './chev-left.png';

import {filterClick} from '../../state-management/actions.js';
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        filterClick : () => dispatch(filterClick()),
    };
};

const mapStateToProps =(state) => {
    return {
        isFilterOpen : state.handleClicks.isFilterOpen,
    };
};

class Filter extends Component {
    state = {
        selectedFilters : {},
    };

    setSelectedFilter = (filter, value) => {
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters[filter] = value;
        this.setState({selectedFilters});
    };

     addToPreviousAttributes = (previousAttributes,products) => {
        return products.map(product => {
            product.attributes.map(attribute => {
               if(!previousAttributes.hasOwnProperty(attribute.name)){
                   previousAttributes[attribute.name] = [];
               }
                attribute.items.map(attributeValue => {
                   if(!previousAttributes[attribute.name].includes(attributeValue.value)){
                       previousAttributes[attribute.name].push(attributeValue.value);
                   }
               });
           });
       });
    };

    renderFilterComponents = (previousAttributes) => {
        return Object.entries(previousAttributes).map(entry => {
            const [key,value] = entry;
                    if(key === 'Color'){
                        return (
                            <div className={key} key={key}>
                                <p>{key}</p>
                                {value.map(color => {
                                    return <button onClick={() => this.setSelectedFilter(key,color)} style={{backgroundColor : color}} key={color} className={this.state.selectedFilters[key] === color ? 'color-filter selected' : 'color-filter'}></button>;
                                })}
                            </div> 
                        );
                    }else if(value.includes('Yes' || 'No')){
                        return (
                        <div key={key} className={'checkboxes'}>
                            <p>{key}</p>
                                {value.map((filter,index) => {
                                    return (<div className='radio-fragment' key={filter+index}>
                                        <input onClick={()=> this.setSelectedFilter(key,filter)} readOnly={true} checked={this.state.selectedFilters[key] === filter ? true : false} type="radio" id={filter} name={key} value={filter}/>
                                        <label htmlFor={filter} >{filter}</label><br></br>
                                    </div>);
                                })}
                        </div>);
                    }else {
                        return(
                        <div className={key} key={key}>
                            <p>{key}</p>
                            <select defaultValue={'select'} >
                                <option onClick={()=> this.setSelectedFilter(key,'none')}>select</option>
                                {value.map((filter,index) =>{
                                    return <option onClick={()=> this.setSelectedFilter(key,filter)}   key={filter+index}>{filter}</option>;
                                })}
                            </select>
                        </div>);
                    }
        });
    };

    applyOrClear = (type) => {
        let params = new URLSearchParams(location.search);
        let paramKeys = [];
        params.forEach((_,parKey) => {
            paramKeys.push(parKey);
        });
        if(type === 'apply'){
            const filtersKeys = Object.keys(this.state.selectedFilters);
            paramKeys.map(parKey => {
                if(!filtersKeys.includes(parKey.replaceAll('-',' '))){
                    params.delete(parKey);
                    location.search = params.toString();
                }
            });
        Object.entries(this.state.selectedFilters).map(entries => {
            const [key , value] = entries;
            if(params.toString().includes(key.replaceAll(' ','-'))){
               params.set(key.replaceAll(' ','-'), value);
            }else{
               params.append(key.replaceAll(' ', '-'), value);
            }
            this.props.filterClick();
        });
        location.search = params.toString();
        }
        if(type === 'clear'){
            paramKeys.map(key => params.delete(key));
            location.search = params.toString();
            this.props.filterClick();
        }
        };

    render(){
        const {products} = this.props;
        let previousAttributes = {};
        return (
            this.props.isFilterOpen ? 
            <div className="filter-container">
                <div className="filter-section">
                    {this.addToPreviousAttributes(previousAttributes,products)}
                    {this.renderFilterComponents(previousAttributes)}
                </div>
                <img onClick={() => this.props.filterClick()} alt=">" src={chevLeft}></img>
                <div className="filter-buttons">
                    <button onClick={()=> this.applyOrClear('clear')} className="clear">clear filter(s)</button>
                    <button onClick={()=> this.applyOrClear('apply')} className="apply">apply filter(s)</button>
                </div>
            </div>
            :
            <div onClick={() => this.props.filterClick()} className="filter-button">
                    <img className="slider" alt="filter" src={slider}></img>
                    <img className="chevron" alt=">" src={chevron}></img>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);