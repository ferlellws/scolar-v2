import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VicePresidency } from 'src/app/models/vice-presidency';
import {VicePresidenciesService} from '../../../services/vice-presidencies.service'
import { AreasService } from '../../../services/areas.service'
import { Area } from 'src/app/models/area';
import { Program } from 'src/app/models/program';
import { ProgramsService } from 'src/app/services/progrmas.service';
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
@Component({
  selector: 'tecno-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss'],
})
export class ProjectsFormComponent implements OnInit {

  title:string = "Hola";
  vicePresidency: number = 0;
  area: number = 0;
  program: number = 0;

  lead_id: number = 0;
  priority: number = 0;
  typification: number = 0;
  projectDescription = "";
  management: number = 0;
  pmo_id: number = 0;
  pmoHours: number = 0;
  pmoMinutes: number = 0;
  pmoAssist_id: number = 0;
  stage: number = 0;
  pmoAssistHours: number = 0;
  pmoAssistMinutes: number = 0;
  budgetApproved: number = 0;
  budgetExecuted: number = 0;
  balance: number = this.budgetApproved - this.budgetExecuted;

  state: number = 0;
  phase: number = 0;
  sprint: number = 0;
  evaluation: string = "";
  testLog:number = 0;

  

  vicePresidencies: VicePresidency[] = [];
  areas: Area[] = [];
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

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  deshabilitarAssist: boolean = true;

  constructor(
    private _fbG: FormBuilder,
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
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
        'titleControl': [this.title, [Validators.required]],
        'vicePresidenciesControl': [this.vicePresidency, [Validators.required]],
        'areasControl': [this.area, [Validators.required]],
        'receptionDateControl': [new Date, [Validators.required]],
        'programsControl': [this.program],
      });

      this.descripcion = this._fbG.group({
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
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
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
        'startDateControl': [],
        'dueDateControl': [],
        'realDueDateControl': [],
        'statesControl': [this.state, [Validators.required]],
        'phasesControl': [this.phase, [Validators.required]],
        'sprintControl': [this.phase, [Validators.required]],
        'evaluationControl': [this.evaluation],
        'testLogControl': [this.testLog],
      });

    }

  ngOnInit(): void {
    this.validateAssist ();
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

  _openPrograms(ev: boolean) {
    if (ev) {
      this._programsService.getProgramsAll()
        .subscribe((programs: Program[]) => this.programs = programs);
    }
  }

  _openLeads(ev: boolean) {
    if (ev) {
      this.leads = this._usersService.getUsers()
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
      this.pmos = this._usersService.getUsers()
    }
  }

  _openPMOAssists(ev: boolean) {
    if (ev) {
      this.pmoAssists = this._usersService.getUsers()
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

}
