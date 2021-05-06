import { number } from '@amcharts/amcharts4/core';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OperationFront } from 'src/app/models/operation-front';
import { Person } from 'src/app/models/person';
import { SupportResource } from 'src/app/models/support-resource';
import { OperationFrontsService } from 'src/app/services/operation-fronts.service';
import { SupportResourcesService } from 'src/app/services/support-resources.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
  project_id: number;
}

@Component({
  selector: 'tecno-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  
  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  showBtnClose: boolean = true;
  pluralOption: string = "Recursos de Soporte";
  singularOption: string = "Recurso de Soporte";
  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;
  resourcesGroup!: FormGroup;
  selectOperationFronst: OperationFront [] = [];
  persons!: any;
  filterPersons!: Observable<Person[]>;
  personControl = new FormControl();
  supportResource!: SupportResource;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private usersService: UserService,
    private operationFrontsService:OperationFrontsService,
    private supportResourcesService:SupportResourcesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.resourcesGroup = this.fb.group({
      front: [null, Validators.required],
      dedication: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.usersService.getFunctionalResources()
    .subscribe(users => {
      this.persons = users;
      this.filterPersons = this.personControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value!.full_name),
        map(name => name ? this._filter(name) : this.persons.slice())
      );
    });

    if(this.data.mode == "edit") {
      this.onClickSelectFront();
      await this.supportResourcesService.getSupportResourceId(this.data.id)
        .subscribe(res => {
          this.supportResource = res;
          
          this.resourcesGroup.patchValue({
            front: this.supportResource.operation_front?.id,
            dedication: this.supportResource.dedication,
            description: this.supportResource.description
          });
      });
    }
  }

  displayFn(person: Person): string {
    return person && person.full_name ? person.full_name : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.persons.filter((person :any) => person.full_name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  onSubmit() {
    if (!this.isButtonReset) {
      this.fButtonDisabled = true;
      if (this.data.mode == 'create') {
        this.createRegister();
      } else {
        this.updateRegister();
      }
    }
  }

  onReset() {
    this.isButtonReset = true;
    this.resourcesGroup.reset();
  }

  createRegister() {
    if (this.personControl.value != null && typeof this.personControl.value == 'object') {
      let newsupportResource = {
        operation_front_id: Number(this.resourcesGroup.get('front')?.value),
        person_id: Number(this.personControl.value.id),
        project_id: Number(this.data.project_id),
        dedication: Number(this.resourcesGroup.get('dedication')?.value),
        description: String(this.resourcesGroup.get('description')?.value)
      }

      this.supportResourcesService.addSupportResource(newsupportResource)
        .subscribe(res => {
          if(res != null) {
            this.openSnackBar(true, "Registro creado satisfactoriamente", "");
            this.emitClose.emit('close');
          }
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
      let editsupportResource = {
        operation_front_id: Number(this.resourcesGroup.get('front')?.value),
        person_id: Number(person_id),
        project_id: Number(this.data.project_id),
        dedication: Number(this.resourcesGroup.get('dedication')?.value),
        description: String(this.resourcesGroup.get('description')?.value)
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
    this.operationFrontsService.getOperationFrontsAll()
      .subscribe(res => {
        this.selectOperationFronst = res;
      });
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
