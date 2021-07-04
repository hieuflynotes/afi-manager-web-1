/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { BaseController } from "../controller/BaseController";
import {
    BaseModel,
    Filter as FilterQuery,
    ListFilter,
    Paging,
} from "luong-base-model";

export function useCrudHook<
    T extends BaseModel,
    Filter extends ListFilter<T> = ListFilter<T>
>(props: Props<T, Filter>) {
    const [state, setState] = useState<State<T>>({
        isShowConfirm: false,
        isShowPopup: false,
        itemSelected: {} as T,
    });
    const [query, setQueryMain] = useState<Filter>({
        page: 1,
        pageSize: 10,
        ...props.initQuery,
    } as Filter);

    const setQuery = (filter: Filter) => {
        setQueryMain({ ...filter });
    };

    const [pagingList, setPagingList] = useState<Paging<T>>({
        page: 1,
        pageSize: 10,
        rows: [],
        total: 0,
        totalPages: 1,
    });

    const onConfirm = (item: T) => {
        setState({
            ...state,
            itemSelected: item,
            isShowConfirm: true,
        });
    };

    const onShowPopup = (item: T) => {
        setState({
            ...state,
            isShowPopup: true,
            itemSelected: item,
            isShowConfirm: false,
        });
    };

    const onDelete = async (item: T): Promise<T> => {
        if (props.onBeforeDelete) {
            props.onBeforeDelete(item);
        }
        return props.controller.remove({ id: item.id || "" }).then((res) => {
            if (props.onAfterDelete) {
                props.onAfterDelete(res);
            }
            setQuery({ ...query });
            setState({
                isShowPopup: false,
                isShowConfirm: false,
                itemSelected: {} as T,
            });
            return res as T;
        });
    };

    const onSave = async (item: T): Promise<T> => {
        console.log(item);

        if (props.onBeforeSave) {
            props.onBeforeSave(item);
        }
        if (props.saveController) {
            return props.saveController
                .bind(props.controller)({ ...item })
                .then((res) => {
                    if (props.onAfterSave) {
                        props.onAfterSave(res);
                    }
                    setQuery({ ...query });
                    setState({
                        isShowPopup: false,
                        isShowConfirm: false,
                        itemSelected: {} as T,
                    });
                    return res;
                })
                .catch((err) => {
                    setState({
                        isShowPopup: true,
                        isShowConfirm: false,
                        itemSelected: item,
                    });
                    return item;
                });
        }
        return props.controller
            .save({ ...item })
            .then((res) => {
                if (props.onAfterSave) {
                    props.onAfterSave(res);
                }
                setQuery({ ...query });
                setState({
                    isShowPopup: false,
                    isShowConfirm: false,
                    itemSelected: {} as T,
                });
                return res;
            })
            .catch((err) => {
                setState({
                    isShowPopup: true,
                    isShowConfirm: false,
                    itemSelected: item,
                });
                return item;
            });
    };

    const onCancelConfirm = () => {
        setState({
            ...state,
            isShowConfirm: false,
            itemSelected: {} as T,
        });
    };

    const onCancelPopup = () => {
        setState({
            ...state,
            isShowPopup: false,
            itemSelected: {} as T,
        });
    };

    const onQueryChanged = useCallback(
        _.debounce((value: string) => {
            setQuery({ ...query, search: value, page: 1 });
        }, props.delaySearch || 400),
        []
    );

    const onRefreshList = () => {
        setQuery({ ...query });
    };

    const setFilter = (params: FilterQuery<T>) => {
        setQuery({
            ...query,
            filter: params,
        });
    };

    useEffect(() => {
        if (props.onBeforeQuery) {
            props.onBeforeQuery(query);
        }
        if (props.listController) {
            props.listController
                .bind(props.controller)(query)
                .then((res) => {
                    setPagingList(res);
                    if (props.onAfterQuery) props.onAfterQuery(query);
                });
        } else {
            props.controller?.list(query).then((res) => {
                setPagingList(res);
                if (props.onAfterQuery) props.onAfterQuery(query);
            });
        }
    }, [query]);

    return {
        onConfirm,
        onDelete,
        onSave,
        onShowPopup,
        onCancelConfirm,
        onCancelPopup,
        setQuery,
        setPagingList,
        onRefreshList,
        onQueryChanged,
        isShowConfirm: state.isShowConfirm,
        isShowPopup: state.isShowPopup,
        itemSelected: state.itemSelected,
        pagingList,
        query,
        setFilter,
    };
}

type State<T> = {
    itemSelected: T;
    isShowConfirm: boolean;
    isShowPopup: boolean;
};

interface Props<T, Filter extends ListFilter<T>> {
    controller: BaseController<T>;
    listController?: (params: Filter) => Promise<Paging<T>>;
    saveController?: (t: T) => Promise<T>;
    onBeforeSave?: (item: T) => void;
    onAfterSave?: (item: T) => void;
    onBeforeDelete?: (item: T) => void;
    onAfterDelete?: (item: T) => void;
    onBeforeQuery?: (params: Filter) => void;
    onAfterQuery?: (params: Filter) => void;
    onQuery?: (query: Filter) => void;
    initQuery?: Filter;
    /**
     * @description millisecond
     * */
    delaySearch?: number;
}
