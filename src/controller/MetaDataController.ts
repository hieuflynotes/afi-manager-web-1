import { IMetaDataController } from "../afi-manager-base-model/controllers/IMetaDataController";
import { InfoMe } from "../afi-manager-base-model/model/InfoMe";
import { MetaData } from "../afi-manager-base-model/model/MetaData";
import { BaseController } from "./BaseController";

export class MetaDataController
    extends BaseController<MetaData>
    implements IMetaDataController
{
    getByKey(params: { key: string }): Promise<MetaData<any>> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/get-by-key`, {
                params: params,
            })
            .then((res) => {
                return res.data;
            });
    }
    saveByKey<T = any>(params: {
        key: string;
        data: T;
    }): Promise<MetaData<any>> {
        return this.client
            .post(`${this.serviceURL}/${this.basePath}/save-by-key`, params)
            .then((res) => {
                return res.data;
            });
    }
}
