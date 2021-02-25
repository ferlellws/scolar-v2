import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
@Component({
  selector: 'tecno-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss'],
})
export class ProjectsFormComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

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

  constructor(
    private _fbG: FormBuilder,
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

    ) { 
      this.general = this._fbG.group({
        'titleControl': [this.title, [Validators.required]],
        'vicePresidenciesControl': [this.vicePresidency, [Validators.required]],
        'areasControl': [this.area, [Validators.required]],
        'strategicApproachesControl': [this.strategicApproach, [Validators.required]],
        'receptionDateControl': [new Date, [Validators.required]],
        'programsControl': [this.program],
      });

      this.descripcion = this._fbG.group({
        'projectDescriptionControl': [this.projectDescription, [Validators.required]],
        'leadsControl': [this.lead_id, [Validators.required]],
        'prioritiesControl': [this.priority, [Validators.required]],
        'typificationsControl': [this.typification, [Validators.required]],
        'managementsControl': [this.management, [Validators.required]],
        'pmosControl': [this.pmo_id, [Validators.required]],
        'pmoHoursControl': [this.pmoHours, [Validators.required]],
        'pmoMinutesControl': [this.pmoMinutes, [Validators.required]],
        'pmoAssistsControl': [this.pmoAssist_id],
        'stagesControl': [{value: this.stage, disabled: this.deshabilitarAssist}, [Validators.required]],
        'pmoAssistHoursControl': [{value: this.pmoAssistHours, disabled: this.deshabilitarAssist}, [Validators.required]],
        'pmoAssistMinutesControl': [{value: this.pmoAssistMinutes, disabled: this.deshabilitarAssist}, [Validators.required]],
        'budgetApprovedControl': [this.budgetApproved, [Validators.required]],
        'budgetExecutedControl': [this.budgetExecuted, [Validators.required]],
        'balanceControl': [{value: this.balance, disabled: true}, [Validators.required]],
      });

      this.seguimiento = this._fbG.group({
        'startDateControl': [],
        'dueDateControl': [],
        'realDueDateControl': [],
        'statesControl': [this.state, [Validators.required]],
        'phasesControl': [this.phase, [Validators.required]],
        'sprintControl': [this.phase, [Validators.required]],
        'evaluationControl': [this.evaluation],
        'testLogControl': [this.testLog],
      });


      this.labels = {
        titleControl: `Nombre del Proyecto`,
        vicePresidenciesControl: `Vicepresidencias`,
        areasControl: `Areas`,
        strategicApproachesControl: 'Enfoque estrategico',
        receptionDateControl: `Fecha de recepción`,
        programsControl: `Programa`,
  
        prioritiesControl: `Prioridad`,
        typificationsControl: `Tipificación`,
        projectDescriptionControl: `Descripción`,
        leadsControl: `Lider Funcional`,
        managementsControl: `Gestión`,
        pmosControl: `PMO asignado`,
        pmoHoursControl: `Horas Semanales PMO`,
        pmoMinutesControl: `Minutos Semanales PMO`,
        pmoAssistsControl: `PMO  de apoyo asignado`,
        stagesControl: `Etapa de Apoyo`,
        pmoAssistHoursControl: `Horas Semanales PMO de apoyo`,
        pmoAssistMinutesControl: `Minutos Semanales PMO de apoyo`,
        budgetApprovedControl: `Presupuesto Aprobado`,
        budgetExecutedControl: `Presupuesto Ejecutado`,
        balanceControl: `Saldo`,
  
        startDateControl: `Fecha de Inicio`,
        dueDateControl: `Fecha Final Estimada`,
        realDueDateControl: `Fecha control de cambios`,
        statesControl: `Estado`,
        phasesControl: `Fase`,
        sprintControl: `Sprint`,
        evaluationControl: `¿Como se evaluó la selección de proveedores si aplica?`,
        testLogControl: `Bitacora de Pruebas`,
      }

    }

  ngOnInit(): void {
    this.validateAssist ();
    this.validateFormGroup(this.general)
  }

  validateAssist () {
    environment.consoleMessage("entro validacion");
    environment.consoleMessage(this.descripcion.get('pmoAssistsControl')!.value);
    var valor = this.descripcion.get('pmoAssistsControl')!.value;
    if( valor != "" && valor != null && valor != 0 ){
      this.deshabilitarAssist = false;
      this.descripcion.get('stagesControl')!.enable();
      this.descripcion.get('pmoAssistHoursControl')!.enable();
      this.descripcion.get('pmoAssistMinutesControl')!.enable();
    } else {
      this.deshabilitarAssist = true;
      this.descripcion.get('stagesControl')!.disable();
      this.descripcion.get('pmoAssistHoursControl')!.disable();
      this.descripcion.get('pmoAssistMinutesControl')!.disable();
    }
    return this.deshabilitarAssist
  }


  changeBudget(){
    this.descripcion.get("balanceControl")!.
    setValue(
      new Intl.NumberFormat('en-US').
      format(this.descripcion.get("budgetApprovedControl")!.value - this.descripcion.get("budgetExecutedControl")!.value )
    );
    
  }

  _openVicePresidencies(ev: boolean) {
    if (ev) {
      this._vicePresidenciesService.getVicePresidenciesAll()
        .subscribe(data => this.vicePresidencies = data);
    }
  }

  _openAreas(ev: boolean) {
    if (ev) {
      var vice: number = this.general.get('vicePresidenciesControl')!.value;
      this._areasService.getAreasAll()
        .subscribe((areas: Area[]) => this.areas = areas.filter(area => area.vice_presidency_id == vice));
    }
  }

  _openStrategicApproaches(ev: boolean) {
    if (ev) {
      this._strategicApproachesService.getStrategicApproachesAll()
        .subscribe((strategicApproaches: StrategicApproach[]) => this.strategicApproaches = strategicApproaches);
    }
  }

  _openPrograms(ev: boolean) {
    if (ev) {
      this._programsService.getProgramsAll()
        .subscribe((programs: Program[]) => this.programs = programs);
    }
  }

  _openLeads(ev: boolean) {
    if (ev) {
      this._usersService.getUsers()
        .subscribe((leads: User[]) => this.leads = leads);
    }
  }

  _openPriorities(ev: boolean) {
    if (ev) {
      this._prioritiesService.getPrioritiesAll()
        .subscribe((priorities: Priority[]) => this.priorities = priorities);
    }
  }

  _openTypifications(ev: boolean) {
    if (ev) {
      this._typificationsService.getTypificationsAll()
        .subscribe((typifications: Typification[]) => this.typifications = typifications);
    }
  }

  _openManagements(ev: boolean) {
    if (ev) {
      this._managementsService.getManagementsAll()
        .subscribe((managements: Management[]) => this.managements = managements);
    }
  }

  _openPMOS(ev: boolean) {
    if (ev) {
      this._usersService.getUsers()
        .subscribe((pmos: User[]) => this.pmos = pmos);
    }
  }

  _openPMOAssists(ev: boolean) {
    if (ev) {
      this._usersService.getUsers()
        .subscribe((pmoAssists: User[]) => this.pmoAssists = pmoAssists);
    }else{
      this.validateAssist();
    }
  }

  _openStages(ev: boolean) {
    if (ev) {
      this._stagesService.getStagesAll()
        .subscribe((stages: Stage[]) => this.stages = stages);
    }
  }

  _openStates(ev: boolean){
    if (ev) {
      this._statesService.getStatesAll()
        .subscribe((states: State[]) => this.states = states);
    }else{
      this._phasesService.getPhasesAll()
        .subscribe((phases: Phase[]) => 
        {
          this._statesByPhasesService.getStateByPhasesAll()
          .subscribe((stateByPhases: StateByPhase[]) =>
          {
            this.stateByPhases = [];
            this.phases = [];
            this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state_id == this.seguimiento.get('statesControl')!.value);
            for (let index = 0; index <  this.stateByPhases.length; index++) {
              this.phases.push(phases.filter(phase => phase.id == this.stateByPhases[index].phase_id)[0]);
            }
            if( this.phases.filter(phase => phase.id == this.seguimiento.get('phasesControl')!.value).length < 1){
              this.seguimiento.get('phasesControl')!.setValue(0);
            }
          })
        });
    }
  }

  _openPhases(ev: boolean){
    if (ev) {
      this._phasesService.getPhasesAll()
        .subscribe((phases: Phase[]) => 
        {
          this._statesByPhasesService.getStateByPhasesAll()
          .subscribe((stateByPhases: StateByPhase[]) =>
          {
            this.stateByPhases = [];
            this.phases = [];
            this.stateByPhases = stateByPhases.filter(stateByPhase => stateByPhase.state_id == this.seguimiento.get('statesControl')!.value);
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
      console.log(message);
    } else {
      stepper.next();
    }
  }

  back(stepper: MatStepper){
    stepper.previous();
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

}
