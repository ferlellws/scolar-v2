import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { TableData } from 'src/app/models/table-data';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
@Component({
  selector: 'tecno-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  dataTable!: TableData;
  
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private mainService: MainService,
    ) { 
  }
    
  ngOnInit(): void {

    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.projects;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.projectService.emitDataTable
      .subscribe((res: any) => {
        environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      });

  }

  onCreate() {
    environment.consoleMessage("", ">>>>>>>>>>>>>>>>> openDialog");
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data = 'close'){
          dialogRef.close();
        }
      }
    );
  }

  onEdit(data: number) {
    environment.consoleMessage(data, ">>>>>>>>>>>>>>>>> onEdit: ");
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
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
    this.projectService.getProjectsId(data)
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
            this.projectService.deleteProjectsId(data)
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

    this.projectService.getProjectsId(data)
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
            this.projectService.logicalDeleteProject(data)
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

    this.projectService.getProjectsId(data.id)
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
            this.projectService.updateStatusProject(result.data, data.id)
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
