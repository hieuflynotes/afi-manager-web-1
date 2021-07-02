import { init, RematchDispatch, RematchRootState } from "@rematch/core";
// import createLoadingPlugin from '@rematch/loading';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { models, RootModel } from ".";


export const history = createBrowserHistory();
// const loading = createLoadingPlugin(options);
export const store = init({
	redux: {
		reducers: {
			router: connectRouter(history),
			// form: formReducer,
		},
		middlewares: [routerMiddleware(history)],
		rootReducers: {
			RESET_APP: (state: any, payload: any) => undefined,
		},
		devtoolOptions: {
			disabled: process.env.NODE_ENV === "production",
		},
	},
	models: models,
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const dispatch: Dispatch = store.dispatch;
