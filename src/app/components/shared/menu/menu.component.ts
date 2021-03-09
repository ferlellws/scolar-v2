import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { UserService } from 'src/app/services/user.service';
import { IconsService } from 'src/app/services/icons.service';
import { Icon } from 'src/app/models/icon';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'tecno-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  icons: Icon[] = [];
  // menu: Menu[] = [];
  menu: Menu[] = [];
  getmenusSuccses: boolean = false;
  panelOpenState: boolean [] = []; // Array de flags para saber si esta abierto o no un panel
  // panelOpenState: boolean = false;
  moduleSelected: number = 0;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private _iconsService: IconsService
  ) {}

  ngOnInit(): void {
    // this._iconsService.getIcons()
    //   .subscribe(icons => this.icons = icons);

    this.getMenu();
  }

  getMenu(): Menu[] {
    // if (sessionStorage.menuLoaded != null) {
    //   if (!this.getmenusSuccses) {
    //     this._usersService.getMenu().then(menu =>
    //       {
    //         this.menu = menu;
    //         this.getmenusSuccses = true;
    //       }
    //     );
    //   }

      this.menu = this.menuService.getMenu;
      // Se inicializa dinámicamente el Array de flags en false después de obtener la cantidad de modulos del menu
      this.menu.forEach(module => this.panelOpenState.push(false));
      // console.log(this.menu);

      return this.menu;
    // }
  }

  onOpenOption(index: number) {
    this.panelOpenState[index] = true;
  }

  onCloseOption(index: number) {
    this.panelOpenState[index] = false;
  }

  getIcon(id: number) {
    return this.icons.filter(icon => icon.id == id)[0].title;
  }

  onLink(route: string) {
    this.menuService.getOptionByRoute(route);
  }

}
