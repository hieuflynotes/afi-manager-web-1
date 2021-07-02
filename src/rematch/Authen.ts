import { createModel } from "@rematch/core";
import { RootModel } from ".";
// import { Customer } from "../model/base-gift-card/model/Customer";

export type AuthenModel = {
	role: "";
	jwt?: string;
	// info?: Customer;
	info?: any;
	isGet?: boolean;
};

export const authen = createModel<RootModel>()({
	state: {
		role: "",
		jwt: "",
		isGet: false,
	} as AuthenModel,
	reducers: {
		update: (state, authen: AuthenModel) => {
			return {
				...authen,
			};
		},
	},
	effects: (dispatch) => {
		const { authen } = dispatch;
		return {
			async login(payload: AuthenModel): Promise<any> {
				localStorage.setItem("jwt", payload.jwt || "");
				return authen.update({ ...payload, isGet: true });
			},
			async logOut() {
				// appClient.defaults.headers["authorization"] = "";
				// localStorage.setItem("jwt", "");
				// authen.update({
				// 	role: Role.NONE,
				// 	info: {},
				// 	isGet: true,
				// 	jwt: "",
				// });
			},
			async getMe(): Promise<any> {
				const jwt = localStorage.getItem("jwt");
				// appClient.defaults.headers["authorization"] = jwt;
				// return authen.update({
				// 	isAuthenticated: true,
				// 	isAuthor: true,
				// 	isGet: true,
				// });
			},
		};
	},
});
