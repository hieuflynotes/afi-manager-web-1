import { AxiosInstance } from 'axios';

import { dispatch } from '../rematch/store';
import { CountFilter, FindFilter, IBaseController, ListFilter, Paging } from 'luong-base-model';

export class BaseController<T> implements IBaseController<T> {
    protected serviceURL: string;
    protected basePath: string;
    public client: AxiosInstance;

    public constructor(serviceURL: string, basePath: string, client: AxiosInstance) {
        this.serviceURL = serviceURL;
        this.basePath = basePath;
        this.client = client;
    }
    getById(params: { id: string }): Promise<T | undefined> {
        return this.client.get(`${this.serviceURL}/${this.basePath}/${params.id}`).then((res) => {
            return res.data;
        });
    }

    save(t: T): Promise<T> {
        return this.client.post(`${this.serviceURL}/${this.basePath}`, t).then((res) => {
            dispatch.notification.success('Lưu thành công');
            return res.data;
        });
    }
    find(params: FindFilter<T>): Promise<T[]> {
        params = { ...params, sort: this.convertSort(params.sort) };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/find`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
    findOne(params: FindFilter<T>): Promise<T> {
        params = { ...params, sort: this.convertSort(params.sort) };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/find-one`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
    list(params: ListFilter<T>): Promise<Paging<T>> {
        params = { ...params, sort: this.convertSort(params.sort) };
        params = {
            ...params,
            searchFields: this.convertSearch(params.searchFields) as any,
        };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }

    getByIds(params: { id: string[] }): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
    remove(params: { id: string }): Promise<T> {
        return this.client.delete(`${this.serviceURL}/${this.basePath}/${params.id}`).then((res) => {
            dispatch.notification.success('Xóa thành công');
            return res.data;
        });
    }

    count(params: CountFilter<T>): Promise<number> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/count`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }

    public convertSort(sort: string[] | string | undefined): string {
        if (!sort) return '';
        if (typeof sort === 'string') {
            return sort;
        }
        var sortString: string = '';
        // eslint-disable-next-line array-callback-return
        sort.map((sort) => {
            sortString += `${sort},`;
        });
        sortString = sortString.substring(0, sortString.length - 1);
        return sortString;
    }
    public convertSearch(search: string[] | (string | number | symbol)[] | undefined): string {
        if (!search) return '';
        if (typeof search === 'string') {
            return search;
        }
        var searchString: string = '';
        // eslint-disable-next-line array-callback-return
        search.map((search: any) => {
            searchString += `${search},`;
        });
        searchString = searchString.substring(0, searchString.length - 1);
        console.log(searchString);
        return searchString;
    }
}
