import { number } from '@amcharts/amcharts4/core';
import { NgZone } from '@angular/core';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OperationFront } from 'src/app/models/operation-front';
import { Person } from 'src/app/models/person';
import { PhaseByProject } from 'src/app/models/phase-by-project';
import { SupportResource } from 'src/app/models/support-resource';
import { TestUser } from 'src/app/models/test-user';
import { OperationFrontsService } from 'src/app/services/operation-fronts.service';
import { PhaseByProjectsService } from 'src/app/services/phase-by-projects.service';
import { ResourceByPhasesService } from 'src/app/services/resource-by-phases.service';
import { SupportResourcesService } from 'src/app/services/support-resources.service';
import { TestUsersService } from 'src/app/services/test-users.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
  project_id: number;
  supportResources: SupportResource
}

@Component({
  selector: 'tecno-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  
  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  showBtnClose: boolean = true;
  pluralOption: string = "Recursos Funcionales";
  singularOption: string = "Recurso Funcional";
  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;
  resourcesGroup!: FormGroup;
  selectOperationFronst: OperationFront [] = [];
  persons!: any;
  filterPersons!: Observable<Person[]>;
  personControl = new FormControl();
  supportResource!: SupportResource;
  cargaProject!: boolean;
  selectPhases: any[] = [];
  disablePhases: boolean = false;
  flagModeGeneral: string = "create";
  generalPhase: any;
  idSupportResource!: number;
  phases: PhaseByProject[] = [];
  testUsersByProject: TestUser[] = [];
  testUsersByProjectIdsPerson: number[] = [];
  disablePerson: boolean = false;
  resource_by_phases: any[] = [];
  emptyPhases: boolean = true;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private operationFrontsService: OperationFrontsService,
    private supportResourcesService: SupportResourcesService,
    private phaseByProjectsService: PhaseByProjectsService,
    private resourceByPhasesService: ResourceByPhasesService,
    private testUsersService: TestUsersService,
    private ngZone: NgZone,
  ) { }

  async ngOnInit(): Promise<void> {
    this.resourcesGroup = this.fb.group({
      front: [null, Validators.required],
    });

    this.phaseByProjectsService.getPhaseByProjectId(this.data.project_id)
      .subscribe(data => {
        this.phases = data;
        for (let index = 0; index < this.phases.length; index++) {
          if(data[index].reg_id != null) {
            this.emptyPhases = false;
          }
        }
        if(this.data.mode != "edit") {
          this.generalPhase = this.phases;
        }
      });
    
    this.testUsersService.getTestUserByProjectId(this.data.project_id)
      .subscribe(data => {
        this.testUsersByProject = data;
        for (let index = 0; index < this.testUsersByProject.length; index++) {
          this.testUsersByProjectIdsPerson.push(Number(this.testUsersByProject[index].person?.id));
        }
      });

    this.onClickSelectFront();
    
    this.persons = this.data.supportResources;
    this.filterPersons = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value!.full_name),
      map(name => name ? this._filter(name) : this.persons.slice())
    );

    // Edición ...............................................................
    if(this.data.mode == "edit") {
      this.disablePhases = true;
      this.cargaProject = false;
      this.flagModeGeneral = "edit";
      this.disablePerson = !this.disablePerson;
      this.onClickSelectFront();
      await this.testUsersService.getTestUserById(this.data.id)
        .subscribe(res => {
          this.supportResource = res;
          this.idSupportResource = res.id;
          this.resourcesGroup.patchValue({
            front: this.supportResource.operation_front?.id,
          });

          this.resourceByPhasesService.getResourcesByProjectDataProjectByResource(this.data.project_id, this.idSupportResource)
            .subscribe(data => {
              this.generalPhase = data.data_by_resource;
            });
          this.cargaProject = true;
      });
    }
  }

  closeForm() {
    this.emitClose.emit('close');
  }

  displayFn(person: Person): string {
    return person && person.full_name ? person.full_name : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.persons.filter((person :any) => person.full_name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  onReset() {
    this.isButtonReset = true;
    this.resourcesGroup.reset();
    this.personControl.reset();
    this.filterPersons = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value!.full_name),
      map(name => name ? this._filter(name) : this.persons.slice())
    );
    this.disablePhases = false;
    this.fButtonDisabled = false;
  }

  createRegister() {
    if (this.personControl.value != null && typeof this.personControl.value == 'object') {
      if(this.testUsersByProjectIdsPerson.includes(Number(this.personControl.value.id))) {
        let testUserUpdate = this.testUsersByProject.filter((f: any) => f.person.id == Number(this.personControl.value.id));
        let updateTestUser = {
          operation_front_id: Number(this.resourcesGroup.get('front')?.value),
        }
        this.testUsersService.updateTestUsersId(updateTestUser, Number(testUserUpdate[0].id))
          .subscribe(res => {
            this.openSnackBar(true, "Registro actualizado correctamente", "");
            this.disablePhases = true;
            this.idSupportResource = res.id;
            this.fButtonDisabled = !this.fButtonDisabled;
            this.disablePerson = !this.disablePerson;
            
            this.testUsersService.getTestUserById(res.id)
              .subscribe(res => {
                this.supportResource = res;
                this.idSupportResource = res.id;
                this.generalPhase = this.resource_by_phases;
                this.cargaProject = true;
              });

          }, (err) => {
            this.openSnackBar(false, "No se ha podido asignar un frente de operación", "");
          });        
      } else {
        let createTestUser = {
          operation_front_id: Number(this.resourcesGroup.get('front')?.value),
          person_id: Number(this.personControl.value.id),
          project_id: Number(this.data.project_id),
        }
        this.testUsersService.addTestUser(createTestUser)
          .subscribe(res => {
            this.openSnackBar(true, "Recurso asignado correctamente", "");
            this.disablePhases = true;
            this.idSupportResource = res.id;
            this.fButtonDisabled = !this.fButtonDisabled;
            this.disablePerson = !this.disablePerson;
          }, (err) => {
            this.openSnackBar(false, "No se ha podido asignar este recurso al proyecto", "");
          }); 
      }
      this.resourceByPhasesService.getResourcesByProjectDataProjectByResource(this.data.project_id, this.idSupportResource)
        .subscribe(data => {
          this.generalPhase = data.data_by_resource;
          this.cargaProject = true;
        });
    } else{
      this.openSnackBar(false, "No existe un usuario creado con este nombre", "");
      this.fButtonDisabled = false;
    }
  }

  updateRegister() {
    let person_id;
    if (this.personControl.value != null && typeof this.personControl.value == 'object') {
      person_id = Number(this.personControl.value.id)
    } else if(this.personControl.value == null) {
      person_id = this.supportResource.person?.id
    } else if (typeof this.personControl.value == 'string') {
      this.openSnackBar(false, "No existe un usuario creado con este nombre", "");
      this.fButtonDisabled = false;
    }

    if(typeof this.personControl.value == 'object' || this.personControl.value == null) {
      let editResource = {
        operation_front_id: Number(this.resourcesGroup.get('front')?.value),
        person_id: Number(person_id),
        project_id: Number(this.data.project_id),
      }

      this.testUsersService.updateTestUsersId(editResource, this.data.id)
      .subscribe(res => {
        if(res != null){
          this.openSnackBar(true, "Registro actualizado correctamente", "");
        }
      });
    }
  }

  onClickSelectFront() {
    if(this.selectOperationFronst.length == 0) {
      this.operationFrontsService.getOperationFrontsAll()
      .subscribe(res => {
        this.selectOperationFronst = res;
      });
    }
  }
  
  getMessageError(field: string, labelField: string): string {
    let message!: string;
    
    if (this.resourcesGroup.get(field)?.errors?.max) {
      message = `Máximo ${this.resourcesGroup.get(field)?.errors?.max.max}`
    }

    if (this.resourcesGroup.get(field)?.errors?.min) {
      message = `Mínimo ${this.resourcesGroup.get(field)?.errors?.min.min}`
    }

    if (this.resourcesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
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
