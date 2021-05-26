import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { UserService } from 'src/app/services/user.service';
import { IconsService } from 'src/app/services/icons.service';
import { Icon } from 'src/app/models/icon';

@Component({
  selector: 'tecno-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  icons: Icon[];

  constructor(
    private _usersService: UserService,
    private router: Router,
    private _iconsService: IconsService
  ) {}

  menu: Menu[] = [];
  getmenusSuccses: boolean = false;
  ngOnInit(): void {
    this._iconsService.getIcons()
      .subscribe(icons => this.icons = icons);

      this.getMenu();
  }

  getMenu() {
    if (sessionStorage.menuLoaded != null) {
      if (!this.getmenusSuccses) {
        this._usersService.getMenu().then(menu =>
          {
            this.menu = menu;
            this.getmenusSuccses = true;
          }
        );
      }
      return this.menu;
    }
  }

  getIcon(id: number) {
    return this.icons.filter(icon => icon.id == id)[0].title;
  }

  go(route: string) {
    this.router.navigate([route])
  }

}
