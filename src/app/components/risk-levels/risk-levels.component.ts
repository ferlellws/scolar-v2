import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

//SERVICES
import { RiskLevelsService } from 'src/app/services/risk-levels.service';

// MODELS
import { TableData } from 'src/app/models/table-data';

// MATERIAL
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { MainService } from 'src/app/services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { RiskLevelsFormComponent } from './risk-levels-form/risk-levels-form.component';

@Component({
  selector: 'tecno-risk-levels',
  templateUrl: './risk-levels.component.html',
  styleUrls: ['./risk-levels.component.scss']
})
export class RiskLevelsComponent implements OnInit {

  dataTable!: TableData;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private riskLevelsService: RiskLevelsService,
    private mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.riskLevels;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.riskLevelsService.emitDataTable
      .subscribe((res: any) => {
        // environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  onCreate() {
    // environment.consoleMessage("", ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(RiskLevelsFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }

  onEdit(data: number) {
    // environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onEdit: ");
    const dialogRef = this.dialog.open(RiskLevelsFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        id: data,
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
  }

  onDelete(data: number) {
    // environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
    this.riskLevelsService.getRiskLevelsId(data)
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
          // environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.riskLevelsService.deleteRiskLevel(data)
              .subscribe(res => {
                // environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

  onDeleteLogic(data: number) {
    // environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
    // let dataTableCopy!: TableData;

    this.riskLevelsService.getRiskLevelsId(data)
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
          // environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.riskLevelsService.logicalDeleteRisklevel(data)
              .subscribe(res => {
                // environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

  onStatusChange(data: any) {
    // environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
    let dataTableCopy!: TableData;

    this.riskLevelsService.getRiskLevelsId(data.id)
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
          // environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.riskLevelsService.updateStatusRiskLevel(result.data, data.id)
              .subscribe(res => {
                // environment.consoleMessage(res, 'res: ');
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
