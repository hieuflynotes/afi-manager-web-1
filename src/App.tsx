/* eslint-disable eqeqeq */
import { Grid } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import { routers } from "./constants/Route";
import CustomerManager from "./container/CustomerManager";
import UiKit from "./container/UiKit";
// import "./i18n/config";
import { Dispatch, RootState } from "./rematch/store";

function App() {
	const authen = useSelector((state: RootState) => state.authen);
	const notification = useSelector((state: RootState) => state.notification);
	const dispatch = useDispatch<Dispatch>();
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		if (notification.message) {
			enqueueSnackbar(notification.message, {
				variant: notification.type,
			});
		}
	}, [notification]);
	useEffect(() => {
		dispatch.authen.getMe();
	}, []);
	return (
		<Router>
			{!authen.isGet ? (
				<Grid>
					<TransitionGroup>
						<CSSTransition classNames="fade" timeout={300}>
							<Switch>
								{routers.map((route) => {})}
								<Route path={"/table"}>
									<CustomerManager></CustomerManager>
								</Route>
								<Route path={"*"}>
									<UiKit></UiKit>
								</Route>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</Grid>
			) : (
				<Grid></Grid>
			)}
		</Router>
	);
}

export default function IntegrationNotistack() {
	return (
		<SnackbarProvider maxSnack={3}>
			<App />
		</SnackbarProvider>
	);
}

// export default App;
