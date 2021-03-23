import { MenuModule } from './../../../models/menu-module';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { Page } from 'src/app/models/page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuModulesResolver implements Resolve<Menu> {

  menu!: Menu[];

  constructor(
    private menuService: MenuService
  ) {}

  async resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Promise<Observable<Menu> | Promise<any> | any>{
      let menuModules: MenuModule[] = [];
      let pages!: Page[];

      await this.menuService.getFullMenu()
        .subscribe((menu: Menu[]) => {
          this.menu = menu;

          this.menu.forEach((res: Menu) => {
            environment.consoleMessage(res,  ">>> res: ");
            menuModules.push(res.module);
            pages = res.pages;
          })
          environment.consoleMessage(menuModules, ">>> menuModules: ");
          environment.consoleMessage(pages, ">>> pages: ");
        });


      return {
        menuModules: menuModules,
        pages: pages
      }
  }
}
