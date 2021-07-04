import axios, { AxiosError } from "axios";
import config from "../constants/Config";
import { dispatch } from "../rematch/store";
import { HMController } from "./HMController";
import { LocalStoryController } from "./LocalStoryController";
import { OrderTrackingController } from "./OrderTrackingController";
import { TestController } from "./TestController";
import { UserController } from "./UserController";

export const appClient = axios.create({
    baseURL: config.apiGatewayUrl,
    timeout: 10000,
    headers: {
        common: {
            "Content-Type": "application/json",
        },
    },
});
appClient.interceptors.request.use(
    (res) => {
        dispatch.loading.showLoading();
        return res;
    },
    (err: AxiosError) => {}
);

appClient.interceptors.response.use(
    (res) => {
        dispatch.loading.hiddenLoading();
        return res;
    },
    (err: AxiosError) => {
        if (err.message === "Network Error") {
            dispatch.notification.error("Lỗi kết nối máy chủ");
            // window.location.href = "network-error"
        }
        if (err.response?.status === 401) {
            dispatch.notification.error(
                err.response?.data?.message || "Login again"
            );
            if (window.location.pathname != "/login") {
                window.location.href = "/login";
            }
        } else if (err.response?.status === 403) {
        } else {
            dispatch.notification.error(
                err.response?.data?.message || " Có lỗi xảy ra"
            );
        }
        dispatch.loading.hiddenLoading();
        return Promise.reject(err);
    }
);
appClient.defaults.headers["authorization"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4YThhMjAwLTg2MjctNDcyYy04YzZhLTNmYjNhZjAyY2JiZiIsImRlbGV0ZWRBdCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yM1QxNDozMTo0NC43OTZaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yM1QxNDozMTo0NC43OTZaIiwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImZ1bGxOYW1lIjoiTmd1eWVuIFZhbiBMdW9uZyAiLCJiaXJ0aERheSI6IjIwMjEtMDUtMTZUMDc6MDg6MTIuMzQ0WiIsImFkZHJlc3MiOiIyMSBsdW9uZyB0aGUgdmluaCIsInBob25lTnVtYmVyIjoiMDM5MzQ1NzE0NCIsInBhc3N3b3JkIjoiNjliNWY5NTgyODQ1MWRlNDgxYTNkMmVhMjlmOTBjMjUiLCJlbWFpbCI6ImxnbnZwckBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6Imx1b25nIiwicGFyZW50SWQiOiIxZDQ4NzgxZC01ZmJiLTQzNjQtOTU0NS01NTA4MzQ2MWQ3YzQiLCJpYXQiOjE2MjE5MzQzMzR9.8YaNLr8SVimJq9LCrURn6nBbXEjMpzgFM2Xs_2O97h0";
export const localStoryController = new LocalStoryController();

export const userController = new UserController(
    config.apiGatewayUrl,
    "user",
    appClient
);

export const testController = new TestController(
    "https://apidev.tracking.afivn.com",
    "appUser",
    appClient
);
export const orderTrackingController = new OrderTrackingController(
    config.apiGatewayUrl,
    "orderTracking",
    appClient
);

export const hMController = new HMController(
    "https://api.parcellab.com/v2",
    ""
);
//
