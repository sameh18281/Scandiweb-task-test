import React, { Component } from "react";

import "./modal-page.css";

class ModalPage extends Component {
	render() {
		let { isOpen, modalMessage } = this.props;
		return (
			<div onClick={this.props.changeModalBoolean} className={`overlay ${isOpen ? "modal-active" : null}`}>
				<div className="modal">
					<p className="modal-message">{modalMessage}</p>
					<button onClick={() => this.props.changeModalBoolean} className="ok">
						Okay
					</button>
				</div>
			</div>
		);
	}
}
export default ModalPage;
