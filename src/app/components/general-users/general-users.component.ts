import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

// MODELS
import { TableData } from 'src/app/models/table-data';

// COMPONENTS
import { GeneralUsersFormComponent } from './general-users-form/general-users-form.component';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

//SERVICES
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';

//MATERIAL
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'tecno-general-users',
  templateUrl: './general-users.component.html',
  styleUrls: ['./general-users.component.scss']
})
export class GeneralUsersComponent implements OnInit {
  dataTable!: TableData;

  constructor(
    public dialog: MatDialog,    
    private route: ActivatedRoute,
    private userService: UserService,
    private mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.generalUsers;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);      
    });
    
    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.userService.emitDataTable
      .subscribe((res: any) => {
        environment.consoleMessage(res, "<<<<<<<<<<<<<<<<<<<<l>>>>>>>>>>>>>>>>>>>>>");
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  onCreate() {
    const dialogRef = this.dialog.open(GeneralUsersFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }


  onEdit(data: number) {
    const dialogRef = this.dialog.open(GeneralUsersFormComponent, {
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
    this.userService.getUsersId(data)
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
            this.userService.deleteUser(data)
              .subscribe(res => {
                true;//environment.consoleMessage(res, 'res: ');
              })
          }
        });
      })
  }

}
