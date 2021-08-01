import { ListFilter, Paging } from 'luong-base-model/lib';
import { IUserHmController } from 'src/afi-manager-base-model/controllers/IUserHmController';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import { IUserController } from '../afi-manager-base-model/controllers/IUserController';
import { InfoMe } from '../afi-manager-base-model/model/InfoMe';
import { User, UserAccount } from '../afi-manager-base-model/model/User';
import { BaseController } from './BaseController';

export class UserHmController extends BaseController<User> implements IUserHmController {}
