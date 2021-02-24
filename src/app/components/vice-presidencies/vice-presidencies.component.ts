import { Component, OnInit, QueryList, ViewChildren, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
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
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

// export interface DialogData {
//   message: string;
//   name: string;
// }

@Component({
  selector: 'tecno-vice-presidencies',
  templateUrl: './vice-presidencies.component.html',
  styleUrls: ['./vice-presidencies.component.scss']
})
export class VicePresidenciesComponent implements OnInit {
  dataTable!: TableData;
 
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private vicePresidenciesService: VicePresidenciesService,
    private mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.vicePresidencies;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.vicePresidenciesService.emitDataTable
      .subscribe((res: any) => {
        environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  onCreate() {
    environment.consoleMessage("", ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(VicePresidenciesFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }

  onEdit(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onEdit: ");
    const dialogRef = this.dialog.open(VicePresidenciesFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        id: data,
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
  }

  onDelete(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
    this.vicePresidenciesService.getVicePresidenciesId(data)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: {
            title: 'Confirmación',
            question: `Esta seguro de eliminar definitivamente el siguiente registro?`,
            info: res.title,
            value: true
          }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.vicePresidenciesService.deleteVicePresidency(data)
              .subscribe(res => {
                environment.consoleMessage(res, 'res: ');
              })
          } else {
            // dataTableCopy = {...this.dataTable};
            // dataTableCopy.dataTable.find((row, index) => {
            //     if (row.idForOptions === dat) {
            //       dataTableCopy.dataTable[index].checkOption = !data.value;
            //       this.dataTable = dataTableCopy;
            //     }
            //   });
          }
        });
      })
  }

  onDeleteLogic(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
    // let dataTableCopy!: TableData;

    this.vicePresidenciesService.getVicePresidenciesId(data)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: {
            title: 'Confirmación',
            question: `Esta seguro de eliminar el siguiente registro?`,
            info: res.title,
            value: true
          }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.vicePresidenciesService.logicalDeleteVicePresidency(data)
              .subscribe(res => {
                environment.consoleMessage(res, 'res: ');
              })
          } else {
            // dataTableCopy = {...this.dataTable};
            // dataTableCopy.dataTable.find((row, index) => {
            //     if (row.idForOptions === dat) {
            //       dataTableCopy.dataTable[index].checkOption = !data.value;
            //       this.dataTable = dataTableCopy;
            //     }
            //   });
          }
        });
      })
  }

  onStatusChange(data: any) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
    let dataTableCopy!: TableData;

    this.vicePresidenciesService.getVicePresidenciesId(data.id)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: {
            title: 'Confirmación',
            question: `Esta seguro de cambiar el estado del siguiente registro?`,
            info: res.title,
            value: data.value
          }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.vicePresidenciesService.updateStatusVicePresidency(result.data, data.id)
              .subscribe(res => {
                environment.consoleMessage(res, 'res: ');
              })
          } else {
            dataTableCopy = {...this.dataTable};
            dataTableCopy.dataTable.find((row, index) => {
                if (row.idForOptions === data.id) {
                  dataTableCopy.dataTable[index].checkOption = !data.value;
                  this.dataTable = dataTableCopy;
                }
              });
          }
        });
      })

  }

}
