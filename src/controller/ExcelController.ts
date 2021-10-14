import { AxiosInstance } from "axios";
import { OrderAddress } from "src/afi-manager-base-model/model/OrderAddress";
import { ExcelConfig } from "src/constants/ExcelConfig";
import config from "./../constants/Config"

export class ExcelController {
    public client: AxiosInstance;

    public constructor(client: AxiosInstance) {
        this.client = client;
    }
    getConfigList(): Promise<ExcelConfig> {
        return this.client
            .get(`${config.apiProxyUrl}/proxy?url=${config.apiSheetConfig}&action=getConfigUrls`)
            .then((res) => {
                console.log({ res })
                return res.data;
            });
    }
    getAddress():Promise<OrderAddress[]>{
        return this.getConfigList().then(rst =>
            this.client.get(`${config.apiProxyUrl}/proxy?url=${rst.general.apiGatewayUrl}&action=getAddress`)
                .then(res => res.data))
    }
    runBotCheckout(orderId?: string, email?: string, quantity?: number, warehouse?: string,staff?:string): Promise<any> {
        return this.getConfigList().then(rst =>
            this.client.post(`${config.apiProxyUrl}/proxy?url=${rst.bot.apiGatewayUrl}&action=create-order&orderId=${orderId}&warehouse=${warehouse}&email=${email}&quantity=${quantity}&staff=${staff}`)
                .then(res => res.data))
    }
}