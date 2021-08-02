import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const loading = createModel<RootModel>()({
    state: false,
    reducers: {
        update: (state, loading: boolean) => {
            return loading;
        },
    },
    effects: (dispatch) => {
        const { loading } = dispatch;
        return {
            showLoading() {
                loading.update(true);
            },
            hiddenLoading() {
                loading.update(false);
            },
        };
    },
});
