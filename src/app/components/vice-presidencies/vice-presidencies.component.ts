import { Component, OnInit, QueryList, ViewChildren, EventEmitter, Output } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { TableData } from 'src/app/models/table-data';

// COMPONENTS
import { VicePresidenciesFormComponent } from './vice-presidencies-form/vice-presidencies-form.component';

// SERVICES
import { MenuService } from 'src/app/services/menu.service';
import { VicePresidenciesService } from './../../services/vice-presidencies.service';

// MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'tecno-vice-presidencies',
  templateUrl: './vice-presidencies.component.html',
  styleUrls: ['./vice-presidencies.component.scss']
})
export class VicePresidenciesComponent implements OnInit {
  dataTable!: TableData;
  // @Output() emitShowLoading = new EventEmitter<boolean>();
  // dataPrueba: TableData = {
  //   headers: ['App', 'Junio', 'Julio', 'Total', 'Estado', 'options'],
  //   dataTable: [
  //     {
  //       app_title: 'Niif 16',
  //       mes1: 15,
  //       mes2: 10,
  //       totalMes: 25,
  //       checkOption: false,
  //       idForOptions: 1
  //     },
  //     {
  //       app_title: 'BCT',
  //       mes1: 23,
  //       mes2: 22,
  //       totalMes: 45,
  //       checkOption: true,
  //       idForOptions: 2
  //     }
  //   ],
  // };
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private vicePresidenciesService: VicePresidenciesService,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    // this.dataTable
    // this.vicePresidenciesService.getVicePresidenciesAll()
    //   .subscribe(data => {
    //     environment.consoleMessage(data);
    //     this.dataTable = data;
    //   });
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.vicePresidencies;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
  }

  openDialog(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(VicePresidenciesFormComponent, {
      width: '80%',
      disableClose: true
    });
    // let instance = dialogRef.componentInstance;
    // instance.mode = 'create';
    // instance.project = this.project;
    // instance.icons = this.icons;
    // instance.item = new Item;
    // instance.dialogRef = dialogRef;

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  onEdit() {
    environment.consoleMessage("onEdit", ">>>>>>>>>>>>>>>>> onEdit: ");
  }

  onDelete(data: number) {

    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
  }

  onDeleteLogic(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
  }

  onStatusChange(data: any) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
  }

}
