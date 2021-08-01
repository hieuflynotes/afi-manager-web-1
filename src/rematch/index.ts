import { Models } from '@rematch/core';
import { useDispatch } from 'react-redux';
import { authen } from './Authen';
import { loading } from './LoadingTop';
import { notification } from './Notification';

export interface RootModel extends Models<RootModel> {
    authen: typeof authen;
    loading: typeof loading;
    notification: typeof notification;
}

export const models: RootModel = { authen, loading, notification };

export const useRematchDispatch = <D extends {}, MD>(selector: (dispatch: D) => MD) => {
    const dispatch = useDispatch<D>();
    return selector(dispatch);
};
