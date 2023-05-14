import React, { Component } from "react";

class CartImage extends Component {
	state = {
		currentIndex: 0,
	};

	changePhoto = (order, galleryLength) => {
		const currentIndex = this.state.currentIndex;
		const maxIndex = (galleryLength - 1) ;
		if (order === "left") {
			if(currentIndex === 0){
				this.setState({currentIndex : maxIndex });
				return;
			}
			this.setState({ currentIndex: currentIndex - 1 });
		}
		if (order === "right") {
			if (currentIndex === galleryLength - 1) {
				this.setState({currentIndex : 0});
				return;
			}
			this.setState({ currentIndex: currentIndex + 1 });
		}
	};

	cartPhotos = (product) => {
		if (product.gallery.length === 1) {
			return null;
		} else {
			return (
				<div className="images-route">
					<button onClick={() => this.changePhoto("left", product.gallery.length)}>{"<"}</button>
					<button
						onClick={() => this.changePhoto("right", product.gallery.length)}
					>
						{">"}
					</button>
				</div>
			);
		}
	};

	render() {
		const { product, isMini } = this.props;
		return (
			<div className={`${isMini ? "mini-cart-image" : "main-cart-image"}`}>
				<img
					alt="product"
					src={product.gallery[this.state.currentIndex]}
				/>
				{this.cartPhotos(product)}
			</div>
		);
	}
}

export default CartImage;
