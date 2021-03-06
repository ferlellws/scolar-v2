import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Actions } from 'src/app/models/actions';
import { TableData } from 'src/app/models/table-data';
import { MainService } from 'src/app/services/main.service';
import { PersonsService } from 'src/app/services/persons.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { PersonsFormComponent } from './persons-form/persons-form.component';

@Component({
  selector: 'tecno-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  dataTable!: TableData;
  actions!: Actions;

  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];
  
  constructor(
    public dialog: MatDialog,    
    private route: ActivatedRoute,
    private userService: UserService,
    private personsService: PersonsService,
    private mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.dataTable = data.persons;

      this.personsService.getPeopleCount()
        .subscribe(res => {
          this.length = res;
          this.pageSizeOptions.push(this.length);
          this.pageSizeOptions = JSON.parse(JSON.stringify(this.pageSizeOptions));
        });
      setTimeout(() => {this.mainService.hideLoading()}, 1000);      
    });

    // SE REVISAN CAMBIOS DEL DATATABLE USANDO UN EMISOR
    this.personsService.emitDataTable
      .subscribe((res: any) => {
        this.dataTable = res.data;
        this.dialog.closeAll();
      })
  }

  paginator(event: PageEvent) {
    this.personsService.getTablaPeople(event.pageIndex + 1, event.pageSize)
      .subscribe(res => {
        this.dataTable = res;
      });
  }
  
  onCreate() {
    const dialogRef = this.dialog.open(PersonsFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear'
      }
    });
  }

  onEdit(data: number) {
    const dialogRef = this.dialog.open(PersonsFormComponent, {
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
    let person: any;
    this.personsService.getPersonsId(data)
      .subscribe((res) => {
        person = res;
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: {
            title: 'Confirmaci??n',
            question: `Esta seguro de eliminar definitivamente el siguiente registro?`,
            info: res.full_name,
            value: true
          }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          true;//environment.consoleMessage(result, 'The dialog was closed');
          if (result) {
            this.personsService.deletePerson(data)
              .subscribe(res => {
                this.userService.deleteUser(person.user.id)
                .subscribe(res => {
                  true;
                })
              })
          }
        });
      })
  }
}
