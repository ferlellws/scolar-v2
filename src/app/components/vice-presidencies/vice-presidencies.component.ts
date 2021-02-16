import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'tecno-vice-presidencies',
  templateUrl: './vice-presidencies.component.html',
  styleUrls: ['./vice-presidencies.component.scss']
})
export class VicePresidenciesComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let route = this.router.url;

    console.log(this.menuService.getOptionByRoute(route));
  }

}
