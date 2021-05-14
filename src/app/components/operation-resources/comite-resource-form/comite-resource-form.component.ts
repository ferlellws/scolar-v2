import { NgZone } from '@angular/core';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Person } from 'src/app/models/person';
import { PhaseByProject } from 'src/app/models/phase-by-project';
import { Project } from 'src/app/models/project';
import { SupportResource } from 'src/app/models/support-resource';
import { OperationSponsorsService } from 'src/app/services/operation-sponsors.service';
import { PhaseByProjectsService } from 'src/app/services/phase-by-projects.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SponsorByPhasesService } from 'src/app/services/sponsor-by-phases.service';
import { SupportResourcesService } from 'src/app/services/support-resources.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  mode: string,
  labelAction: string,
  project: Project,
  resource_id: number,
  people: any,
  type_resource: string
}

@Component({
  selector: 'tecno-comite-resource-form',
  templateUrl: './comite-resource-form.component.html',
  styleUrls: ['./comite-resource-form.component.scss']
})
export class ComiteResourceFormComponent implements OnInit {

  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  showBtnClose: boolean = true;
  pluralOption: string = "";
  singularOption: string = "";
  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;
  persons!: any;
  filterPersons!: Observable<Person[]>;
  personControl = new FormControl();
  cargaProject!: boolean;
  selectPhases: any[] = [];
  disablePhases: boolean = false;
  flagModeGeneral: string = "create";
  generalPhase: any;
  idSupportResource!: number;
  phases: PhaseByProject[] = [];
  supportResource!: SupportResource;
  person!: any;
  currentResource: any;
  disablePerson: boolean = false;

  resoruce_by_phases = [
    {
      id_reg: 5,
      id: 6,
      phase: {
        id: 1,
        title: "Factibilidad" 
      },
      dedication: null,
    },
    {
      id_reg: 6,
      id: 7,
      phase: {
        id: 2,
        title: "Inicio" 
      },
      dedication: 4,
    },
    {
      id_reg: 8,
      id: 9,
      phase: {
        id: 3,
        title: "Planeación" 
      },
      dedication: 4,
    },
    {
      id_reg: 10,
      id: 10,
      phase: {
        id: 4,
        title: "Ejecución" 
      },
      dedication: 4,
    },
    {
      id_reg: null,
      id: 11,
      phase: {
        id: 5,
        title: "Cierre" 
      },
      dedication: 4,
    },
    // {
    //   id_reg: null,
    //   id: null,
    //   phase: {
    //     id: 6,
    //     title: "BAU" 
    //   },
    //   dedication: 40,
    // },
  ]

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private phaseByProjectsService: PhaseByProjectsService,
    private supportResourcesService: SupportResourcesService,
    private operationSponsorsService: OperationSponsorsService,
    private projectsService: ProjectsService,
    private sponsorByPhasesService:SponsorByPhasesService,
    private ngZone: NgZone,
  ) { }

  async ngOnInit(): Promise<void> {
    this.disablePerson = true;
    this.singularOption = this.data.type_resource;

    this.phaseByProjectsService.getPhaseByProjectId(Number(this.data.project.id))
      .subscribe(data => {
        this.phases = data;
        if(this.data.mode != "edit") {
          this.generalPhase = this.phases;
        }
      });

    this.persons = this.data.people;
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

      if(this.data.type_resource == 'Sponsor') {
        this.operationSponsorsService.getOperationSponsorProjectId(Number(this.data.project.id))
          .subscribe(data => {
            this.person = data.filter((f: any) => f.id == this.data.resource_id);
            this.currentResource = this.person[0].person.full_name;
            this.cargaProject = true;
            
            this.generalPhase = this.resoruce_by_phases;
            // Aquí va el endpoint que Ferley me entregue
            // this.sponsorByPhasesService.getSponsorByPhasesByProjectBySponsor(Number(this.data.project.id), this.person.id)
            //   .subscribe(res => {
            //     true;
            //   });

          });
      } else if (this.data.type_resource == 'Líder Funcional') {
        this.currentResource = this.data.project.functional_lead!.full_name;
        this.cargaProject = true;
        this.generalPhase = this.resoruce_by_phases;
      } else if (this.data.type_resource == 'Pmo Asignado') {
        this.currentResource = this.data.project.pmo!.full_name;
        this.cargaProject = true;
        this.generalPhase = this.resoruce_by_phases;
      } else if (this.data.type_resource == 'Pmo de Apoyo') {
        this.currentResource = this.data.project.pmo_assitant!.full_name;
        this.cargaProject = true;
        this.generalPhase = this.resoruce_by_phases;
      }
    }
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
    this.personControl.reset();
    this.filterPersons = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value!.full_name),
      map(name => name ? this._filter(name) : this.persons.slice())
    );
    this.disablePhases = false;
    this.fButtonDisabled = false;
  }

  createRegister() { }

  updateRegister() { }

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
