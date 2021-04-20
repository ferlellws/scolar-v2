import { DatePipe } from '@angular/common';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Actions } from 'src/app/models/actions';
import { ImpactInterrelation } from 'src/app/models/impact-interrelation';
import { Interrelation } from 'src/app/models/interrelation';
import { Project } from 'src/app/models/project';
import { TypeDependency } from 'src/app/models/type-dependency';
import { InterrelationsService } from 'src/app/services/interrelations.service';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ValoremSchedulesService } from 'src/app/services/valorem-schedules.service';
import { ValoremStatesService } from 'src/app/services/valorem-states.service';
import { ValoremService } from 'src/app/services/valorem.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  idProject: number;
  idInterrelation: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-interrelations-form',
  templateUrl: './interrelations-form.component.html',
  styleUrls: ['./interrelations-form.component.scss']
})
export class InterrelationsFormComponent implements OnInit {
   
  @Output() emitClose: EventEmitter<string> = new EventEmitter();
  actions!: Actions;
  interrelationsGroup!: FormGroup;
  projectControl = new FormControl();
  pluralOption: string = "interrelaciones";
  singularOption: string = "interrelación";
  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;
  showBtnClose: boolean = true;
  filterProjects!: Observable<Project[]>;
  interrelation!: Interrelation;
  impact_direction: ImpactInterrelation [] = [];
  type_dependency: TypeDependency [] = [];
  impacts_interrelations: any [] = [];
  projects: any [] = [];
  projectInterEdit!: Project;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private projectsService: ProjectsService,
    private interrelationsService:InterrelationsService
  ) { }

  ngOnInit(): void {
    environment.consoleMessage(this.data, "dataaaaa");
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }

    this.interrelationsGroup = this.fb.group({
      impact_direction: [null, Validators.required],
      impacts_interrelations: [null, Validators.required],
      date: [null, Validators.required],
      type_dependency: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.onClickProjects();
    
    if (this.data.mode == "edit") {
      environment.consoleMessage("EDITANDO");
      this.onClickDescriptionDependency();
      this.onClickImpacts();
      this.interrelationsService.getInterrelationtId(this.data.idInterrelation)
        .subscribe(res => {
          this.interrelation = res;
          this.interrelationsGroup.patchValue({
            type_description: this.interrelation.type_dependency?.id,
            impacts_interrelations: this.interrelation.impact_interrelation?.id,
            date: this.interrelation.date,
            description: this.interrelation.description
          });
          if(this.interrelation.project_affects_id == this.data.idProject) {
            this.interrelationsGroup.get('impact_direction')?.setValue(0);
            this.projectInterEdit = this.interrelation.project_impacted!;
          } else {
            this.interrelationsGroup.get('impact_direction')?.setValue(1);
            this.projectInterEdit = this.interrelation.project_affects!;
            this.projectControl.disable();
          }
        });
      
        this.interrelationsGroup.get('impact_direction')?.disable();
    }
  }

  displayFn(project: Project): string {
    return project && project.title ? project.title : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.projects.filter(project => project.title.toLowerCase().indexOf(filterValue) === 0);
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
    this.interrelationsGroup.patchValue({
      impact_direction: null,
      impacts_interrelations: null,
      date: null,
      type_dependency: null,
      description: null,
    });

    this.projectControl.reset();
    this.onClickProjects();
  }

  createRegister() {
    let projectImpacted;
    let projectAffetcs;
    
    if (this.interrelationsGroup.get('impact_direction')?.value == 0) {
      projectImpacted = this.projectControl.value.id;
      projectAffetcs = this.data.idProject;
    } else {
      projectAffetcs = this.projectControl.value.id;
      projectImpacted = this.data.idProject;
    }

    let newInterrelation: Interrelation = {
      project_impacted_id: projectImpacted,
      project_affects_id: projectAffetcs,
      type_dependency_id: this.interrelationsGroup.get('type_dependency')?.value,
      impact_interrelation_id: this.interrelationsGroup.get('impacts_interrelations')?.value,
      date: this.interrelationsGroup.get('date')?.value,
      description: this.interrelationsGroup.get('description')?.value,
    }

    environment.consoleMessage(newInterrelation,"NUEVA INTERRELACIÓN");
    this.emitClose.emit('close');
    // this.interrelationsService.addInterrelation(newInterrelation)
    //   .subscribe(res => {
    //     if(res != null){ 
    //       this.openSnackBar(true, "Registro creado satisfactoriamente", "");
    //       this.onReset();
    //       this.emitClose.emit('close');
    //     }
    //   }, (err) => {
    //     this.fButtonDisabled = false;
    //     let aErrors: any[] = [];
    //     for(let i in err.error) {
    //       aErrors = aErrors.concat(err.error[i])
    //     }
    //     let sErrors: string = "";
    //     aErrors.forEach((err) => {
    //       sErrors += "- " + err + "\n";
    //     })
  
    //     this.openSnackBar(false, sErrors, "");
    //   });
    
  }

  updateRegister() {
    let projectImpacted;
    let projectAffetcs;
    
    if (this.interrelationsGroup.get('impact_direction')?.value == 0) {
      projectAffetcs = this.data.idProject;
      if(this.projectControl.value == null) {
        projectImpacted = this.projectInterEdit.id;
      }else {
        projectImpacted = this.projectControl.value.id
      }
    } else {
      projectImpacted = this.data.idProject;
      if(this.projectControl.value == null) {
        projectAffetcs = this.projectInterEdit.id;
      } else {
        projectAffetcs = this.projectControl.value.id;
      }
    }

    let newInterrelation: Interrelation = {
      project_impacted_id: projectImpacted,
      project_affects_id: projectAffetcs,
      type_dependency_id: this.interrelationsGroup.get('type_dependency')?.value,
      impact_interrelation_id: this.interrelationsGroup.get('impacts_interrelations')?.value,
      date: this.interrelationsGroup.get('date')?.value,
      description: this.interrelationsGroup.get('description')?.value,
    }

    environment.consoleMessage(newInterrelation,"NUEVA INTERRELACIÓN");
    this.emitClose.emit('close');
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;
    if (this.interrelationsGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    if (field == 'project') {
      message = `Campo ${labelField} es requerido`
    }
    return message;
  }

  onClickImpactDirection () {
    this.impact_direction = [
      {
        id: 0,
        name: "Mi proyecto afecta a ..."
      },
      {
        id: 1,
        name: "Mi proyecto es impactado por ..."
      }
    ];
  }

  onClickDescriptionDependency () {
    this.type_dependency = [
      {
        id: 0,
        name: "Variación alcance de proceso"
      },
      {
        id: 1,
        name: "Definición de proceso"
      }
    ];
  }

  onClickImpacts () {
    this.impacts_interrelations = [
      {
        id: 0,
        name: "Bloqueante"
      },
      {
        id: 1,
        name: "No Bloqueante"
      }
    ];
  }

  onClickProjects () {
    this.projectsService.getProjectsSelect()
      .subscribe((projects: any) => {
        this.projects = projects.filter((p: Project) => p.id != this.data.idProject);
        this.filterProjects = this.projectControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value!.title),
          map(name => name ? this._filter(name) : this.projects.slice())
        );
      });
  }
}
