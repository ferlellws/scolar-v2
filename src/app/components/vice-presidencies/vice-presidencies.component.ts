import { environment } from './../../../environments/environment';
import { VicePresidenciesFormComponent } from './vice-presidencies-form/vice-presidencies-form.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableData } from 'src/app/models/table-data';
import { MenuService } from 'src/app/services/menu.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'tecno-vice-presidencies',
  templateUrl: './vice-presidencies.component.html',
  styleUrls: ['./vice-presidencies.component.scss']
})
export class VicePresidenciesComponent implements OnInit {
  dataPrueba: TableData = {
    headers: ['App', 'Junio', 'Julio', 'Total', 'Estado', 'options'],
    dataTable: [
      {
        app_title: 'Niif 16',
        mes1: 15,
        mes2: 10,
        totalMes: 25,
        checkOption: false,
        idForOptions: 1
      },
      {
        app_title: 'BCT',
        mes1: 23,
        mes2: 22,
        totalMes: 45,
        checkOption: true,
        idForOptions: 2
      }
    ],
  };
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

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
