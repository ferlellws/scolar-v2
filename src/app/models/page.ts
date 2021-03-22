import { Icon } from './icon';
import { MenuModule } from './menu-module';

export class Page {
  id!: number;
  name!: string;
  description!: string;
  menu_module!: MenuModule;
  icon!: Icon;
  ordering!: number;
  id_active!: boolean;
}
