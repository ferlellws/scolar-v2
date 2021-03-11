import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { TableData } from 'src/app/models/table-data';

// COMPONENTS
//import { PhasesFormComponent } from './shases-form/shases-form.component';

// SERVICES
import { StatesService } from 'src/app/services/states.service';

// MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { StatesFormComponent } from './states-form/states-form.component';

@Component({
  selector: 'tecno-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  dataTable!: TableData;
 
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private statesService: StatesService,
    private mainService: MainService,
  ) { }
  
  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.states;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.statesService.emitDataTable
      .subscribe((res: any) => {
        true;//environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  onCreate() {
    true;//environment.consoleMessage("", ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(StatesFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }

  onEdit(data: number) {
    true;//environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onEdit: ");
    const dialogRef = this.dialog.open(StatesFormComponent, {
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
    true;//environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDelete: ");
    this.statesService.getStatesId(data)
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
          true;//environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.statesService.deleteStatesId(data)
              .subscribe(res => {
                true;//environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

  onDeleteLogic(data: number) {
    true;//environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onDeleteLogic: ");
    // let dataTableCopy!: TableData;

    this.statesService.getStatesId(data)
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
          true;//environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.statesService.logicalDeleteState(data)
              .subscribe(res => {
                true;//environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

  onStatusChange(data: any) {
    true;//environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onStatusChange: ");
    let dataTableCopy!: TableData;

    this.statesService.getStatesId(data.id)
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
          true;//environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.statesService.updateStatusState(result.data, data.id)
              .subscribe(res => {
                true;//environment.consoleMessage(res, 'res: ');
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
