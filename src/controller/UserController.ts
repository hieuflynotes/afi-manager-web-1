import { IUserController } from "@Core/controllers/IUserController";
import { User } from "@Core/model/User";
import { BaseController } from "./BaseController";

export class UserController
    extends BaseController<User>
    implements IUserController
{
    login(params: { username: string; password: string }): Promise<User> {
        return this.client
            .post(`${this.serviceURL}/${this.basePath}/login`, params)
            .then((res) => {
                return res.data;
            });
    }
}
