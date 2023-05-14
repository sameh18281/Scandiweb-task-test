import React, { Component } from "react";

class ProductImages extends Component {
	state = {
		currentPhotoIndex: 0,
	};

	changePhotoIndex = (index) => {
		const currentPhotoIndex = index;
		this.setState({ currentPhotoIndex });
	};

	renderImages = (product) => {
		return product.gallery.map((photo, index) => (
			<img
				key={index}
				className={`${
					this.state.currentPhotoIndex === index ? "selected-photo" : null
				}`}
				src={photo}
				onClick={() => this.changePhotoIndex(index)}
				alt={"photo" + index}
			/>
		));
	};

	render() {
		const { product } = this.props;
		return (
			<React.Fragment>
				<div className={`preview-imgs ${product.gallery.length <= 4 ? null : "scroll"}`}>
					{this.renderImages(product)}
				</div>

				<div className= {`main-preview-img ${!product.inStock ? 'out' : null } `}>
					<img
						src={product.gallery[this.state.currentPhotoIndex]}
						alt={"product photo " + this.state.currentPhotoIndex}
					/>
									{!product.inStock ? 
				<div className="out-of-stock-details">
					<span className="out-span">out of stock</span>
				</div> : null }
				</div>
			</React.Fragment>
		);
	}
}

export default ProductImages;
