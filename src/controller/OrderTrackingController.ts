import { ListFilter, Paging } from "luong-base-model/lib";
import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";
import {
    IOrderTrackingController,
    PropsCreateManyFlow,
} from "../afi-manager-base-model/controllers/IOrderTrackingController";
import { User } from "../afi-manager-base-model/model/User";
import { BaseController } from "./BaseController";

export class OrderTrackingController
    extends BaseController<User>
    implements IOrderTrackingController
{
    createManyByEmailsAndOrders(
        params: PropsCreateManyFlow
    ): Promise<OrderTracking[]> {
        return this.client
            .post(
                `${this.serviceURL}/${this.basePath}/create-many-by-emails-orders`,
                params
            )
            .then((res) => {
                return res.data;
            });
    }
    syncSortTracking(params: {}): Promise<OrderTracking[]> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/sync`, params)
            .then((res) => {
                return res.data;
            });
    }
    createManyFlow(params: PropsCreateManyFlow): Promise<OrderTracking[]> {
        return this.client
            .post(
                `${this.serviceURL}/${this.basePath}/create-many-flow`,
                params
            )
            .then((res) => {
                return res.data;
            });
    }
    public listForProgress(
        params: ListFilter<OrderTracking>
    ): Promise<Paging<OrderTracking>> {
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
