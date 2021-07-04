import { IUserController } from "../afi-manager-base-model/controllers/IUserController";
import { InfoMe } from "../afi-manager-base-model/model/InfoMe";
import { User, UserAccount } from "../afi-manager-base-model/model/User";
import { BaseController } from "./BaseController";

export class UserController
    extends BaseController<User>
    implements IUserController
{
    register(params: UserAccount): Promise<User> {
        return this.client
            .post(`${this.serviceURL}/${this.basePath}/register`, params)
            .then((res) => {
                return res.data;
            });
    }
    getMe(): Promise<InfoMe> {
        return this.client
            .get(`${this.serviceURL}/${this.basePath}/getMe`)
            .then((res) => {
                return res.data;
            });
    }
    login(params: { username: string; password: string }): Promise<User> {
        return this.client
            .post(`${this.serviceURL}/${this.basePath}/login`, params)
            .then((res) => {
                return res.data;
            });
    }
}
