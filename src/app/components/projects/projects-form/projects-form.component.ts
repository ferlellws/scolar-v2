import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
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

  message: string = "";

  title!:string;
  vicePresidency!: number;
  area!: number;
  strategicApproach!: number;
  program!: number;

  lead_id!: number;
  priority!: number;
  typification!: number;
  projectDescription!: string;
  management!: number;
  pmo_id!: number;
  pmoHours!: number;
  pmoMinutes!: number;
  pmoAssist_id!: number;
  stage!: number;
  pmoAssistHours!: number;
  pmoAssistMinutes!: number;
  budgetApproved!: number;
  budgetExecuted!: number;
  balance: number = this.budgetApproved - this.budgetExecuted;

  state!: number;
  phase!: number;
  sprint!: number;
  evaluation!: string;
  testLog!:number;

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

  states: State[] = [];
  phases: Phase[] = [];
  stateByPhases: StateByPhase[] = [];

  general: FormGroup;
  descripcion: FormGroup;
  seguimiento: FormGroup;

  deshabilitarAssist: boolean = true;

  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;

  benefits: string[] = [];
  highlights: string[] = [];
  risks: string[] = [];
  kpis: string[] = [];

  constructor(
    private _fbG: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _strategicApproachesService: StrategicApproachesService,
    private _vicePresidenciesService: VicePresidenciesService,
    private _areasService: AreasService,
    private _programsService: ProgramsService,
    private _usersService: UserService,
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
    public datepipe: DatePipe,
    private snackBar: MatSnackBar,

    ) { 
      this.general = this._fbG.group({
        'title': [this.title, [Validators.required]],
        'vicePresidencies': [this.vicePresidency, [Validators.required]],
        'areas': [this.area, [Validators.required]],
        'strategicApproaches': [this.strategicApproach, [Validators.required]],
        'receptionDate': [new Date, [Validators.required]],
        'programs': [this.program],
      });

      this.descripcion = this._fbG.group({
        'projectDescription': [this.projectDescription, [Validators.required]],
        'leads': [this.lead_id, [Validators.required]],
        'priorities': [this.priority, [Validators.required]],
        'typifications': [this.typification, [Validators.required]],
        'managements': [this.management, [Validators.required]],
        'pmos': [this.pmo_id, [Validators.required]],
        'pmoHours': [this.pmoHours, [Validators.required]],
        'pmoMinutes': [this.pmoMinutes, [Validators.required]],
        'pmoAssists': [this.pmoAssist_id],
        'stages': [{value: this.stage, disabled: this.deshabilitarAssist}, [Validators.required]],
        'pmoAssistHours': [{value: this.pmoAssistHours, disabled: this.deshabilitarAssist}, [Validators.required]],
        'pmoAssistMinutes': [{value: this.pmoAssistMinutes, disabled: this.deshabilitarAssist}, [Validators.required]],
        'budgetApproved': [this.budgetApproved, [Validators.required]],
        'budgetExecuted': [this.budgetExecuted, [Validators.required]],
        'balance': [{value: this.balance, disabled: true}, [Validators.required]],
      });

      this.seguimiento = this._fbG.group({
        'startDate': [],
        'dueDate': [],
        'controlDate': [],
        'states': [this.state, [Validators.required]],
        'phases': [this.phase, [Validators.required]],
        'sprint': [this.phase, [Validators.required]],
        'evaluation': [this.evaluation],
        'testLog': [this.testLog],
      });


      this.labels = {
        title: `Nombre del Proyecto`,
        vicePresidencies: `Vicepresidencias`,
        areas: `Areas`,
        strategicApproaches: 'Enfoque estrategico',
        receptionDate: `Fecha de recepción`,
        programs: `Programa`,
  
        priorities: `Prioridad`,
        typifications: `Tipificación`,
        projectDescription: `Descripción`,
        leads: `Lider Funcional`,
        managements: `Gestión`,
        pmos: `PMO asignado`,
        pmoHours: `Horas Semanales PMO`,
        pmoMinutes: `Minutos Semanales PMO`,
        pmoAssists: `PMO  de apoyo asignado`,
        stages: `Etapa de Apoyo`,
        pmoAssistHours: `Horas Semanales PMO de apoyo`,
        pmoAssistMinutes: `Minutos Semanales PMO de apoyo`,
        budgetApproved: `Presupuesto Aprobado`,
        budgetExecuted: `Presupuesto Ejecutado`,
        balance: `Saldo`,
  
        startDate: `Fecha de Inicio`,
        dueDate: `Fecha Final Estimada`,
        controlDate: `Fecha control de cambios`,
        states: `Estado`,
        phases: `Fase`,
        sprint: `Sprint`,
        evaluation: `¿Como se evaluó la selección de proveedores si aplica?`,
        testLog: `Bitacora de Pruebas`,
      }

    }

  ngOnInit(): void {
    this.validateAssist ();
    this.validateFormGroup(this.general)
  }

  onBenefits(benefits: string[]){
    this.benefits = benefits;
    environment.consoleMessage(this.benefits, "beneficios padre")
  }

  onHighlights(highlights: string[]){
    this.highlights = highlights;
    environment.consoleMessage(this.highlights, "hitos padre")
  }

  onRisks(risks: string[]){
    this.risks = risks;
    environment.consoleMessage(this.risks, "riesgos padre")
  }

  onKpis(kpis: string[]){
    this.kpis = kpis;
    environment.consoleMessage(this.kpis, "kpis padre")
  }

  validateAssist () {
    environment.consoleMessage("entro validacion");
    environment.consoleMessage(this.descripcion.get('pmoAssists')!.value);
    var valor = this.descripcion.get('pmoAssists')!.value;
    if( valor != "" && valor != null && valor != 0 ){
      this.deshabilitarAssist = false;
      this.descripcion.get('stages')!.enable();
      this.descripcion.get('pmoAssistHours')!.enable();
      this.descripcion.get('pmoAssistMinutes')!.enable();
    } else {
      this.deshabilitarAssist = true;
      this.descripcion.get('stages')!.disable();
      this.descripcion.get('stages')!.setValue(null);
      this.descripcion.get('pmoAssistHours')!.disable();
      this.descripcion.get('pmoAssistMinutes')!.disable();
    }
    return this.deshabilitarAssist
  }


  changeBudget(){
    this.descripcion.get("balance")!.
    setValue(
      new Intl.NumberFormat('en-US').
      format(this.descripcion.get("budgetApproved")!.value - this.descripcion.get("budgetExecuted")!.value )
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
        .subscribe((areas: Area[]) => this.areas = areas.filter(area => area.vice_presidency_id == vice));
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
      this._usersService.getManagers()
        .subscribe((leads: User[]) => this.leads = leads);
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

  _openManagements(ev: boolean) {
    if (ev) {
      this._managementsService.getManagementsSelect()
        .subscribe((managements: Management[]) => this.managements = managements);
    }
  }

  _openPMOS(ev: boolean) {
    if (ev) {
      this._usersService.getManagers()
        .subscribe((pmos: User[]) => this.pmos = pmos);
    }
  }

  _openPMOAssists(ev: boolean) {
    if (ev) {
      this._usersService.getManagers()
        .subscribe((pmoAssists: User[]) => this.pmoAssists = pmoAssists);
    }else{
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
            this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state_id == this.seguimiento.get('states')!.value);
            for (let index = 0; index <  this.stateByPhases.length; index++) {
              this.phases.push(phases.filter(phase => phase.id == this.stateByPhases[index].phase_id)[0]);
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
            this.stateByPhases = [];
            this.phases = [];
            this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state_id == this.seguimiento.get('states')!.value);
            for (let index = 0; index <  this.stateByPhases.length; index++) {
              this.phases.push(phases.filter(phase => phase.id == this.stateByPhases[index].phase_id)[0]);
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

   async create(){
    environment.consoleMessage("CREATE");
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
      environment.consoleMessage(valido, "SIN ERROR: ");
      this.message = "";
      if (valido){
        
        var stateByPhases: any[] = 
        this.stateByPhases.
        filter(
          stateByPhase => (
            stateByPhase.state_id == this.seguimiento.get('states')!.value) 
            && (stateByPhase.phase_id == this.seguimiento.get('phases')!.value));
        var stateByPhase: number = stateByPhases[0].id;  
        var project: Project = {
          title: this.general.get('title')!.value,
          area_id: this.general.get('areas')!.value,
          strategic_approach_id: this.general.get('strategicApproaches')!.value,
          reception_date: this.parseDate(this.general.get('receptionDate')!.value),
          program_id: this.general.get('programs')!.value,

          description: this.descripcion.get('projectDescription')!.value,
          functional_lead_id: this.descripcion.get('leads')!.value,
          priority_id: this.descripcion.get('priorities')!.value,
          typification_id: this.descripcion.get('typifications')!.value,
          management_id: this.descripcion.get('managements')!.value,
          pmo_id: this.descripcion.get('pmos')!.value,
          pmo_hours: this.descripcion.get('pmoHours')!.value,
          pmo_minutes: this.descripcion.get('pmoMinutes')!.value,
          pmo_assitant_id: this.descripcion.get('pmoAssists')!.value,
          pmo_assitant_stage_id: this.descripcion.get('stages')!.value,
          pmo_assistant_hours: this.descripcion.get('pmoAssistHours')!.value,
          pmo_assistant_minutes: this.descripcion.get('pmoAssistMinutes')!.value,
          budget_approved: this.descripcion.get('budgetApproved')!.value,
          budget_executed: this.descripcion.get('budgetExecuted')!.value,

          start_date: this.parseDate(this.seguimiento.get('startDate')!.value),
          due_date: this.parseDate(this.seguimiento.get('dueDate')!.value),
          control_date: this.parseDate(this.seguimiento.get('controlDate')!.value),
          states_by_phase_id: stateByPhase,
          sprint: this.seguimiento.get('sprint')!.value,
          evaluation: this.seguimiento.get('evaluation')!.value,
          test_log: this.seguimiento.get('testLog')!.value,

          is_active: true,
          is_delete: false

        }
        
        environment.consoleMessage(project, "OBJETO: ");
        
        this.fButtonDisabled = true;
        await this._projectsService.addProjects(project).subscribe((res) => {
          environment.consoleMessage(res, "<<<<<<<<>>>>>>");
          this.fButtonDisabled = false;
          if (res.status == 'created') {
            this.openSnackBar(true, "Registro creado satisfactoriamente", "");
            var id = res.location.id;
            for (let index = 0; index < this.benefits.length; index++) {
              var benefit: Benefit = {
                project_id: id,
                description: this.benefits[index],
                user_creates_id: JSON.parse(localStorage.user).id,
              } 
              this._benefitsService.addBenefit(benefit).
              subscribe(data => environment.consoleMessage(data));
            }

            for (let index = 0; index < this.highlights.length; index++) {
              var highlight: Highlight = {
                project_id: id,
                description: this.highlights[index],
                user_creates_id: JSON.parse(localStorage.user).id,
              } 
              this._highlightsService.addHighlight(highlight).
              subscribe(data => environment.consoleMessage(data));
            }

            for (let index = 0; index < this.risks.length; index++) {
              var risk: Risk = {
                project_id: id,
                description: this.risks[index],
                user_creates_id: JSON.parse(localStorage.user).id,
              } 
              this._risksService.addRisk(risk).
              subscribe(data => environment.consoleMessage(data));
            }

            for (let index = 0; index < this.kpis.length; index++) {
              var kpi: Kpi = {
                project_id: id,
                description: this.kpis[index],
                user_creates_id: JSON.parse(localStorage.user).id,
              } 
              this._kpisService.addKpi(kpi).
              subscribe(data => environment.consoleMessage(data));
            }
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
            environment.consoleMessage(err, "Error: ");
          })
  
          this.openSnackBar(false, sErrors, "");
        });;
        this.fButtonDisabled = false;
        this.emitClose.emit('close');

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

    return message;
  }

  onReset(formGroup: FormGroup) {
    this.isButtonReset = true;
    var keys = Object.keys(formGroup.controls)
    for (let index = 0; index < keys.length; index++) {
      formGroup.controls[keys[index]].setValue(null);
    }
    if(formGroup == this.descripcion){
      this.validateAssist();
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

}
