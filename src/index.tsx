import React from "react";
import ReactDOM from "react-dom";
import IntegrationNotistack from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme/MuiTheme";
import { store } from "./rematch/store";
import "./index.css";

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<IntegrationNotistack />
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
