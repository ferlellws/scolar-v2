import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators, FormControl } from '@angular/forms';
import { VicePresidency } from 'src/app/models/vice-presidency';
import {VicePresidenciesService} from '../../../services/vice-presidencies.service'
import { AreasService } from '../../../services/areas.service'
import { Area } from 'src/app/models/area';
import { Program } from 'src/app/models/program';
import { ProgramsService } from 'src/app/services/programs.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Priority } from 'src/app/models/priority';
import { PrioritiesService } from 'src/app/services/priorities.service';
import { TypificationsService } from 'src/app/services/typifications.service';
import { Typification } from 'src/app/models/typification';
import { Management } from 'src/app/models/management';
import { ManagementsService } from 'src/app/services/managements.service';
import { Stage } from 'src/app/models/stage';
import { StagesService } from 'src/app/services/stages.service';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { State } from 'src/app/models/state';
import { Phase } from 'src/app/models/phase';
import { StatesService } from 'src/app/services/states.service';
import { PhasesService } from 'src/app/services/phases.service';
import { StateByPhasesService } from 'src/app/services/state-by-phases.service';
import { StateByPhase } from 'src/app/models/state-by-phase';
import { MatStepper } from '@angular/material/stepper';
import { StrategicApproachesService } from 'src/app/services/strategic-approaches.service';
import { StrategicApproach } from 'src/app/models/strategic-approach';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BenefitsService } from 'src/app/services/benefits.service';
import { Benefit } from 'src/app/models/benefit';
import { Highlight } from 'src/app/models/highlight';
import { HighlightsService } from 'src/app/services/highlights.service';
import { RisksService } from 'src/app/services/risks.service';
import { Risk } from 'src/app/models/risk';
import { KpisService } from 'src/app/services/kpis.service';
import { Kpi } from 'src/app/models/kpi';
import { Application } from 'src/app/models/application';
import { ApplicationByProject } from 'src/app/models/application-by-project';
import { ApplicationsByProjectService } from 'src/app/services/applications-by-project.service';
import { AreasByProjectService } from 'src/app/services/areas-by-project.service';
import { AreaByProject } from 'src/app/models/area-by-project';
import { Company } from 'src/app/models/company';
import { CompanyByProject } from 'src/app/models/company-by-project';
import { CompaniesByProjectService } from 'src/app/services/companies-by-project.service';
import { TestUsersService } from 'src/app/services/test-users.service';
import { TestUser } from 'src/app/models/test-user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { MainTableProject } from 'src/app/models/main-table-project';
import { MainCreateTablesService } from 'src/app/services/main-create-tables.service';
import { StrategicGuidelinesService } from 'src/app/services/strategic-guidelines.service';
import { StrategicGuidelines } from 'src/app/models/strategic-guidelines';
import { PersonsService } from 'src/app/services/persons.service';
import { Person } from 'src/app/models/person';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss'],
})
export class ProjectsFormComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;
  @Output() emitClose: EventEmitter<string> = new EventEmitter();

  project!: Project;
  filterLeads!: Observable<User[]>;
  leadsControl = new FormControl();
  filterPmos!: Observable<User[]>;
  pmosControl = new FormControl();
  filterPmosAssistant!: Observable<User[]>;
  pmosAssistantControl = new FormControl();
  flagPmoAssistant: boolean = false;

  message: string = "";

  labels:any;

  vicePresidencies: VicePresidency[] = [];
  areas: Area[] = [];
  strategicApproaches: StrategicApproach[] = [];
  programs: Program[] = [];

  leads: User[] = [];
  priorities: Priority[] = [];
  typifications: Typification[] = [];
  managements: Management[] = [];
  pmos: User[] = [];
  pmoAssists: User[] = [];
  stages: Stage[] = [];
  strategicGuidelines: StrategicGuidelines[] = [];

  states: State[] = [];
  phases: Phase[] = [];
  stateByPhases: StateByPhase[] = [];

  general: FormGroup;
  descripcion: FormGroup;
  seguimiento: FormGroup;

  deshabilitarAssist: boolean = true;

  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;

  benefits: any[] = [];
  benefitsObjects: Benefit[] = [];
  highlights: any[] = [];
  highlightsObjects: Highlight[] = [];
  risks: any[] = [];
  risksObjects: Risk[] = [];
  kpis: any[] = [];
  kpisObjects: Kpi[] = [];
  applications: Application[] = [];
  applicationsObjects: ApplicationByProject[] = [];
  areasByProject: any[] = [];
  areasByProjectObjects: AreaByProject[] = [];
  companies: Company[] = [];
  companiesObjects: CompanyByProject[] = [];
  testUsers: Person[] = [];
  testUsersObjects: TestUser[] = [];
  isComponent = false;
  sobreExcecuted: boolean = false;
  balanceStr: string = "0";
  cargaProject!: boolean;

  constructor(
    private _fbG: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _strategicApproachesService: StrategicApproachesService,
    private _vicePresidenciesService: VicePresidenciesService,
    private _areasService: AreasService,
    private _programsService: ProgramsService,
    private _usersService: UserService,
    private _personsService: PersonsService,
    private _prioritiesService: PrioritiesService,
    private _typificationsService: TypificationsService,
    private _managementsService: ManagementsService,
    private _stagesService: StagesService,
    private _statesService: StatesService,
    private _phasesService: PhasesService,
    private _statesByPhasesService: StateByPhasesService,
    private _projectsService: ProjectsService,
    private _benefitsService: BenefitsService,
    private _highlightsService: HighlightsService,
    private _risksService: RisksService,
    private _kpisService: KpisService,
    private _applicationsByProjectsService: ApplicationsByProjectService,
    private _areasByProjectsService: AreasByProjectService,
    private _companiesByProjectsService: CompaniesByProjectService,
    private _testUsersService: TestUsersService,
    private _strategicGuidelinesService: StrategicGuidelinesService,
    public datepipe: DatePipe,
    private snackBar: MatSnackBar,

    private _mainCreateTablesService: MainCreateTablesService
    ) {

      this.isComponent = Object.keys(data).length == 0;
      if(this.isComponent){
        data.mode = "create"
      }

      this.general = this._fbG.group({
        'title': [null, [Validators.required]],
        'vicePresidencies': [null, [Validators.required]],
        'areas': [null, [Validators.required]],
        'strategicApproaches': [null, [Validators.required]],
        'receptionDate': [null, [Validators.required]],
        'programs': [null],
      });

      this.descripcion = this._fbG.group({
        'projectDescription': [null, [Validators.required]],
        'leads': [null],
        'priorities': [null, [Validators.required]],
        'typifications': [null, [Validators.required]],
        'strategicGuidelines': [null],
        'managements': [null, [Validators.required]],
        'pmos': [null],
        'pmoHours': [null, [Validators.max(40), Validators.min(0)]],
        'pmoAssists': [null],
        'stages': [{value: null, disabled: this.deshabilitarAssist}],
        'pmoAssistHours': [{value: null, disabled: this.deshabilitarAssist}, [Validators.max(40), Validators.min(0)]],
        'budgetApproved': [null, [Validators.required]],
        'budgetExecuted': [null, [Validators.required]],
        'balance': [{value: null, disabled: true}, [Validators.required]],
      });

      this.seguimiento = this._fbG.group({
        'startDate': [],
        'dueDate': [],
        'controlDate': [],
        'states': [null, [Validators.required]],
        'phases': [null, [Validators.required]],
        'sprint': [null, [Validators.min(0)]],
        'evaluation': [null],
        'testLog': [null, [Validators.required]],
      });

      this.labels = {
        title: `Nombre del Proyecto`,
        vicePresidencies: `Vicepresidencias`,
        areas: `Areas`,
        strategicApproaches: 'Enfoque estrategico',
        receptionDate: `Fecha de recepci??n`,
        programs: `Programa`,

        priorities: `Prioridad`,
        typifications: `Tipificaci??n`,
        strategicGuidelines: `Lineamiento Estrat??gico (Reporte VALOREM)`,
        projectDescription: `Descripci??n`,
        leads: `Lider Funcional`,
        managements: `Gesti??n`,
        pmos: `PMO asignado`,
        pmoHours: `Horas Semanales PMO`,
        pmoAssists: `PMO  de apoyo asignado`,
        stages: `Etapa de Apoyo`,
        pmoAssistHours: `Horas Semanales PMO de apoyo`,
        budgetApproved: `Presupuesto Aprobado`,
        budgetExecuted: `Presupuesto Ejecutado`,
        balance: `Saldo`,

        startDate: `Fecha de Inicio`,
        dueDate: `Fecha Final Estimada`,
        controlDate: `Fecha Fin seg??n control de cambios`,
        states: `Estado`,
        phases: `Fase`,
        sprint: `Sprint`,
        evaluation: `??Como se evalu?? la selecci??n de proveedores si aplica?`,
        testLog: `Bitacora de Pruebas`,
      }

    }

  async ngOnInit() {
    if(this.data.mode == 'create'){
      this._openLeads(true);
      this._openPMOS(true);
      this._openPMOAssists(true);
    }

    if(this.data.mode == 'edit'){
      this.cargaProject = false;
      await this._projectsService.getProjectsId(this.data.id)
      .subscribe(project => {
        this.project = project;
        this.project.reception_date = this.project.reception_date.substr(0, 10);
        
        this.resetformToProject(this.general);
        this.resetformToProject(this.descripcion);
        this.resetformToProject(this.seguimiento);
        this.updateChildComponents(project.id);
        this.cargaProject = true;
      });
      await this._vicePresidenciesService.getVicePresidenciesSelect()
      .subscribe(data => this.vicePresidencies = data);
      await this._areasService.getAreasSelect()
        .subscribe((areas: Area[]) => this.areas = areas
          .filter(area => area.vice_presidency!.id == this.project.area?.vice_presidency!.id));
      await this._strategicApproachesService.getStrategicApproachesSelect()
      .subscribe((strategicApproaches: StrategicApproach[]) => this.strategicApproaches = strategicApproaches);
      await this._programsService.getProgramsSelect()
      .subscribe((programs: Program[]) => this.programs = programs);
      this._openLeads(true);
      // await this._personsService.getFunctionalLeadersSelect()
      // .subscribe((leads: User[]) => {
      //   this.leads = leads;
      //   this._openLeads(true);
      // });
      await this._prioritiesService.getPrioritiesSelect()
      .subscribe((priorities: Priority[]) => this.priorities = priorities);
      await  this._typificationsService.getTypificationsSelect()
      .subscribe((typifications: Typification[]) => this.typifications = typifications);
      await  this._managementsService.getManagementsSelect()
      .subscribe((managements: Management[]) => this.managements = managements);
      this._openPMOS(true);
      // await this._personsService.getManagers()
      // .subscribe((pmos: User[]) => {
      //   this.pmos = pmos;
      //   this._openPMOS(true);
      // });
      this._openPMOAssists(true);
      // await this._personsService.getManagers()
      //   .subscribe((pmoAssists: User[]) => {
      //     this.pmoAssists = pmoAssists;
      //     this._openPMOAssists(true);
      //   });
      await this._stagesService.getStagesSelect()
        .subscribe((stages: Stage[]) => this.stages = stages);
      await this._statesService.getStatesSelect()
      .subscribe((states: State[]) => this.states = states);
      await this._strategicGuidelinesService.getStrategicGuidelinesSelect()
      .subscribe((strategicGuidelines: StrategicGuidelines[]) => this.strategicGuidelines = strategicGuidelines);

      //fases
      await this._phasesService.getPhasesSelect()
      .subscribe((phases: Phase[]) =>
      {
        this._statesByPhasesService.getStateByPhasesSelect()
        .subscribe((stateByPhases: StateByPhase[]) =>
        {
          this.stateByPhases = [];
          this.phases = [];
          this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state!.id == this.project.states_by_phase?.state!.id);
          for (let index = 0; index <  this.stateByPhases.length; index++) {
            this.phases.push(phases.filter(phase => phase.id == this.stateByPhases[index].phase!.id)[0]);
          }
          if( this.phases.filter(phase => phase.id == this.project.states_by_phase?.phase!.id).length < 1){
            this.seguimiento.get('phases')!.setValue(0);
          }
        })
      });
      //fin fases


    }
    this.validateAssist ();
    this.validateFormGroup(this.general)
  }

  displayFn(person: Person): string {
    return person && person.full_name ? person.full_name : '';
  }

  private _filterLeads(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.leads.filter(leads => leads.full_name!.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterPmos(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.pmos.filter(pmos => pmos.full_name!.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterPmosAssistant(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.pmoAssists.filter(pmoAssists => pmoAssists.full_name!.toLowerCase().indexOf(filterValue) === 0);
  }

  resetformToProject(formGroup: FormGroup){
    if(formGroup == this.general){
      this.general.get('title')?.setValue(this.project.title);
      this.general.get('vicePresidencies')?.setValue(this.project.area!.vice_presidency!.id);
      this.general.get('areas')?.setValue(this.project.area!.id);
      this.general.get('strategicApproaches')?.setValue(this.project.strategic_approach!.id);
      this.general.get('receptionDate')?.setValue(new Date(`${this.project.reception_date}:00:00`));
      this.general.get('programs')?.setValue(this.project.program == null ? null: this.project.program!.id);
    }
    if(formGroup == this.descripcion){
      this.descripcion.get('projectDescription')?.setValue(this.project.description);
      if(this.project.functional_lead == null) {
        this.descripcion.get('leads')?.setValue(null);
      } else {
        this.descripcion.get('leads')?.setValue(this.project.functional_lead!.id);
      }
      this.descripcion.get('priorities')?.setValue(this.project.priority!.id);
      this.descripcion.get('typifications')?.setValue(this.project.typification!.id);
      this.descripcion.get('strategicGuidelines')?.setValue(this.project.strategic_guideline == null ? null : this.project.strategic_guideline.id);
      this.descripcion.get('managements')?.setValue(this.project.management!.id);
      if(this.project.pmo == null) {
        this.descripcion.get('pmos')?.setValue(null);
      } else {
        this.descripcion.get('pmos')?.setValue(this.project.pmo!.id);
      }
      this.descripcion.get('pmoHours')?.setValue(this.project.pmo_hours + (this.project.pmo_minutes / 60) );
      this.descripcion.get('pmoAssists')?.setValue(this.project.pmo_assitant == null ? null: this.project.pmo_assitant!.id);
      this.descripcion.get('stages')?.setValue(this.project.pmo_assitant_stage == null ? null: this.project.pmo_assitant_stage!.id);
      this.descripcion.get('pmoAssistHours')?.setValue(this.project.pmo_assistant_hours! + (this.project.pmo_assistant_minutes! / 60));
      this.descripcion.get('budgetApproved')?.setValue(this.project.budget_approved);
      this.descripcion.get('budgetExecuted')?.setValue(this.project.budget_executed);
      this.descripcion.get('balance')?.setValue(this.getBalance());
      this.validateAssist ();
    }

    if(formGroup == this.seguimiento){
      this.seguimiento.get('startDate')?.setValue(this.project.start_date == null ? null : new Date(`${this.project.start_date!.substr(0, 10)}:00:00`));
      this.seguimiento.get('dueDate')?.setValue(this.project.due_date == null ? null : new Date(`${this.project.due_date!.substr(0, 10)}:00:00`));
      this.seguimiento.get('controlDate')?.setValue(this.project.control_date == null? null : new Date(`${this.project.control_date!.substr(0, 10)}:00:00`));
      this.seguimiento.get('states')?.setValue(this.project.states_by_phase!.state!.id);
      this.seguimiento.get('phases')?.setValue(this.project.states_by_phase!.phase!.id);
      this.seguimiento.get('sprint')?.setValue(this.project.sprint);
      this.seguimiento.get('evaluation')?.setValue(this.project.evaluation);
      this.seguimiento.get('testLog')?.setValue(this.project.test_log);
    }
  }

  updateChildComponents(id: number){
    this._benefitsService.getBenefitsByProjectSpecificData(this.data.id)
      .subscribe((data: Benefit[]) =>
      {
        this.benefitsObjects = data;
        for (let index = 0; index < this.benefitsObjects.length; index++) {
          let reg = {
            id: this.benefitsObjects[index].id,
            description: this.benefitsObjects[index].description,
          }
          this.benefits.push(reg);
        }
      }
    );

    this._highlightsService.getHighlightsByProjectSpecificData(this.data.id)
      .subscribe((data: Highlight[]) =>
      {
        this.highlightsObjects = data;
        for (let index = 0; index < this.highlightsObjects.length; index++) {
          let reg = {
            id: this.highlightsObjects[index].id,
            description: this.highlightsObjects[index].description,
          }
          this.highlights.push(reg);
        }
      }
    );

    this._risksService.getRisksByProjectSpecificData(this.data.id)
      .subscribe((data: Risk[]) =>
      {
        this.risksObjects = data;
        for (let index = 0; index < this.risksObjects.length; index++) {
          let reg = {
            id: this.risksObjects[index].id,
            description: this.risksObjects[index].description,
          }
          this.risks.push(reg);
        }
      }
    );

    this._kpisService.getKpisByProjectSpecificData(this.data.id)
      .subscribe((data: Kpi[]) =>
      {
        this.kpisObjects = data;
        for (let index = 0; index < this.kpisObjects.length; index++) {
          let reg = {
            id: this.kpisObjects[index].id,
            description: this.kpisObjects[index].description,
          }
          this.kpis.push(reg);
        }
      }
    );

    this._applicationsByProjectsService.getApplicationByProjectsFilterProjectSpecificData(this.data.id)
      .subscribe((data: ApplicationByProject[]) =>
      {
        this.applicationsObjects = data;
        this.applications = this.applicationsObjects.map(app => app.application! );
      }
    );

    this._areasByProjectsService.getAreaByProjectsFilterProjectSpecificData(this.data.id)
      .subscribe((data: AreaByProject[]) =>
      {
        this.areasByProjectObjects = data;
        this.areasByProject = this.areasByProjectObjects.map(area => area.area! );
      }
    );

    this._companiesByProjectsService.getCompanyByProjectsFilterProjectSpecificData(this.data.id)
      .subscribe((data: CompanyByProject[]) =>
      {
        this.companiesObjects = data;
        this.companies = this.companiesObjects.map(company => company.company! );
      }
    );

    this._testUsersService.getTestUserByProjectIdSpecificData(this.data.id)
      .subscribe((data: any[]) =>
      {
        this.testUsersObjects = data;
        this.testUsers = this.testUsersObjects.map(user => user.person! );
      }
    );

  }

  onBenefits(benefits: any[]): any{
    if (this.data.mode == 'create'){
      this.benefits = benefits;
    }else if(this.data.mode == 'edit'){
      //agregaci??n
      if(benefits.length > this.benefitsObjects.length){
        this.benefits = benefits;
        var benefit: Benefit = {
          project_id: this.project.id,
          description: this.benefits[benefits.length - 1].description,
          user_creates_id: JSON.parse(localStorage.user).id,
        }
        this._benefitsService.addBenefit(benefit).
        subscribe(data =>{
          this.benefitsObjects.push(data)
          this.benefits[this.benefits.length-1].id = data.id;
          this.openSnackBar(true, "Beneficio creado satisfactoriamente", "");
        }, (err) => {
          this.benefits.pop();
          this.openSnackBar(false, "La descripci??n ya existe", "");
        }
        );
      }
      //eliminado
      else if(benefits.length < this.benefitsObjects.length){
        for (let index = 0; index < this.benefitsObjects.length; index++) {
          let del = false;
          for (let index2 = 0; index2 < this.benefits.length; index2++) {
            if(this.benefits[index2].id == this.benefitsObjects[index].id) {
              del = true;
              break;
            }
          }
          if(del == false) {
            var benefit: Benefit = this.benefitsObjects[index];
            if(benefit.id == undefined){
              benefit.id = -1;
              this.openSnackBar(false, "Error eliminando", "");
              return false;
            }
            this._benefitsService.deleteBenefit(benefit!.id)
              .subscribe(data => {
                this.openSnackBar(true, "Beneficio eliminando", "");
                this.benefitsObjects.splice(index, 1);
                return true;
              });
          }
        }
      }
    }
  }

  onHighlights(highlights: string[]): any{
    if (this.data.mode == 'create'){
      this.highlights = highlights;
      true;//environment.consoleMessage(this.highlights, "hitos padre")
    }else if(this.data.mode == 'edit'){
      //agregaci??n
      if(highlights.length > this.highlightsObjects.length){
        this.highlights = highlights;
        var highlight: Highlight = {
          project_id: this.project.id,
          description: this.highlights[highlights.length - 1].description,
          user_creates_id: JSON.parse(localStorage.user).id,
        }
        this._highlightsService.addHighlight(highlight).
        subscribe(data =>
          {
            this.highlightsObjects.push(data)
            this.highlights[this.highlights.length-1].id = data.id;
            this.openSnackBar(true, "Hito creado satisfactoriamente", "");
          }, (err) => {
            this.highlights.pop();
            this.openSnackBar(false, "La descripci??n ya existe", "");
          }
        );
      }
      //eliminado
      else if(highlights.length < this.highlightsObjects.length){
        for (let index = 0; index < this.highlightsObjects.length; index++) {
          let del = false;
          for (let index2 = 0; index2 < this.highlights.length; index2++) {
            if(this.highlights[index2].id == this.highlightsObjects[index].id) {
              del = true;
              break;
            }
          }
          if(del == false) {
            var highlight: Highlight = this.highlightsObjects[index];
            if(highlight.id == undefined){
              highlight.id = -1;
              this.openSnackBar(false, "Error eliminando", "");
              return false;
            }
            this._highlightsService.deleteHighlight(highlight!.id)
              .subscribe(data => {
                this.openSnackBar(true, "Hito eliminando", "");
                this.highlightsObjects.splice(index, 1);
                return true;
              });
          }
        }
      }
    }
  }

  onRisks(risks: string[]): any{
    if (this.data.mode == 'create'){
      this.risks = risks;
      true;//environment.consoleMessage(this.risks, "riesgos padre")
    }else if(this.data.mode == 'edit'){
      //agregaci??n
      if(risks.length > this.risksObjects.length){
        this.risks = risks;
        var risk: Risk = {
          project_id: this.project.id,
          description: this.risks[risks.length - 1].description,
          user_creates_id: JSON.parse(localStorage.user).id,
        }
        this._risksService.addRisk(risk).
        subscribe(data =>
          {
            this.risksObjects.push(data)
            this.risks[this.risks.length-1].id = data.id;
            this.openSnackBar(true, "Riesgo creado satisfactoriamente", "");
          }, (err) => {
            this.risks.pop();
            this.openSnackBar(false, "La descripci??n ya existe", "");
          }
        );
      }
      //eliminado
      else if(risks.length < this.risksObjects.length){
        for (let index = 0; index < this.risksObjects.length; index++) {
          let del = false;
          for (let index2 = 0; index2 < this.risks.length; index2++) {
            if(this.risks[index2].id == this.risksObjects[index].id) {
              del = true;
              break;
            }
          }
          if(del == false) {
            var risk: Risk = this.risksObjects[index];
            if(risk.id == undefined){
              risk.id = -1;
              this.openSnackBar(false, "Error eliminando", "");
              return false;
            }
            this._risksService.deleteRisk(risk!.id)
              .subscribe(data => {
                this.openSnackBar(true, "Riesgo eliminando", "");
                this.risksObjects.splice(index, 1);
                return true;
              });
          }
        }
      }
    }
  }

  onKpis(kpis: string[]): any{
    if (this.data.mode == 'create'){
      this.kpis = kpis;
    }else if(this.data.mode == 'edit'){
      //agregaci??n
      if(kpis.length > this.kpisObjects.length){
        this.kpis = kpis;
        var kpi: Kpi = {
          project_id: this.project.id,
          description: this.kpis[kpis.length - 1].description,
          user_creates_id: JSON.parse(localStorage.user).id,
        }
        this._kpisService.addKpi(kpi).
        subscribe(data =>
          {
            this.kpisObjects.push(data)
            this.kpis[this.kpis.length-1].id = data.id;
            this.openSnackBar(true, "KPI creado satisfactoriamente", "");
          }, (err) => {
            this.kpis.pop();
            this.openSnackBar(false, "La descripci??n ya existe", "");
          }
        );
      }
      //eliminacion
      else if(kpis.length < this.kpisObjects.length){
        for (let index = 0; index < this.kpisObjects.length; index++) {
          let del = false;
          for (let index2 = 0; index2 < this.kpis.length; index2++) {
            if(this.kpis[index2].id == this.kpisObjects[index].id) {
              del = true;
              break;
            }
          }
          if(del == false) {
            var kpi: Kpi = this.kpisObjects[index];
            if(kpi.id == undefined){
              kpi.id = -1;
              this.openSnackBar(false, "Error eliminando", "");
              return false;
            }
            this._kpisService.deleteKpi(kpi!.id)
              .subscribe(data => {
                this.openSnackBar(true, "Kpi eliminando", "");
                this.kpisObjects.splice(index, 1);
                return true;
              });
          }
        }
      }
    }
  }

  async onApplications(applications: Application[]): Promise<any>{
    if (this.data.mode == 'create'){
      this.applications = applications;
      true;//environment.consoleMessage(this.applications, "applications padre");
    }else if(this.data.mode == 'edit'){
      true;//environment.consoleMessage(this.applications, "this.applications antes");
        true;//environment.consoleMessage(this.applicationsObjects, "this.applicationsObjects antes");
      if(applications.length > this.applicationsObjects.length){
        true;//environment.consoleMessage(this.applications, "this.applications despues");
        true;//environment.consoleMessage(this.applicationsObjects, "this.applicationsObjects despues");
        this.applications = applications;
        var applicationsIDs: number[] = applications.map(app => app.id!);
        var applicationsObjectsIDs: number[] = this.applicationsObjects.map(app => app.application!.id!);
        for (let index = 0; index < applicationsIDs.length; index++) {
          if(!applicationsObjectsIDs.includes(applicationsIDs[index])){
            var application: ApplicationByProject = {
              project_id: this.project.id,
              application_id: applicationsIDs[index],
              user_creates_id: JSON.parse(localStorage.user).id,
            }
            await this._applicationsByProjectsService.addApplicationByProject(application).
            subscribe(data =>
              {
                true;//environment.consoleMessage(data, "objeto applicationsObjects");
                this.applicationsObjects.push(data)
                this.openSnackBar(true, "Aplicaci??n agregada satisfactoriamente", "");
                true;//environment.consoleMessage(this.applicationsObjects, "applicationsObjects");
              }
            );
            return true;
          }

        }
      }
      //eliminacion
      else if(applications.length < this.applicationsObjects.length){
        var applicationsIDs: number[] = applications.map(app => app.id!);
        var applicationsObjectsIDs: number[] = this.applicationsObjects.map(app => app.application!.id!);
        for (let index = 0; index < applicationsObjectsIDs.length; index++) {
          if(!applicationsIDs.includes(applicationsObjectsIDs[index])) {
            await this._applicationsByProjectsService.deleteApplicationByProject(this.applicationsObjects[index].id!)//posible error por orden
              .subscribe(data =>
                {
                  true;//environment.consoleMessage(data, "data eliminacion")
                  this.openSnackBar(true, "Aplicaci??n eliminanda del Proyecto", "");
                  this.applicationsObjects.splice(index, 1);
                  return true;
                }
              );
          }
        }
      }
    }
  }

  async onAreasByProject(areasByProject: any[]):Promise<any>{

    if (this.data.mode == 'create'){
      this.areasByProject = areasByProject;
      true;//environment.consoleMessage(this.areasByProject, "areasByProject padre")
    }else if(this.data.mode == 'edit'){
      true;//environment.consoleMessage(this.areasByProject, "this.areasByProject antes");
      true;//environment.consoleMessage(this.areasByProjectObjects, "this.areasByProjectObjects antes");
      if(areasByProject.length > this.areasByProjectObjects.length){
        true;//environment.consoleMessage(this.areasByProject, "this.applications despues");
        true;//environment.consoleMessage(this.areasByProjectObjects, "this.applicationsObjects despues");
        this.areasByProject = areasByProject;
        var areasIDs: number[] = areasByProject.map(area => area.id!);
        var areasObjectsIDs: number[] = this.areasByProjectObjects.map(area => area.area!.id!);
        for (let index = 0; index < areasByProject.length; index++) {
          if(!areasObjectsIDs.includes(areasIDs[index])){
            var area: AreaByProject = {
              project_id: this.project.id,
              area_id: areasIDs[index],
              user_creates_id: JSON.parse(localStorage.user).id,
            }
            await this._areasByProjectsService.addAreaByProject(area).
            subscribe(data =>
              {
                true;//environment.consoleMessage(data, "objeto areasByProject");
                this.areasByProjectObjects.push(data)
                this.openSnackBar(true, "Area agregada satisfactoriamente", "");
                true;//environment.consoleMessage(this.areasByProjectObjects, "areasByProjectObjects");
              }
            );
            return true;
          }

        }

      }
      //eliminacion

      else if(areasByProject.length < this.areasByProjectObjects.length){
        this.areasByProject = areasByProject;
        true;//environment.consoleMessage(this.areasByProject, "this.areasByProject antes");
        true;//environment.consoleMessage(this.areasByProjectObjects, "this.areasByProjectObjects antes");
        var areasIDs: number[] = areasByProject.map(area => area.id!);
        var areasObjectsIDs: number[] = this.areasByProjectObjects.map(area => area.area!.id!);
        true;//environment.consoleMessage(areasIDs, "areasIDs antes");
        true;//environment.consoleMessage(areasObjectsIDs, "areasObjectsIDs antes");
        for (let index = 0; index < areasObjectsIDs.length; index++) {
          if(!areasIDs.includes(areasObjectsIDs[index])) {
            await this._areasByProjectsService.deleteAreaByProject(this.areasByProjectObjects[index].id!)//posible error por orden
              .subscribe(data =>
                {
                  true;//environment.consoleMessage(data, "data eliminacion")
                  this.openSnackBar(true, "Area eliminanda del Proyecto", "");
                  this.areasByProjectObjects.splice(index, 1);
                  return true;
                }
              );
          }
        }
      }
    }


  }

  async onCompaniesByProject(companiesByProject: Company[]): Promise<any>{

    if (this.data.mode == 'create'){
      this.companies = companiesByProject;
      true;//environment.consoleMessage(this.companies, "companiesByProject padre")
    }else if(this.data.mode == 'edit'){
        true;//environment.consoleMessage(this.companies, "this.companies antes");
        true;//environment.consoleMessage(this.companiesObjects, "this.companiesObjects antes");
      if(companiesByProject.length > this.companiesObjects.length){
        true;//environment.consoleMessage(this.companies, "this.companies despues");
        true;//environment.consoleMessage(this.companiesObjects, "this.companiesObjects despues");
        this.companies = companiesByProject;
        var companiesIDs: number[] = companiesByProject.map(company => company.id!);
        var companiesObjectsIDs: number[] = this.companiesObjects.map(company => company.company!.id!);
        for (let index = 0; index < companiesIDs.length; index++) {
          if(!companiesObjectsIDs.includes(companiesIDs[index])){
            var comapny: CompanyByProject = {
              project_id: this.project.id,
              company_id: companiesIDs[index],
              user_creates_id: JSON.parse(localStorage.user).id,
            }
            await this._companiesByProjectsService.addCompanyByProject(comapny).
            subscribe(data =>
              {
                true;//environment.consoleMessage(data, "objeto companiesObjects");
                this.companiesObjects.push(data)
                this.openSnackBar(true, "Proveedor agregado satisfactoriamente", "");
                true;//environment.consoleMessage(this.companiesObjects, "companiesObjects");
              }
            );
            return true;
          }

        }
      }
      //eliminacion
      else if(companiesByProject.length < this.companiesObjects.length){
        var companiesIDs: number[] = companiesByProject.map(company => company.id!);
        var companiesObjectsIDs: number[] = this.companiesObjects.map(company => company.company!.id!);
        for (let index = 0; index < companiesObjectsIDs.length; index++) {
          if(!companiesIDs.includes(companiesObjectsIDs[index])) {
            await this._companiesByProjectsService.deleteCompanyByProject(this.companiesObjects[index].id!)//posible error por orden
              .subscribe(data =>
                {
                  true;//environment.consoleMessage(data, "data eliminacion")
                  this.openSnackBar(true, "Proveedor eliminando del Proyecto", "");
                  this.companiesObjects.splice(index, 1);
                  return true;
                }
              );
          }
        }
      }
    }


  }

  async onTestUsers(testUsers: Person[]): Promise<any>{

    if (this.data.mode == 'create'){
      this.testUsers = testUsers;
    }else if(this.data.mode == 'edit'){
      if(testUsers.length > this.testUsersObjects.length){
        this.testUsers = testUsers;
        var testUsersIDs: number[] = testUsers.map(user => user.id!);
        var testUsersObjectsIDs: number[] = this.testUsersObjects.map(user => user.person!.id!);
        for (let index = 0; index < testUsersIDs.length; index++) {
          if(!testUsersObjectsIDs.includes(testUsersIDs[index])){
            var user: any = { //borrar
              project_id: this.project.id,
              person_id: testUsersIDs[index],
              user_creates_id: JSON.parse(localStorage.user).id,
            }
            await this._testUsersService.addTestUser(user).
            subscribe(data =>
              {
                this.testUsersObjects.push(data)
                this.openSnackBar(true, "Recurso de pruebas agregado satisfactoriamente", "");
              }
            );
            return true;
          }

        }
      }
      //eliminacion
      else if(testUsers.length < this.testUsersObjects.length){
        var testUsersIDs: number[] = testUsers.map(user => user.id!);
        var testUsersObjectsIDs: number[] = this.testUsersObjects.map(user => user.person!.id!);
        for (let index = 0; index < testUsersObjectsIDs.length; index++) {
          if(!testUsersIDs.includes(testUsersObjectsIDs[index])) {
            await this._testUsersService.deleteTestUser(this.testUsersObjects[index].id!)//posible error por orden
              .subscribe(data =>
                {
                  this.openSnackBar(true, "Recurso de pruebas eliminando del Proyecto", "");
                  this.testUsersObjects.splice(index, 1);
                  return true;
                }
              );
          }
        }
      }
    }

  }


  validateAssist () {
    var valor = this.pmosAssistantControl.value;
    if( (valor != "" && valor != null && valor != 0) || this.flagPmoAssistant != true){
      this.deshabilitarAssist = false;
      this.descripcion.get('stages')!.enable();
      this.descripcion.get('pmoAssistHours')!.enable();
    } else {
      this.deshabilitarAssist = true;
      this.descripcion.get('stages')!.disable();
      this.descripcion.get('stages')!.setValue(null);
      this.descripcion.get('pmoAssistHours')!.disable();
      this.descripcion.get('pmoAssistHours')!.setValue(null);
    }
    return this.deshabilitarAssist
  }


  changeBudget(){
    this.descripcion.get("balance")!.
    setValue(
      this.getBalance()
    );

  }

  _openVicePresidencies(ev: boolean) {
    if (ev) {
      this._vicePresidenciesService.getVicePresidenciesSelect()
        .subscribe(data => this.vicePresidencies = data);
    }
  }

  _openAreas(ev: boolean) {
    if (ev) {
      var vice: number = this.general.get('vicePresidencies')!.value;
      this._areasService.getAreasSelect()
        .subscribe((areas: Area[]) => this.areas = areas.filter(area => area.vice_presidency!.id == vice));
    }
  }

  _openStrategicApproaches(ev: boolean) {
    if (ev) {
      this._strategicApproachesService.getStrategicApproachesSelect()
        .subscribe((strategicApproaches: StrategicApproach[]) => this.strategicApproaches = strategicApproaches);
    }
  }

  _openPrograms(ev: boolean) {
    if (ev) {
      this._programsService.getProgramsSelect()
        .subscribe((programs: Program[]) => this.programs = programs);
    }
  }

  _openLeads(ev: boolean) {
    if (ev) {
      this._usersService.getFunctionalLeadersSelect()
        .subscribe((leads: User[]) => {
          this.leads = leads
          this.filterLeads = this.leadsControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value!.full_name),
            map(name => name ? this._filterLeads(name) : this.leads.slice())
          );
        });
    }
  }

  _openPriorities(ev: boolean) {
    if (ev) {
      this._prioritiesService.getPrioritiesSelect()
        .subscribe((priorities: Priority[]) => this.priorities = priorities);
    }
  }

  _openTypifications(ev: boolean) {
    if (ev) {
      this._typificationsService.getTypificationsSelect()
        .subscribe((typifications: Typification[]) => this.typifications = typifications);
    }
  }

  _openStrategicGuidelines(ev: boolean) {
    if (ev) {
      this._strategicGuidelinesService.getStrategicGuidelinesSelect()
        .subscribe((strategicGuidelines: StrategicGuidelines[]) => this.strategicGuidelines = strategicGuidelines);
    }
  }

  _openManagements(ev: boolean) {
    if (ev) {
      this._managementsService.getManagementsSelect()
        .subscribe((managements: Management[]) => this.managements = managements);
    }
  }

  _openPMOS(ev: boolean) {
    if (ev) {
      this._personsService.getManagersSelect()
        .subscribe((pmos: User[]) => {
          this.pmos = pmos;
          this.filterPmos = this.pmosControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value!.full_name),
            map(name => name ? this._filterPmos(name) : this.pmos.slice())
          );
        });
    }
  }

  _openPMOAssists2() {
    this.flagPmoAssistant = true;
  }

  _openPMOAssists(ev: boolean) {
    if (ev) {
      this._personsService.getManagersSelect()
        .subscribe((pmoAssists: User[]) => {
          this.pmoAssists = pmoAssists;
          this.filterPmosAssistant = this.pmosAssistantControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value!.full_name),
            map(name => name ? this._filterPmos(name) : this.pmoAssists.slice())
          );
          this.validateAssist();
        });
    } else {
      this.validateAssist();
    }
  }

  _openStages(ev: boolean) {
    if (ev) {
      this._stagesService.getStagesSelect()
        .subscribe((stages: Stage[]) => this.stages = stages);
    }
  }

  _openStates(ev: boolean){
    if (ev) {
      this._statesService.getStatesSelect()
        .subscribe((states: State[]) => this.states = states);
    }else{
      this._phasesService.getPhasesSelect()
        .subscribe((phases: Phase[]) =>
        {
          this._statesByPhasesService.getStateByPhasesSelect()
          .subscribe((stateByPhases: StateByPhase[]) =>
          {
            this.stateByPhases = [];
            this.phases = [];
            this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state!.id == this.seguimiento.get('states')!.value);
            for (let index = 0; index <  this.stateByPhases.length; index++) {
              this.phases.push(phases.filter(phase => phase.id == this.stateByPhases[index].phase!.id)[0]);
            }
            if( this.phases.filter(phase => phase.id == this.seguimiento.get('phases')!.value).length < 1){
              this.seguimiento.get('phases')!.setValue(0);
            }
          })
        });
    }
  }

  _openPhases(ev: boolean){
    if (ev) {
      this._phasesService.getPhasesSelect()
        .subscribe((phases: Phase[]) =>
        {
          this._statesByPhasesService.getStateByPhasesSelect()
          .subscribe((stateByPhases: StateByPhase[]) =>
          {
            true;//environment.consoleMessage(stateByPhases, "stte >>>>>>>>>>>>>>>>")
            this.stateByPhases = [];
            this.phases = [];
            this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state!.id == this.seguimiento.get('states')!.value);
            for (let index = 0; index <  this.stateByPhases.length; index++) {
              this.phases.push(phases.filter(phase => phase.id == this.stateByPhases[index].phase!.id)[0]);
            }
          })
        });
    }
  }


  nextSpecific(stepper: MatStepper, formGroup: FormGroup){
    var message = this.validateFormGroup(formGroup);

    if (message != ""){
      this.message = message;
    } else {
      this.message = "";
      stepper.next();
    }
  }

  async edit(){
    var valido = true;
    var message = this.validateFormGroup(this.general);
    if (message != ""){
      valido = false;
    }

    message = this.validateFormGroup(this.descripcion);
    if (message != ""){
      valido = false;
    }

    message = this.validateFormGroup(this.seguimiento);
    if (message != ""){
      valido = false;
    }

    if (message != ""){
      this.message = message;
    } else {
      true;//environment.consoleMessage(valido, "SIN ERROR: ");
      this.message = "";
      if (valido){
        this.fButtonDisabled = true;

        var editProject: any = {}

        this.project.title != this.general.get('title')?.value ? editProject.title = this.general.get('title')!.value : true ;
        this.project.area!.id != this.general.get('areas')?.value ? editProject.area_id = this.general.get('areas')!.value : true ;
        this.project.strategic_approach!.id != this.general.get('strategicApproaches')?.value ? editProject.strategic_approach_id = this.general.get('strategicApproaches')!.value : true ;
        this.project.reception_date != this.parseDate(this.general.get('receptionDate')?.value) ? editProject.reception_date = this.parseDate(this.general.get('receptionDate')!.value) : true ;
        (this.project.program == null ? null: this.project.program!.id) != this.general.get('programs')?.value ? editProject.program_id = this.general.get('programs')?.value : true ;


        this.project.description != this.descripcion.get('projectDescription')?.value ? editProject.description = this.descripcion.get('projectDescription')!.value : true ;
        
        //this.project.functional_lead!.id != this.descripcion.get('leads')?.value ? editProject.functional_lead_id = this.descripcion.get('leads')!.value : true ;
        this.leadsControl.value != null ? editProject.functional_lead_id = this.leadsControl.value.id : true;

        this.project.priority!.id != this.descripcion.get('priorities')?.value ? editProject.priority_id = this.descripcion.get('priorities')!.value : true ;
        this.project.typification!.id != this.descripcion.get('typifications')?.value ? editProject.typification_id = this.descripcion.get('typifications')!.value : true ;
        if (this.project.strategic_guideline != null){
          this.project.strategic_guideline!.id != this.descripcion.get('strategicGuidelines')?.value ? editProject.strategic_guideline_id = this.descripcion.get('strategicGuidelines')!.value : true ;
        }else{
          null != this.descripcion.get('strategicGuidelines')?.value ? editProject.strategic_guideline_id = this.descripcion.get('strategicGuidelines')!.value : true ;
        }
        this.project.management!.id != this.descripcion.get('managements')?.value ? editProject.management_id = this.descripcion.get('managements')!.value : true ;
        this.pmosControl.value != null ? editProject.pmo_id = this.pmosControl.value.id : true;
        // if(this.project.pmo == null) {
        //   editProject.pmo_id = this.descripcion.get('pmos')!.value;
        // } else {
        //   this.project.pmo!.id != this.descripcion.get('pmos')?.value ? editProject.pmo_id = this.descripcion.get('pmos')!.value : true ;
        // }
        this.project.pmo_hours != Math.trunc(this.descripcion.get('pmoHours')?.value) ? editProject.pmo_hours = Math.trunc(this.descripcion.get('pmoHours')!.value) : true ;
        this.project.pmo_minutes != ((this.descripcion.get('pmoHours')!.value! - Math.trunc(this.descripcion.get('pmoHours')!.value)) *60)  ? editProject.pmo_minutes = ((this.descripcion.get('pmoHours')!.value! - Math.trunc(this.descripcion.get('pmoHours')!.value)) *60) : true ;
        //(this.project.pmo_assitant == null ? null: this.project.pmo_assitant.id) != this.descripcion.get('pmoAssists')?.value ? editProject.pmo_assitant_id = (this.descripcion.get('pmoAssists')?.value == undefined ? null: this.descripcion.get('pmoAssists')?.value) : true ;
        this.pmosAssistantControl.value != null ? editProject.pmo_assitant_id = this.pmosAssistantControl.value.id : true;
        (this.project.pmo_assitant_stage == null ? null: this.project.pmo_assitant_stage!.id) != this.descripcion.get('stages')?.value ? editProject.pmo_assitant_stage_id = this.descripcion.get('stages')?.value : true ;
        if (this.descripcion.get('pmoAssistHours')?.value == null){
          this.project.pmo_assistant_hours != this.descripcion.get('pmoAssistHours')?.value ? editProject.pmo_assistant_hours = this.descripcion.get('pmoAssistHours')!.value : true ;
        }else{
          if (this.project.pmo_assistant_hours == null){
            this.project.pmo_assistant_hours != this.descripcion.get('pmoAssistHours')?.value ? editProject.pmo_assistant_hours = Math.trunc(this.descripcion.get('pmoAssistHours')!.value) : true ;
          }else{
            this.project.pmo_assistant_hours != Math.trunc(this.descripcion.get('pmoAssistHours')?.value) ? editProject.pmo_assistant_hours = Math.trunc(this.descripcion.get('pmoAssistHours')!.value) : true ;
          }
        }
        if((this.descripcion.get('pmoAssistHours')!.value == null)){
          this.project.pmo_assistant_minutes != null ? editProject.pmo_assistant_minutes = null: true;
        }else{
          this.project.pmo_assistant_minutes != ((this.descripcion.get('pmoAssistHours')!.value! - Math.trunc(this.descripcion.get('pmoAssistHours')!.value)) *60)  ? editProject.pmo_assistant_minutes = ((this.descripcion.get('pmoAssistHours')!.value! - Math.trunc(this.descripcion.get('pmoAssistHours')!.value)) *60) : true ;
        }
        this.project.budget_approved != this.descripcion.get('budgetApproved')?.value ? editProject.budget_approved = this.descripcion.get('budgetApproved')!.value : true ;
        this.project.budget_executed != this.descripcion.get('budgetExecuted')?.value ? editProject.budget_executed = this.descripcion.get('budgetExecuted')!.value : true ;

        this.project.start_date != (this.seguimiento.get('startDate')?.value == null ? null : this.parseDate(this.seguimiento.get('startDate')?.value)) ? editProject.start_date =
          (this.parseDate(this.seguimiento.get('startDate')!.value) == ''? null: this.parseDate(this.seguimiento.get('startDate')!.value)) : true ;
        this.project.due_date != (this.seguimiento.get('dueDate')?.value == null ? null : this.parseDate(this.seguimiento.get('dueDate')?.value)) ? editProject.due_date =
          (this.parseDate(this.seguimiento.get('dueDate')!.value) == ''? null: this.parseDate(this.seguimiento.get('dueDate')!.value)) : true ;
        this.project.control_date != (this.seguimiento.get('controlDate')?.value == null ? null : this.parseDate(this.seguimiento.get('controlDate')?.value)) ? editProject.control_date =
          (this.parseDate(this.seguimiento.get('controlDate')!.value) == ''? null: this.parseDate(this.seguimiento.get('controlDate')!.value)) : true ;

        if(this.project.states_by_phase!.state!.id != this.seguimiento.get('states')?.value ||
        this.project.states_by_phase!.phase!.id != this.seguimiento.get('phases')?.value){
          var stateByPhases: any[] = this.stateByPhases.
          filter(stateByPhase => (
              stateByPhase.state!.id == this.seguimiento.get('states')!.value)
              && (stateByPhase.phase!.id == this.seguimiento.get('phases')!.value)
          );
          var sbf: StateByPhase = stateByPhases[0];
          editProject.states_by_phase_id = sbf.id ;

        }


        this.project.sprint != this.seguimiento.get('sprint')?.value ? editProject.sprint = this.seguimiento.get('sprint')!.value : true ;
        this.project.evaluation != this.seguimiento.get('evaluation')?.value ? editProject.evaluation = this.seguimiento.get('evaluation')!.value : true ;
        this.project.test_log != this.seguimiento.get('testLog')?.value ? editProject.test_log = this.seguimiento.get('testLog')!.value : true ;

        editProject.user_updates_id = JSON.parse(localStorage.user).id,

        true; //environment.consoleMessage(editProject, "editProject >>>>>>>>>>>>>>")

        await this._projectsService.updateProjectsId(editProject, this.project.id!)
          .subscribe(data =>
            {
              true;//environment.consoleMessage(data, "data edici??n");
              this.openSnackBar(true, "Proyecto editado", "");
            }
        );
        this.fButtonDisabled = false;
        this.emitClose.emit('close');
      }
    }
  }

   async create(){
    var valido = true;
    var message = this.validateFormGroup(this.general);
    if (message != ""){
      valido = false;
    }

    message = this.validateFormGroup(this.descripcion);
    if (message != ""){
      valido = false;
    }

    message = this.validateFormGroup(this.seguimiento);
    if (message != ""){
      valido = false;
    }

    if (message != ""){
      this.message = message;
    } else {
      this.message = "";
      if (valido){

        var stateByPhases: any[] =
        this.stateByPhases.
        filter(
          stateByPhase => (
            stateByPhase.state!.id == this.seguimiento.get('states')!.value)
            && (stateByPhase.phase!.id == this.seguimiento.get('phases')!.value));
        var stateByPhase: number = stateByPhases[0].id;
        
        var project: Project = {
          title: this.general.get('title')!.value,
          area_id: this.general.get('areas')!.value,
          strategic_approach_id: this.general.get('strategicApproaches')!.value,
          reception_date: this.parseDate(this.general.get('receptionDate')!.value),
          program_id: this.general.get('programs')!.value,

          description: this.descripcion.get('projectDescription')!.value,
          //functional_lead_id: this.descripcion.get('leads')!.value,
          //functional_lead_id: this.leadsControl.value.id,
          priority_id: this.descripcion.get('priorities')!.value,
          typification_id: this.descripcion.get('typifications')!.value,
          strategic_guideline_id: this.descripcion.get('strategicGuidelines')!.value,
          management_id: this.descripcion.get('managements')!.value,
          //pmo_id: this.descripcion.get('pmos')!.value,
          //pmo_id: this.pmosControl.value.id,
          pmo_hours:  Math.trunc(this.descripcion.get('pmoHours')!.value),
          pmo_minutes: ((this.descripcion.get('pmoHours')!.value! - Math.trunc(this.descripcion.get('pmoHours')!.value)) *60),
          //pmo_assitant_id: this.descripcion.get('pmoAssists')!.value,
          //pmo_assitant_id: this.pmosAssistantControl.value.id,
          pmo_assitant_stage_id: this.descripcion.get('stages')!.value,
          pmo_assistant_hours: (this.descripcion.get('pmoAssistHours')!.value! == undefined ? undefined : Math.trunc(this.descripcion.get('pmoAssistHours')!.value!)),
          pmo_assistant_minutes: (this.descripcion.get('pmoAssistHours')!.value! == undefined ? undefined : ((this.descripcion.get('pmoAssistHours')!.value! - Math.trunc(this.descripcion.get('pmoAssistHours')!.value)) *60)),
          budget_approved: this.descripcion.get('budgetApproved')!.value,
          budget_executed: this.descripcion.get('budgetExecuted')!.value,

          start_date: this.parseDate(this.seguimiento.get('startDate')!.value) == ''? null: this.parseDate(this.seguimiento.get('startDate')!.value),
          due_date: this.parseDate(this.seguimiento.get('dueDate')!.value) == ''? null: this.parseDate(this.seguimiento.get('dueDate')!.value),
          control_date: this.parseDate(this.seguimiento.get('controlDate')!.value) == ''? null: this.parseDate(this.seguimiento.get('controlDate')!.value),
          states_by_phase_id: stateByPhase,
          sprint: this.seguimiento.get('sprint')!.value,
          evaluation: this.seguimiento.get('evaluation')!.value,
          test_log: this.seguimiento.get('testLog')!.value,

          is_active: true,
          is_delete: false

        }
        
        project.functional_lead_id = (this.leadsControl.value == null ? null : this.leadsControl.value.id);
        project.pmo_id = (this.pmosControl.value == null ? null : this.pmosControl.value.id);
        project.pmo_assitant_id = (this.pmosAssistantControl.value == null ? null : this.pmosAssistantControl.value.id);
        
        this.fButtonDisabled = true;
        await this._projectsService.addProjects(project).subscribe((res) => {
          this.fButtonDisabled = false;
          if (res.status == 'created') {
            this.openSnackBar(true, "Registro creado satisfactoriamente", "");
            var id = res.location.id;
            var mainTable: MainTableProject = {
              benefits: [],
              highlights: [],
              risks: [],
              kpis: [],
              applications_by_projects: [],
              areas_by_projects: [],
              test_users: [],
              companies_by_projects: [],
            };
            for (let index = 0; index < this.benefits.length; index++) {
              var benefit: Benefit = {
                project_id: id,
                description: this.benefits[index].description,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.benefits?.push(benefit);
            }

            for (let index = 0; index < this.highlights.length; index++) {
              var highlight: Highlight = {
                project_id: id,
                description: this.highlights[index].description,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.highlights?.push(highlight);
            }

            for (let index = 0; index < this.risks.length; index++) {
              var risk: Risk = {
                project_id: id,
                description: this.risks[index].description,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.risks?.push(risk);
            }

            for (let index = 0; index < this.kpis.length; index++) {
              var kpi: Kpi = {
                project_id: id,
                description: this.kpis[index].description,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.kpis?.push(kpi);
            }

            for (let index = 0; index < this.applications.length; index++) {
              var application: ApplicationByProject = {
                project_id: id,
                application_id :this.applications[index].id,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.applications_by_projects?.push(application);
            }

            for (let index = 0; index < this.areasByProject.length; index++) {
              var area: AreaByProject = {
                project_id: id,
                area_id : this.areasByProject[index].id,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.areas_by_projects?.push(area);
            }

            for (let index = 0; index < this.companies.length; index++) {
              var company: CompanyByProject = {
                project_id: id,
                company_id : this.companies[index].id,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.companies_by_projects?.push(company)
            }

            environment.consoleMessage(this.testUsers, "<<<<<<<<<<<<<<<       ajklsdnkajsdkasd    >>>>>>>>>>>>");
            for (let index = 0; index < this.testUsers.length; index++) {
              var testUser: any = { //borar
                project_id: id,
                person_id : this.testUsers[index].id,
                user_creates_id: JSON.parse(localStorage.user).id,
              }
              mainTable.test_users?.push(testUser);
            }
            this._mainCreateTablesService.addMainTableProject(mainTable).subscribe(
              data => 
              {
                environment.consoleMessage(data, "data")
                environment.consoleMessage(this.isComponent, "isComponent")
                if(this.isComponent){
                  this.onReset(this.general);
                  this.onReset(this.descripcion);
                  this.onReset(this.seguimiento);
                  this.benefits = [];
                  this.benefitsObjects = [];
                  this.highlights = [];
                  this.highlightsObjects = [];
                  this.risks = [];
                  this.risksObjects = [];
                  this.kpis = [];
                  this.kpisObjects = [];
                  this.applications = [];
                  this.applicationsObjects = [];
                  this.areasByProject = [];
                  this.areasByProjectObjects = [];
                  this.companies = [];
                  this.companiesObjects = [];
                  this.testUsers = [];
                  this.testUsersObjects = [];
                }
              }
            );
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
            true;//environment.consoleMessage(err, "Error: ");
          })

          this.openSnackBar(false, sErrors, "");
        });;
        this.fButtonDisabled = false;
        if(!this.isComponent){
          this.emitClose.emit('close');
        }
        this.stepper.reset();
      }else{
        console.log("no guardar");
      }
    }
  }

  back(stepper: MatStepper){
    stepper.previous();
  }

  parseDate(date: any): string {
    if (date == '' || date == undefined || date == null){
      return '';
    }
    if (date + "" != "Invalid Date" ){
      let d!: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return `${this.datepipe.transform( d, 'yyyy-MM-dd')}`;
      }
    } else {
      return "";
    }
  }

  validateFormGroup(formGroup: FormGroup){
    var keys = Object.keys(formGroup.controls);
    var message = "";

    for (let index = 0; index < keys.length; index++) {
      if(formGroup.get(keys[index])!.errors != null){
        if (formGroup.get(keys[index])!.errors!.required) {
          if (message != '') {
            message += ', ';
          }
          message += this.labels[`${keys[index]}`];
        }
      }
    }

    if (message != ""){
      message += ' vacio';
    }

    return message;
  }

  getMessageError(formGroup: FormGroup, field: string): string {
    let message!: string;
    if (formGroup.get(field)?.errors?.required) {
      message = `Campo ${this.labels[field]} es requerido`
    }
    if (formGroup.get(field)?.errors?.max) {
      message = `M??ximo ${formGroup.get(field)?.errors?.max.max}`
    }
    if (formGroup.get(field)?.errors?.min) {
      message = `M??nimo ${formGroup.get(field)?.errors?.min.min}`
    }

    return message;
  }

  onReset(formGroup: FormGroup) {
    this.isButtonReset = true;
    if(this.data.mode == 'create'){
      var keys = Object.keys(formGroup.controls)
      for (let index = 0; index < keys.length; index++) {
        formGroup.controls[keys[index]].setValue(null);
      }
      if(formGroup == this.descripcion){
        this.validateAssist();
      }
    }else if(this.data.mode == 'edit'){
      this.resetformToProject(formGroup);
    }
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

  numberToCOP(n: number){
     return new Intl.NumberFormat('en-US').
      format(n)
  }

  getBudgetApproved(){
    return this.numberToCOP(this.descripcion.get('budgetApproved')!.value!)
  }

  getBalance(){
    if(this.descripcion.get('budgetApproved')!.value! - this.descripcion.get('budgetExecuted')!.value! < 0){
      this.sobreExcecuted = true;
    }else{
      this.sobreExcecuted = false;
    }
    this.balanceStr = this.numberToCOP(this.descripcion.get('budgetApproved')!.value! - this.descripcion.get('budgetExecuted')!.value!)
    return this.numberToCOP(this.descripcion.get('budgetApproved')!.value! - this.descripcion.get('budgetExecuted')!.value!)
  }

  getBudgetExecuted(){
    return this.numberToCOP(this.descripcion.get('budgetExecuted')!.value!)
  }

}
