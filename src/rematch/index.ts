import { Models } from '@rematch/core';
import { useDispatch } from 'react-redux';
import { authen } from './Authen';
import { loading } from './LoadingTop';
import { notification } from './Notification';
import { notificationPopup } from './NotificationPopup';

export interface RootModel extends Models<RootModel> {
    authen: typeof authen;
    loading: typeof loading;
    notification: typeof notification;
    notificationPopup: typeof notificationPopup;
}

export const models: RootModel = { authen, loading, notification, notificationPopup };

export const useRematchDispatch = <D extends {}, MD>(selector: (dispatch: D) => MD) => {
    const dispatch = useDispatch<D>();
    return selector(dispatch);
};
