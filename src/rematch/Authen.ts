import { createModel } from "@rematch/core";
import { appClient, userController } from "src/controller";
import { RootModel } from ".";
// import { Customer } from "../model/base-gift-card/model/Customer";

export type AuthenModel = {
    role: "admin" | "";
    jwt?: string;
    // info?: Customer;
    info?: any;
    isGet?: boolean;
};

export const authen = createModel<RootModel>()({
    state: {
        role: "admin",
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
                appClient.defaults.headers["authorization"] = "";
                localStorage.setItem("jwt", "");
                this.getMe();
                authen.update({
                    role: "",
                    info: {},
                    isGet: true,
                    jwt: "",
                });
            },
            async getMe(): Promise<any> {
                const jwt = localStorage.getItem("jwt");
                appClient.defaults.headers["authorization"] = jwt;
                return userController
                    .getMe()
                    .then((res) => {
                        return authen.update({
                            isGet: true,
                            role: "admin",
                            info: res,
                        });
                    })
                    .catch((err) => {
                        authen.update({
                            role: "",
                            info: {},
                            isGet: true,
                            jwt: "",
                        });
                    });
            },
        };
    },
});
