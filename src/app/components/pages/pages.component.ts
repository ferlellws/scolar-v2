import { MenuModulesService } from './../../services/menu-modules.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuModule } from 'src/app/models/menu-module';

// MODELS
import { Page } from 'src/app/models/page';
import { environment } from 'src/environments/environment';

// SERVICES
import { MainService } from './../../services/main.service';

@Component({
  selector: 'tecno-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  fForm: boolean = false;
  pagesWithoutModule!: Page[];
  pagesModules!: {
    menuModules: MenuModule[];
    pages: Page[];
  };

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private menuModulesService: MenuModulesService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.pagesWithoutModule = data.pagesWithoutModule;
      this.pagesModules = data.pagesModules;
      environment.consoleMessage(data, "****************");
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
  }

  dropModules(event: CdkDragDrop<string[]>) {
    environment.consoleMessage(event);
    moveItemInArray(this.pagesModules.menuModules, event.previousIndex, event.currentIndex);
    this.menuModulesService.changeOrdering(this.pagesModules.menuModules)
      .subscribe(res => console.log(res))
  }

}
