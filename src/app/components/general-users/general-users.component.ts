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
import { Actions } from 'src/app/models/actions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'tecno-general-users',
  templateUrl: './general-users.component.html',
  styleUrls: ['./general-users.component.scss']
})
export class GeneralUsersComponent implements OnInit {
  dataTable!: TableData;
  actions!: Actions;
  
  constructor(
    public dialog: MatDialog,    
    private route: ActivatedRoute,
    private userService: UserService,
    private mainService: MainService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.generalUsers;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);      
    });
    
    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.userService.emitDataTable
      .subscribe((res: any) => {
        // this.dataTable = res.data;
        this.userService.getUsersTable()
          .subscribe(res => {
            this.dataTable = res;
          })
        this.dialog.closeAll();
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(GeneralUsersFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }


  onEdit(data: number) {
    const dialogRef = this.dialog.open(GeneralUsersFormComponent, {
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
                this.openSnackBar(true, "Se ha eliminado el usuario satisfactoriamente", "");
              })
          }
        });
      })
  }

  openSnackBar(succes: boolean, message: string, action: string, duration: number = 3000) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

}
