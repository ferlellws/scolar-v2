import { MenuService } from './../../../services/menu.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

export interface Page {
  id: number;
  title: string;
  description: string;
  sysmodule_id: number;
  route: string;
  order_menu: number;
  is_active: boolean;
  bg_color: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'tecno-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  @Input() oInfoPage!: Page;

  flagFavorite: boolean = false;
  title: string = "Home";
  description: string = "";
  bgColor: string = "#3F51B5";
  bgFavorite: string = "#fff";

  fAnimation: boolean = false;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let route: any;

    if (this.oInfoPage) {
      this.title = this.oInfoPage.title;
      this.description = this.oInfoPage.description;
      // this.bgColor = this.oInfoPage.bg_color;
    }

    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          route = e.url;
          this.menuService.getOptionByRoute(route);
        }
      });

    this.menuService.emitOption.subscribe(option => {
      console.log(option);

      this.oInfoPage = option;

      if (this.oInfoPage.route == '/home') {
        this.title = "Home";
        this.description = "";
      } else {
        this.title = this.oInfoPage.title;
        this.description = this.oInfoPage.description;
      }
      this.fAnimation = false;
      setTimeout(() => { this.fAnimation = true; }, 200);
      // console.log("+++++++++++++++>>infopage", this.oInfoPage);
    });
  }

  onFavorite() {
    this.flagFavorite = !this.flagFavorite;
    this.bgFavorite = this.flagFavorite ? "accent" : "#fff";
  }

}
