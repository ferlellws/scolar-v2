import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Actions } from 'src/app/models/actions';
import { OperationFront } from 'src/app/models/operation-front';
import { OperationSponsor } from 'src/app/models/operation-sponsor';
import { Person } from 'src/app/models/person';
import { Project } from 'src/app/models/project';
import { MainService } from 'src/app/services/main.service';
import { OperationSponsorsService } from 'src/app/services/operation-sponsors.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tecno-operation-resources',
  templateUrl: './operation-resources.component.html',
  styleUrls: ['./operation-resources.component.scss']
})
export class OperationResourcesComponent implements OnInit {
  actions!: Actions;
  userID: any;
  profileID: any;
  
  project!: Project;
  sponsors: OperationSponsor[] = [];
  persons!: any;

  fronts = [
    {
      name: "Frente Tecnológico",
      resources: [
        {
          id: 1,
          name: "Carlos Sanchez",
          dedication: "15%",
          description: "Ejemplo de rol/alcance alñsjmdlaksdklansd as dnaklsnd kad kjasdhaksd nkadb kasbnd kasdbjkasb dasdb kasdb kasdb akbsdajksdbjkasdb kajsd bkjashd jkassd jkasdb k",
          totalDedication: 40
        },
        {
          id: 3,
          name: "Daniel Cortés",
          dedication: "7%",
          description: "Más descripciones",
          totalDedication: 70
        },
      ]
    },
    {
      name: "Frente Financiero",
      resources: [
        {
          id: 2,
          name: "Adriana Lucia Ocampoz",
          dedication: "35%",
          description: "Ejemplo de rol/alcance 2 y otros alñsjmdlaksdklansd as dnaklsnd kad kjasdhaksd nkadb kasbnd kasdbjkasb dasdb kasdb kasdb akbsdajksdbjkasdb kajsd bkjashd jkassd jkasdb k",
          totalDedication: 40
        },
      ]
    },
    {
      name: "Frente Contable",
      resources: [
        {
          id: 2,
          name: "Adriana Lucia Ocampoz",
          dedication: "35%",
          description: "Ejemplo de rol/alcance 2 y otros alñsjmdlaksdklansd as dnaklsnd kad kjasdhaksd nkadb kasbnd kasdbjkasb dasdb kasdb kasdb akbsdajksdbjkasdb kajsd bkjashd jkassd jkasdb k",
          totalDedication: 60
        },
      ]
    },
  ];
  
  filterPersons!: Observable<Person[]>;
  personControl = new FormControl();
  flagAddSponsor: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private fb: FormBuilder,
    private _usersService: UserService,
    private snackBar: MatSnackBar,
    private operationSponsorsService:OperationSponsorsService,
    private ngZone: NgZone,
    public dialog: MatDialog,    
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.userID = JSON.parse(localStorage.user).person_id;
    this.profileID = JSON.parse(localStorage.user).profile_id;

    this.mainService.showLoading();
    this.route.data.subscribe(data =>{
      this.project = data.project;
      //this.sponsors = data.sponsors.filter((data:any) => data.project.id == this.project.id);
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
      .subscribe(res => {
        this.sponsors = res;
      });

    this._usersService.getFunctionalResources()
    .subscribe(users => {
      this.persons = users;
      this.filterPersons = this.personControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value!.full_name),
        map(name => name ? this._filter(name) : this.persons.slice())
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    environment.consoleMessage(changes, "Cambiosssssssssss");
  }
  
  displayFn(person: Person): string {
    return person && person.full_name ? person.full_name : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.persons.filter((person :any) => person.full_name.toLowerCase().indexOf(filterValue) === 0);
  }


  addSponsor() {
    if (typeof this.personControl.value == 'object') {
      let newSponsor = {
        project_id: Number(this.project.id),
        person_id: Number(this.personControl.value.id)
      }
      this.operationSponsorsService.addOperationSponsor(newSponsor)
        .subscribe(res => {
          if(res != null) {
            this.openSnackBar(true, "Sponsor creado correctamente", "");
            
            this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
            .subscribe(res => {
              this.sponsors = res;
            });
          }      
      });
        
    }else if (typeof this.personControl.value == 'string') {
      this.openSnackBar(false, "No existe un usuario creado con este nombre", "");
    }
    this.personControl.reset();
  }

  deleteSponsor(id: any) {
    environment.consoleMessage("Delete Sponsor");
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmación para eliminar registro",
        info: "¿Está seguro que desea eliminar este registro?",
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.operationSponsorsService.deleteOperationSponsor(id)
        .subscribe(res => {
          this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
          dialogRef.close();
          this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
            .subscribe(res => {
              this.sponsors = res;
            });
        });
      } else {
        dialogRef.close();
      }
    });
  }

  onCreateSupportResource() {

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
