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
  resoruce_by_phases = [
    {
      id_reg: 5,
      id: 6,
      phase: {
        id: 1,
        title: "Factibilidad" 
      },
      dedication: 37.67,
      description: "prueba 1",
    },
    {
      id_reg: 6,
      id: 7,
      phase: {
        id: 2,
        title: "Inicio" 
      },
      dedication: 40,
      description: "prueba 2",
    },
    {
      id_reg: 8,
      id: 9,
      phase: {
        id: 3,
        title: "Planeación" 
      },
      dedication: 10,
      description: "prueba 3",
    },
    {
      id_reg: 10,
      id: 10,
      phase: {
        id: 4,
        title: "Ejecución" 
      },
      dedication: 23,
      description: "prueba 4",
    },
    {
      id_reg: null,
      id: 11,
      phase: {
        id: 5,
        title: "Cierre" 
      },
      dedication: 40,
      description: "prueba 5",
    },
    // {
    //   id_reg: null,
    //   id: null,
    //   phase: {
    //     id: 6,
    //     title: "BAU" 
    //   },
    //   dedication: 40,
    //   description: "nuevo registro desde la edición EDITADO sin cerrar ventana",
    // },
  ]

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

    this.phaseByProjectsService.getPhasByProjectId(this.data.project_id)
      .subscribe(data => {
        this.phases = data;
        if(this.data.mode != "edit") {
          this.generalPhase = this.phases;
        }
      });
    
    // this.testUsersService.getTestUserByProjectId
    this.testUsersService.getTestUsers()
      .subscribe(data => {
        this.testUsersByProject = data.filter((f :any) => f.project.id == this.data.project_id);
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

      this.onClickSelectFront();
      await this.supportResourcesService.getSupportResourceId(this.data.id)
        .subscribe(res => {
          this.supportResource = res;
          this.idSupportResource = res.id;
          this.resourcesGroup.patchValue({
            front: this.supportResource.operation_front?.id,
          });
          this.generalPhase = this.resoruce_by_phases;
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
      // let newsupportResource = {
      //   operation_front_id: Number(this.resourcesGroup.get('front')?.value),
      //   person_id: Number(this.personControl.value.id),
      //   project_id: Number(this.data.project_id),
      // }

      // this.supportResourcesService.addSupportResource(newsupportResource)
      //   .subscribe(res => {
      //     if(res != null) {
      //       this.openSnackBar(true, "Recurso creado satisfactoriamente", "");
      //       this.disablePhases = true;
      //       this.idSupportResource = res.id;
      //     }
      //   });

      // Nueva implementacion con TestUsers en vez de SupportResources
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
          }, (err) => {
            this.openSnackBar(false, "No se ha podido asignar este recurso al proyecto", "");
          }); 
        }

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
      let editsupportResource = {
        operation_front_id: Number(this.resourcesGroup.get('front')?.value),
        person_id: Number(person_id),
        project_id: Number(this.data.project_id),
      }

      this.supportResourcesService.updateSupportResource(editsupportResource, this.data.id)
      .subscribe(res => {
        if(res != null){
          this.openSnackBar(true, "Registro actualizado correctamente", "");
          this.emitClose.emit('close');
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
