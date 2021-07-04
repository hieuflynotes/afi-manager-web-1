import { HMTracking } from "../afi-manager-base-model/model/HMTracking";
import axios, { AxiosInstance } from "axios";

export class HMController {
    protected serviceURL: string;
    protected basePath: string;
    public client: AxiosInstance;

    public constructor(serviceURL: string, basePath: string) {
        this.serviceURL = serviceURL;
        this.basePath = basePath;
        this.client = axios;
    }
    getTrackingByOrderNo(params: { orderNo: string }): Promise<HMTracking> {
        if (params.orderNo.length < 10) {
            return Promise.reject(new HMTracking());
        }
        return this.client
            .get(
                `${this.serviceURL}/checkpoints/?orderNo=${params.orderNo}&user=1613945&lang=en`
            )
            .then((res) => {
                const data = res.data;
                data.header = data.header[0];
                data.body = Object.values(data.body);
                if (data.body && data.body[0] && data.body[0][0]) {
                    data.body = data.body[0].reverse();
                }
                return data;
            });
    }
}
