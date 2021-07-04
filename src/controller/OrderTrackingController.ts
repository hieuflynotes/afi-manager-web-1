import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";
import { IOrderTrackingController } from "../afi-manager-base-model/controllers/IOrderTrackingController";
import { User } from "../afi-manager-base-model/model/User";
import { BaseController } from "./BaseController";

export class OrderTrackingController
    extends BaseController<User>
    implements IOrderTrackingController
{
    createManyFlow(params: { orderId: string[] }): Promise<OrderTracking[]> {
        return this.client
            .post(
                `${this.serviceURL}/${this.basePath}/create-many-flow`,
                params
            )
            .then((res) => {
                return res.data;
            });
    }
}
