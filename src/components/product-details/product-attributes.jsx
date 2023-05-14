import React, { Component } from "react";

class ProductAttributes extends Component {

	state = {
		
	};

	swatchAttribute = (attribute, item, i, product) => {
		return (
			<button
				onClick={() => {
					this.props.updateState(attribute.name, item.value);
					this.setState({ [attribute.name]: item.value });
				}}
				key={attribute + i}
				className={`
				swatch ${this.state[attribute.name] === item.value ? "selected" : null}
				${product.inStock ? null : "disabled"}
				`}
				style={{ backgroundColor: `${item.value}` }}
				disabled={product.inStock ? false : true}
			></button>
		);
	};

	normalAttribute = (attribute, item, i, product) => {
		return (
			<button
				disabled={product.inStock ? false : true}

				onClick={() => {
					this.props.updateState(attribute.name, item.value);
					this.setState({ [attribute.name]: item.value }); }}

				className={`
					${this.state[attribute.name] === item.value ? "selected" : null}
					${product.inStock ? null : "disabled"} `}

				key={i + attribute}
			>{item.value}</button>
		);
	};

	attributSection = (attribute, product) => {
		return attribute.items.map((item, i) => {
			if (attribute.type === "swatch") {
				return this.swatchAttribute(attribute, item, i, product);
			} else {
				return this.normalAttribute(attribute, item, i, product);
			}
		});
	};

	renderProductAttributes = (attributes, product) => {
		return attributes.map((attribute, i) => {
			return (
				<div key={i}>
					<p className={product.inStock ? null : "disabled"}>
						{attribute.name} :
					</p>
					<div>{this.attributSection(attribute, product)}</div>
				</div>
			);
		});
	};

	render() {
		const { attributes, product} = this.props;
		
		return (
			<div className="attributes-container">
				{this.renderProductAttributes(attributes, product)}
			</div>
		);
	}
}

export default ProductAttributes;
