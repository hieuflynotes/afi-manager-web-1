import { IOrderTrackingController } from "@Core/controllers/IOrderTrackingController";
import { IUserController } from "@Core/controllers/IUserController";
import { User } from "@Core/model/User";
import { BaseController } from "./BaseController";

export class OrderTrackingController
    extends BaseController<User>
    implements IOrderTrackingController {}
