import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { PhaseByProjectsService } from 'src/app/services/phase-by-projects.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ResourceByPhasesService } from 'src/app/services/resource-by-phases.service';
import { SponsorByPhasesService } from 'src/app/services/sponsor-by-phases.service';
import { SupportResourcesService } from 'src/app/services/support-resources.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { PhaseManagementComponent } from '../project-details/phase-management/phase-management.component';
import { ProjectsFormComponent } from '../projects/projects-form/projects-form.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ComiteResourceFormComponent } from './comite-resource-form/comite-resource-form.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';

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
  fronts!: any;
  filterPersons!: Observable<Person[]>;
  personControl = new FormControl();
  flagAddSponsor: boolean = false;
  sponsorGroup!: FormGroup;
  datePhases :any[] = [];
  emptyPhases :boolean = true;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private fb: FormBuilder,
    private _usersService: UserService,
    private snackBar: MatSnackBar,
    private operationSponsorsService: OperationSponsorsService,
    private supportResourcesService :SupportResourcesService,
    private resourceByPhasesService: ResourceByPhasesService,
    private projectsService:ProjectsService,
    private sponsorByPhasesService: SponsorByPhasesService,
    private phaseByProjectsService: PhaseByProjectsService,
    private ngZone: NgZone,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }

    this.sponsorGroup = this.fb.group({
      dedication: [null, Validators.required],
    });

    this.userID = JSON.parse(localStorage.user).person_id;
    this.profileID = JSON.parse(localStorage.user).profile_id;

    this.mainService.showLoading();
    this.route.data.subscribe(data =>{
      this.project = data.project;
      this.sponsors = data.sponsors
      this.persons = data.resources;
      this.fronts = data.supportResources.fronts;
      
      environment.consoleMessage(this.fronts, "FRENTES");

      this.phaseByProjectsService.getPhaseByProjectId(Number(this.project.id))
        .subscribe(res => {
          this.datePhases = res.datePhases;
          for (let index = 0; index < this.datePhases.length; index++) {
            if(this.datePhases[index].reg_id != null) {
              this.emptyPhases = false;
            }
          }
        });

      this.filterPersons = this.personControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value!.full_name),
        map(name => name ? this._filter(name) : this.persons.slice())
      );

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
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
        person_id: Number(this.personControl.value.id),
      }
      let dedication = this.sponsorGroup.get('dedication')?.value;

      this.operationSponsorsService.addOperationSponsor(newSponsor)
        .subscribe(res => {
          if(res != null) {
            this.openSnackBar(true, "Sponsor creado correctamente", "");
            
            for (let index = 0; index < this.datePhases.length; index++) {
              if(this.datePhases[index].reg_id != null) {
                let newSponsorByPhase = {
                  phase_by_project_id: this.datePhases[index].reg_id,
                  operation_sponsor_id: res.id,
                  dedication: dedication,
                }
                this.sponsorByPhasesService.addSponsorByPhase(newSponsorByPhase)
                  .subscribe(res => {
                    environment.consoleMessage(res, "RES SponsorByPhases");;
                  });        
              }
            }

            this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
            .subscribe(res => {
              this.sponsors = res.filter((f :any) => f.is_active == true);;
            });
          }      
      });
        
    }else if (typeof this.personControl.value == 'string') {
      this.openSnackBar(false, "No existe un usuario creado con este nombre", "");
    }
    this.personControl.reset();
    this.sponsorGroup.reset();

    this.filterPersons = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value!.full_name),
      map(name => name ? this._filter(name) : this.persons.slice())
    );
  }

  editResourceComite(id: any, type: string) {
    const dialogRef = this.dialog.open(ComiteResourceFormComponent, {
      // width: environment.widthFormsLittleModal,
      width: "600px",
      disableClose: true,
      data: {
        mode: 'edit',
        labelAction: 'Editar',
        project: this.project,
        resource_id: id,
        people: this.persons,
        type_resource: type
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close') {
        dialogRef.close();
        this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
          .subscribe(data => {
            this.sponsors = data.filter((f :any) => f.is_active == true);;
          });
      }
    });
  }

  deleteSponsor(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmación para eliminar registro",
        info: "¿Está seguro que desea eliminar este registro?",
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        // this.operationSponsorsService.deleteOperationSponsor(id)
        // .subscribe(res => {
        //   this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
        //   dialogRef.close();
        //   this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
        //     .subscribe(res => {
        //       this.sponsors = res;
        //     });
        // });
        let updateState = {
          is_active: false
        }
        this.operationSponsorsService.updateOperationSponsor(updateState, id)
          .subscribe(res => {
            this.operationSponsorsService.getOperationSponsorProjectId(this.project.id)
              .subscribe(res => {
                this.sponsors = res.filter((f :any) => f.is_active == true);
                dialogRef.close();
              });
          });
      } else {
        dialogRef.close();
      }
    });
  }

  onCreateSupportResource() {
    const dialogRef = this.dialog.open(ResourceFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true,
      data: {
        mode: 'create',
        labelAction: 'Crear',
        project_id: this.project.id,
        supportResources: this.persons
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close') {
        dialogRef.close();
        this.resourceByPhasesService.getResourcesByProjectId(Number(this.project.id))
          .subscribe(data => {
            this.fronts = data.fronts;
          });
      }
    });
  }

  onEditSupportResource(id: number) {
    const dialogRef = this.dialog.open(ResourceFormComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true,
      data: {
        mode: 'edit',
        labelAction: 'Editar',
        project_id: this.project.id,
        id: id,
        supportResources: this.persons
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close') {
        dialogRef.close();
        this.resourceByPhasesService.getResourcesByProjectId(Number(this.project.id))
          .subscribe(data => {
            this.fronts = data.fronts;
          });
      }
    });
  }

  onDeleteSupportResource(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmación para eliminar registro",
        info: "¿Está seguro que desea eliminar este registro?",
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.supportResourcesService.deleteSupportResource(id)
        .subscribe(res => {
          this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
          dialogRef.close();
          this.supportResourcesService.getSupportResourceProjectId(Number(this.project.id))
            .subscribe(data => {
              this.fronts = data.fronts;
            });
        });
      } else {
        dialogRef.close();
      }
    });
  }

  onProjectEdit() {
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {   
        id: this.project.id,
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
          this.projectsService.getProjectsId(Number(this.project.id))
            .subscribe(res => {
              this.project = res;
            });
        }
      });
  }

  onPhaseManagements(id: any) {
    const dialogRef = this.dialog.open(PhaseManagementComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true,
      data: {   
        idProject: id,
        mode: 'create',
        labelAction: 'Crear'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
          this.resourceByPhasesService.getResourcesByProjectId(Number(this.project.id))
            .subscribe(data => {
              this.fronts = data.fronts;
            });
          
          this.phaseByProjectsService.getPhaseByProjectId(Number(this.project.id))
            .subscribe(res => {
              this.datePhases = res.datePhases;
              for (let index = 0; index < this.datePhases.length; index++) {
                if(this.datePhases[index].reg_id != null) {
                  this.emptyPhases = false;
                }
              }
            });
        }
      });
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
