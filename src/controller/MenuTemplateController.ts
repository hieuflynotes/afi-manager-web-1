import { IMenuTemplateController } from 'src/afi-manager-base-model/controllers/IMenuTemplateController';
import { MenuTemplate } from 'src/afi-manager-base-model/model/MenuTemplate';
import { BaseController } from './BaseController';

export class MenuTemplateController extends BaseController<MenuTemplate> implements IMenuTemplateController {}
