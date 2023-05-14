import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { setCurrentCurrency, addCartItem , handleClicks, fetchData} from "./state-management/reducers";

//apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";

//redux-presist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// react-roter
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./error-boundary";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache(),
});

const persistConfig = {
	key: "root",
	storage,
};

const logger = createLogger();
const rootReducers = combineReducers({ setCurrentCurrency, addCartItem , handleClicks, fetchData });
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, applyMiddleware(logger));

const persistor = persistStore(store);

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate loading={null} persistor={persistor}>
					<ErrorBoundary>
						<App client={client} />
					</ErrorBoundary>
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
