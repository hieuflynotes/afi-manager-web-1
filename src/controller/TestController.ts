import { BaseModel } from "luong-base-model";
import { BaseController } from "./BaseController";

export class TestModel extends BaseModel {
    fullName?: string;
    email?: string;
}
export class TestController extends BaseController<TestModel> {}
