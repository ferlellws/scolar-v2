
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { TableData } from 'src/app/models/table-data';

// COMPONENTS
import { PhasesFormComponent } from './phases-form/phases-form.component';

// SERVICES
import { PhasesService } from 'src/app/services/phases.service';

// MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'tecno-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {

  dataTable!: TableData;
 
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private phasesService: PhasesService,
    private mainService: MainService,
  ) { }
  
  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.phases;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.phasesService.emitDataTable
      .subscribe((res: any) => {
        environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  onCreate() {
    environment.consoleMessage("", ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(PhasesFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }

  onEdit(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onEdit: ");
    const dialogRef = this.dialog.open(PhasesFormComponent, {
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
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
    this.phasesService.getPhasesId(data)
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
            this.phasesService.deletePhase(data)
              .subscribe(res => {
                environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

  onDeleteLogic(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
    // let dataTableCopy!: TableData;

    this.phasesService.getPhasesId(data)
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
            this.phasesService.logicalDeletePhase(data)
              .subscribe(res => {
                environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

  onStatusChange(data: any) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
    let dataTableCopy!: TableData;

    this.phasesService.getPhasesId(data.id)
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
            this.phasesService.updateStatusPhase(result.data, data.id)
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
