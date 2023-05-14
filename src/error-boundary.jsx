import React, { Component } from "react";

import './App.css';

class ErrorBoundary extends Component {
	state = {
		hasError: false,
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			return <h1 className="error-boundary">Something went wrong.</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;