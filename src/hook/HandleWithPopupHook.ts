import { useState } from "react";

export function handleWithPopupHook<T>(props: Props<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState<{
        itemSelected: T;
        isShowPopup: boolean;
        isShowConfirm: boolean;
    }>({
        itemSelected: {} as T,
        isShowPopup: false,
        isShowConfirm: false,
    });

    function handleShowPopup(item?: T) {
        props.onShowPopup && props.onShowPopup(item);
        setState({
            ...state,
            isShowPopup: true,
            itemSelected: item as T,
        });
    }

    function handleShowConfirm(item?: T) {
        props.onShowConfirm && props.onShowConfirm();
        setState({
            ...state,
            isShowPopup: true,
            itemSelected: item as T,
        });
    }

    function handleClosePopup() {
        props.onClosePopup && props.onClosePopup(state.itemSelected);
        setState({
            ...state,
            isShowPopup: false,
            itemSelected: {} as T,
            isShowConfirm: false,
        });
    }

    function handleConfirm(item?: T) {
        props.onConfirm && props.onConfirm(item as T);
        handleClosePopup();
    }

    function handleConfirmByPopup(item?: T) {
        props.onConfirmByPopup && props.onConfirmByPopup(item);
        handleClosePopup();
    }

    return {
        handleShowPopup,
        handleClosePopup,
        handleShowConfirm,
        handleConfirmByPopup,
        handleConfirm,
        setState,
        state,
        isDisplayPopup: state.isShowPopup,
        isDisplayConfirm: state.isShowConfirm,
        itemSelected: state.itemSelected,
    };
}

type Props<T> = {
    onShowPopup?: (item?: T) => void;
    onShowConfirm?: (item?: T) => void;
    onClosePopup?: (item?: T) => void;
    onConfirm?: (item?: T) => void;
    onConfirmByPopup?: (item?: T) => void;
};
