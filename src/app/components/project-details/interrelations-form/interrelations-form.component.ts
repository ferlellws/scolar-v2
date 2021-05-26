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
import { ImpactsInterrelationsService } from 'src/app/services/impacts-interrelations.service';
import { InterrelationsService } from 'src/app/services/interrelations.service';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TypesDependenciesService } from 'src/app/services/types-dependencies.service';
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
  titleProjectEdit : string = "";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private projectsService: ProjectsService,
    private interrelationsService:InterrelationsService,
    private typesDependenciesService:TypesDependenciesService,
    private impactsInterrelationsService:ImpactsInterrelationsService
  ) { }

  ngOnInit(): void {
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

    this.onClickImpactDirection();
    this.onClickDescriptionDependency();
    this.onClickImpacts();
    this.onClickProjects();
    
    if (this.data.mode == "edit") {
      this.onClickDescriptionDependency();
      this.onClickImpacts();
      this.interrelationsService.getInterrelationtId(this.data.idInterrelation)
        .subscribe(res => {
          this.interrelation = res;
          this.interrelationsGroup.patchValue({
            type_dependency: this.interrelation.types_dependency?.id,
            impacts_interrelations: this.interrelation.impacts_interrelation?.id,
            date: this.interrelation.date,
            description: this.interrelation.description
          });
          if(this.interrelation.project_affect?.id == this.data.idProject) {
            this.interrelationsGroup.get('impact_direction')?.setValue(0);
            this.projectInterEdit = this.interrelation.project_impacted!;
          } else {
            this.interrelationsGroup.get('impact_direction')?.setValue(1);
            this.projectInterEdit = this.interrelation.project_affect!;
          }
          this.titleProjectEdit = this.projectInterEdit.title;
        });
        //this.interrelationsGroup.get('impact_direction')?.disable();
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
      project_affect_id: projectAffetcs,
      types_dependency_id: this.interrelationsGroup.get('type_dependency')?.value,
      impacts_interrelation_id: this.interrelationsGroup.get('impacts_interrelations')?.value,
      date: this.interrelationsGroup.get('date')?.value,
      description: this.interrelationsGroup.get('description')?.value,
    }
    
    this.interrelationsService.addInterrelation(newInterrelation)
      .subscribe(res => {
        if(res != null){ 
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
          this.onReset();
          this.emitClose.emit('close');
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }
        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
        })
        this.openSnackBar(false, sErrors, "");
      });
    
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
      project_affect_id: projectAffetcs,
      types_dependency_id: this.interrelationsGroup.get('type_dependency')?.value,
      impacts_interrelation_id: this.interrelationsGroup.get('impacts_interrelations')?.value,
      date: this.interrelationsGroup.get('date')?.value,
      description: this.interrelationsGroup.get('description')?.value,
    }

    this.interrelationsService.updateInterrelation(newInterrelation, this.data.idInterrelation)
      .subscribe(res => {
        if(res != null){ 
          this.openSnackBar(true, "Registro modificado satisfactoriamente", "");
          this.onReset();
          this.emitClose.emit('close');
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }
        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
        })
        this.openSnackBar(false, sErrors, "");
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
    this.typesDependenciesService.getTypeDependencyAll()
      .subscribe(types => {
        this.type_dependency = types;
      });
  }

  onClickImpacts () {
    this.impactsInterrelationsService.getImpactsAll()
      .subscribe(impact => {
        this.impacts_interrelations = impact;
      });
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
