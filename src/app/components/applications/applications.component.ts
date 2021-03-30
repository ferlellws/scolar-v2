import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { TableData } from 'src/app/models/table-data';

// COMPONENTS
import { ApplicationsFormComponent } from './applications-form/applications-form.component';

// SERVICES
import { ApplicationsService } from 'src/app/services/applications.service';

// MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { Actions } from 'src/app/models/actions';


@Component({
  selector: 'tecno-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  dataTable!: TableData;
  actions!: Actions;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private applicationsService: ApplicationsService,
    private mainService: MainService,
  ) { }
  
  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.applications;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.applicationsService.emitDataTable
      .subscribe((res: any) => {
        true;//environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  onCreate() {
    true;//environment.consoleMessage("", ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(ApplicationsFormComponent, {
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
    const dialogRef = this.dialog.open(ApplicationsFormComponent, {
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
    this.applicationsService.getApplicationsId(data)
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
            this.applicationsService.deleteApplication(data)
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

    this.applicationsService.getApplicationsId(data)
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
            this.applicationsService.logicalDeleteApplication(data)
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

    this.applicationsService.getApplicationsId(data.id)
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
            this.applicationsService.updateStatusApplication(result.data, data.id)
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
