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
export interface Notification {
    message: string;
    type: TypeNotification;
}
export const notification = createModel<RootModel>()({
    state: {
        message: '',
        type: TypeNotification.SUCCESS,
    },
    reducers: {
        update: (state, notification: Notification) => {
            return {
                ...notification,
            };
        },
    },
    effects: (dispatch) => {
        const { notification } = dispatch;
        return {
            success(message: string) {
                notification.update({
                    message,
                    type: TypeNotification.SUCCESS,
                });
            },
            error(message: string) {
                notification.update({
                    message,
                    type: TypeNotification.ERROR,
                });
            },
        };
    },
});
