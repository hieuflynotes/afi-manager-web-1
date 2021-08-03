import { ListFilter, Paging } from 'luong-base-model/lib';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import { dispatch } from 'src/rematch/store';
import {
    ExportOrderTracking,
    FilterStatistic,
    IntervalCheckoutHmTeamAle,
    IOrderTrackingController,
    PropsCreateManyFlow,
    PropsExportData,
    StatisticByUserHm,
} from '../afi-manager-base-model/controllers/IOrderTrackingController';
import { User } from '../afi-manager-base-model/model/User';
import { BaseController } from './BaseController';

export class OrderTrackingController extends BaseController<OrderTracking> implements IOrderTrackingController {
    saveByCustomer(params: OrderTracking): Promise<OrderTracking> {
        return this.client.post(`${this.serviceURL}/${this.basePath}/save-by-customer`, params).then((res) => {
            dispatch.notification.success('Lưu thành công');
            return res.data;
        });
    }
    listByCustomer(params: ListFilter<OrderTracking>): Promise<Paging<OrderTracking>> {
        params = { ...params, sort: this.convertSort(params.sort) };
        params = {
            ...params,
            searchFields: this.convertSearch(params.searchFields) as any,
        };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/list-for-customer`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
    intervalTeamRegister(params: FilterStatistic): Promise<IntervalCheckoutHmTeamAle[][]> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/interval-team-register`, {
                params,
            })
            .then((res) => {
                return res.data;
            });
    }
    intervalTeamCheckout(params: FilterStatistic): Promise<IntervalCheckoutHmTeamAle[][]> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/interval-team-checkout`, {
                params,
            })
            .then((res) => {
                return res.data;
            });
    }
    statisticByUserHm(params: ListFilter<StatisticByUserHm>): Promise<Paging<StatisticByUserHm>> {
        params = { ...params, sort: this.convertSort(params.sort) };
        params = {
            ...params,
            searchFields: this.convertSearch(params.searchFields) as any,
        };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/staticti-by-user-hm`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }

    orderHmForWarehouse(params: ListFilter<StatisticByUserHm>): Promise<Paging<StatisticByUserHm>> {
        params = { ...params, sort: this.convertSort(params.sort) };
        params = {
            ...params,
            searchFields: this.convertSearch(params.searchFields) as any,
        };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/statistic-order-hm-by-user`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
    exportData(params: PropsExportData): Promise<ExportOrderTracking[]> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/export-data`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
    mergeOrderTrackingToUser(params: { userHmId?: string; userId?: string }): Promise<OrderTracking[]> {
        return this.client.post(`${this.serviceURL}/${this.basePath}/merger-order-to-user`, params).then((res) => {
            return res.data;
        });
    }
    createManyByEmailsAndOrders(params: PropsCreateManyFlow): Promise<OrderTracking[]> {
        return this.client
            .post(`${this.serviceURL}/${this.basePath}/create-many-by-emails-orders`, params)
            .then((res) => {
                return res.data;
            });
    }
    syncSortTracking(params: {}): Promise<OrderTracking[]> {
        return this.client.get(`${this.serviceURL}/${this.basePath}/sync`, params).then((res) => {
            return res.data;
        });
    }
    createManyFlow(params: PropsCreateManyFlow): Promise<OrderTracking[]> {
        return this.client.post(`${this.serviceURL}/${this.basePath}/create-many-flow`, params).then((res) => {
            return res.data;
        });
    }
    public listForProgress(params: ListFilter<OrderTracking>): Promise<Paging<OrderTracking>> {
        params.sort = ['totalPrice', 'email'];
        params = { ...params, sort: this.convertSort(params.sort) };
        params = {
            ...params,
            searchFields: this.convertSearch(params.searchFields) as any,
        };
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/list-for-progress`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
}
