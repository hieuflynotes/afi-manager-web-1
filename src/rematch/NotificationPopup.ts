import { createModel } from '@rematch/core';
import { RootModel } from '.';

export enum TypeNotification {
    ERROR = 'error',
    SUCCESS = 'success',
    DEFAULT = 'default',
    WARNING = 'warning',
    INFO = 'info',
    // success, error, warning, info, or default
}
export interface NotificationPopup {
    message: string;
    type: TypeNotification;
    isDisplay: boolean;
    title: string;
}
export const notificationPopup = createModel<RootModel>()({
    state: {
        message: '',
        type: TypeNotification.SUCCESS,
        isDisplay: false,
        title: 'Thông báo',
    } as NotificationPopup,
    reducers: {
        update: (state, notification: NotificationPopup) => {
            return {
                ...notification,
            };
        },
    },
    effects: (dispatch) => {
        const { notificationPopup } = dispatch;
        return {
            success(params: { message: string; title: string }) {
                notificationPopup.update({
                    message: params.message,
                    type: TypeNotification.SUCCESS,
                    title: params.title,
                    isDisplay: true,
                });
            },
            error(params: { message: string; title: string }) {
                notificationPopup.update({
                    message: params.message,
                    type: TypeNotification.SUCCESS,
                    title: params.title,
                    isDisplay: true,
                });
            },
            close() {
                notificationPopup.update({
                    message: '',
                    type: TypeNotification.SUCCESS,
                    title: '',
                    isDisplay: false,
                });
            },
        };
    },
});
