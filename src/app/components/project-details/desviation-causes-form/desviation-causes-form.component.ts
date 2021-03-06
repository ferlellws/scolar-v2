import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DelayCause } from 'src/app/models/delay-cause';
import { DelayCauseBySource } from 'src/app/models/delay-cause-by-source';
import { DelaySource } from 'src/app/models/delay-source';
import { DelayTypification } from 'src/app/models/delay-typification';
import { DesviationCause } from 'src/app/models/desviation-cause';
import { SolutionState } from 'src/app/models/solution-state';
import { Typification } from 'src/app/models/typification';
import { DelayCauseBySourceBySourcesService } from 'src/app/services/delay-cause-by-sources.service';
import { DelayCauseService } from 'src/app/services/delay-causes.service';
import { DelaySourcesService } from 'src/app/services/delay-sources.service';
import { DelayTypificationsService } from 'src/app/services/delay-typifications.service';
import { DesviationCausesService } from 'src/app/services/desviation-causes.service';
import { SolutionStatesService } from 'src/app/services/solution-states.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  idProject: number;
  idCausal?: number; 
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-desviation-causes-form',
  templateUrl: './desviation-causes-form.component.html',
  styleUrls: ['./desviation-causes-form.component.scss']
})
export class DesviationCausesFormComponent implements OnInit {

  @Output() emitClose: EventEmitter<string> = new EventEmitter();
  general!: FormGroup;
  labels: any;
  delay_cause_by_sources_id: number = -1;
  fButtonDisabled: boolean = false;
  singularOption: string = "Crear causal de desviación";
  showBtnClose: boolean = true;

  sources: DelaySource[] = [];
  causes: DelayCause[] = [];
  delayTypifications: DelayTypification[] = [];
  solutionStates: SolutionState[] = [];
  causesIDs: DelayCauseBySource[] = [];

  desviationCause?: DesviationCause;

  constructor(
    private snackBar: MatSnackBar,
    private _fbG: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public datepipe: DatePipe,
    private _desviationCausesService: DesviationCausesService,
    private _delaySourcesService: DelaySourcesService,
    private _delayCauseService: DelayCauseService,
    private _delayCauseBySourceBySourcesService: DelayCauseBySourceBySourcesService,
    private _delayTypificationsService: DelayTypificationsService,
    private _solutionStatesService: SolutionStatesService,
  ) {
    if(data.mode == "edit"){
      this.singularOption = "Editar causal de desviación"
    }
  }

  async ngOnInit(): Promise<any> {
    this.general = this._fbG.group({
      'date': [null, [Validators.required]],
      'deliverable': [null, [Validators.required]],

      'source': [null, [Validators.required]],
      'cause': [null, [Validators.required]],
      'delay_typification': [null, [Validators.required]],
      'cause_delay': [null, [Validators.required]],

      'impacts_critical_path': [null, [Validators.required]],
      'impacts_time': [null, [Validators.required, Validators.min(0)]],
      'cost_variation': [null, [Validators.required]],
      'schedule_activity_impacted': [null, [Validators.required]],

      'proposed_solution': [null, [Validators.required]],
      'solution_state': [null, [Validators.required]],
    });

    this.labels = {
      date: `Fecha de incidencia`,
      deliverable: `Entregable`,

      source: `Fuente de atraso`,
      cause: `Causa de atraso`,
      delay_typification: `Tipificación de atraso`,
      cause_delay: `Causa del atraso`,

      impacts_critical_path: `Impacta ruta crítica`,
      impacts_time: `Impacto tiempo (días)`,
      cost_variation: `Variación de costos`,
      schedule_activity_impacted: `Actividad cronograma impactada`,

      proposed_solution: `Solución Propuesta`,
      solution_state: `Estado de la solución`,
    }

    if(this.data.mode == "edit"){
      await this._desviationCausesService.getDesviationCausesId(this.data.idCausal!)
        .subscribe(desviation => {
          desviation.date = desviation.date.substr(0,10);
          this.desviationCause = desviation;
          this.onResetDesviation();
          environment.consoleMessage(this.desviationCause, ">>>>>>>> desviation")
        });

      await this._delaySourcesService.getDelaySources()
        .subscribe((sources: DelaySource[]) => this.sources = sources);

      await this._delayCauseBySourceBySourcesService.getDelayCauseBySources()
      .subscribe((causeBySourceBySources: DelayCauseBySource[]) => {
        this.causesIDs = [];
        for (let index = 0; index < causeBySourceBySources.length; index++) {
          if(causeBySourceBySources[index].delay_source!.id! == this.desviationCause?.delay_cause_by_source?.delay_source?.id){
            this.causesIDs.push(causeBySourceBySources[index]);
          }
        }
        this._delayCauseService.getDelayCauses()
        .subscribe((causes: DelayCause[]) => {
          var causesIDs: number[] = this.causesIDs.map(cause => cause.delay_cause!.id!)
          this.causes = causes.filter(cause => causesIDs.includes(cause.id!));
        })
      });

      await this._delayTypificationsService.getDelayTypifications()
        .subscribe((typifications: DelayTypification[]) => this.delayTypifications = typifications);
      
      await this._solutionStatesService.getSolutionStates()
      .subscribe(data => this.solutionStates = data);
     
    }

  }

  onResetDesviation(){
    this.general.get("date")!.setValue(new Date(`${this.desviationCause!.date}:00:00`));
    this.general.get("deliverable")!.setValue(this.desviationCause?.deliverable);

    this.general.get("source")!.setValue(this.desviationCause!.delay_cause_by_source?.delay_source?.id);
    this.general.get("cause")!.setValue(this.desviationCause!.delay_cause_by_source?.delay_cause?.id);
    this.general.get("delay_typification")!.setValue(this.desviationCause!.delay_typification?.id);
    this.general.get("cause_delay")!.setValue(this.desviationCause!.cause_delay);

    this.general.get("impacts_critical_path")!.setValue(this.desviationCause!.impacts_critical_path);
    this.general.get("impacts_time")!.setValue(this.desviationCause!.impacts_time);
    this.general.get("cost_variation")!.setValue(this.desviationCause!.cost_variation);
    this.general.get("schedule_activity_impacted")!.setValue(this.desviationCause!.schedule_activity_impacted);

    this.general.get("proposed_solution")!.setValue(this.desviationCause!.proposed_solution);
    this.general.get("solution_state")!.setValue(this.desviationCause!.solution_state?.id);
    
  }

  _openSources(ev: boolean) {
    if (ev) {
      this._delaySourcesService.getDelaySources()
        .subscribe((sources: DelaySource[]) => this.sources = sources);
    }else{
      this.general.get('cause')!.setValue(null);
      this._delayCauseBySourceBySourcesService.getDelayCauseBySources()
        .subscribe((causeBySourceBySources: DelayCauseBySource[]) => {
          this.causesIDs = [];
          for (let index = 0; index < causeBySourceBySources.length; index++) {
            if(causeBySourceBySources[index].delay_source!.id! == this.general.get('source')!.value){
              this.causesIDs.push(causeBySourceBySources[index]);
            }
          }
          this._delayCauseService.getDelayCauses()
          .subscribe((causes: DelayCause[]) => {
            var causesIDs: number[] = this.causesIDs.map(cause => cause.delay_cause!.id!)
            this.causes = causes.filter(cause => causesIDs.includes(cause.id!));
          })
        });
    }
  }

  _openCauses(ev: boolean) {
    if (ev) {
      this._delayCauseBySourceBySourcesService.getDelayCauseBySources()
        .subscribe((causeBySourceBySources: DelayCauseBySource[]) => {
          this.causesIDs = [];
          for (let index = 0; index < causeBySourceBySources.length; index++) {
            if(causeBySourceBySources[index].delay_source!.id! == this.general.get('source')!.value){
              this.causesIDs.push(causeBySourceBySources[index]);
            }
          }
          this._delayCauseService.getDelayCauses()
          .subscribe((causes: DelayCause[]) => {
            var causesIDs: number[] = this.causesIDs.map(cause => cause.delay_cause!.id!)
            this.causes = causes.filter(cause => causesIDs.includes(cause.id!));
          })
        });
    }
  }

  _openDelayTypification(ev: boolean) {
    if (ev) {
      this._delayTypificationsService.getDelayTypifications()
        .subscribe((typifications: DelayTypification[]) => this.delayTypifications = typifications);
    }
  }

  _openSolutionState(ev: boolean) {
    if (ev) {
      this._solutionStatesService.getSolutionStates()
        .subscribe(data => this.solutionStates = data);
    }
  }

  async crear(){
    true; //environment.consoleMessage("crear")
    // environment.consoleMessage(this.causesIDs, "causes >>")
    var desviation: DesviationCause = {
      project_id: this.data.idProject,
      date: this.parseDate(this.general.get('date')!.value),
      deliverable: this.general.get('deliverable')!.value,

      delay_cause_by_source_id: this.causesIDs.filter(cause => cause.delay_cause!.id! == this.general.get('cause')!.value)[0].id,
      delay_typification_id: this.general.get('delay_typification')!.value,
      cause_delay: this.general.get('cause_delay')!.value,

      impacts_critical_path: this.general.get('impacts_critical_path')!.value,
      impacts_time: this.general.get('impacts_time')!.value,
      cost_variation: this.general.get('cost_variation')!.value,
      schedule_activity_impacted: this.general.get('schedule_activity_impacted')!.value,

      proposed_solution: this.general.get('proposed_solution')!.value,
      solution_state_id: this.general.get('solution_state')!.value,

      is_active: true,
      is_delete: false,
      user_creates_id: JSON.parse(localStorage.user).id,
    }
    await this._desviationCausesService.addDesviationCauses(desviation).subscribe((res) => {
      true; //environment.consoleMessage(res, "respuesta");
      this.openSnackBar(true, "Cusal de desviación creada", "");
      this.emitClose.emit('close');
    }, (err) => {
      this.fButtonDisabled = false;
      let aErrors: any[] = [];
      for(let i in err.error) {
        aErrors = aErrors.concat(err.error[i])
      }

      let sErrors: string = "";
      aErrors.forEach((err) => {
        sErrors += "- " + err + "\n";
        true; //environment.consoleMessage(err, "Error: ");
      })

      this.openSnackBar(false, sErrors, "");
    });
    this.emitClose.emit("close");
  }

  async editar(){
    var editado: any ={};
    if(this.parseDate(this.general.get("date")!.value!) != this.desviationCause?.date){
      editado.date = this.parseDate(this.general.get("date")!.value!)
    } 
    if(this.general.get("deliverable")!.value! != this.desviationCause?.deliverable){
      editado.deliverable = this.general.get("deliverable")!.value! ;
    }

    if(this.general.get("source")!.value! != this.desviationCause?.delay_cause_by_source?.delay_source?.id || 
      this.general.get("cause")!.value! != this.desviationCause?.delay_cause_by_source?.delay_cause?.id){
      editado.delay_cause_by_source_id = this.causesIDs.
        filter(cause => cause.delay_cause!.id! == this.general.get('cause')!.value)[0].id;
    }

    if(this.general.get("delay_typification")!.value! != this.desviationCause?.delay_typification?.id){
      editado.delay_typification_id = this.general.get("delay_typification")!.value! ;
    }

    if(this.general.get("cause_delay")!.value! != this.desviationCause?.cause_delay){
      editado.cause_delay = this.general.get("cause_delay")!.value!;
    }

    if(this.general.get("impacts_critical_path")!.value! != this.desviationCause?.impacts_critical_path){
      editado.impacts_critical_path = this.general.get("impacts_critical_path")!.value!;
    }

    if(this.general.get("impacts_time")!.value! != this.desviationCause?.impacts_time){
      editado.impacts_time = this.general.get("impacts_time")!.value!;
    }

    if(this.general.get("cost_variation")!.value! != this.desviationCause?.cost_variation){
      editado.cost_variation = this.general.get("cost_variation")!.value!;
    }

    if(this.general.get("schedule_activity_impacted")!.value! != this.desviationCause?.schedule_activity_impacted){
      editado.schedule_activity_impacted = this.general.get("schedule_activity_impacted")!.value!;
    }

    if(this.general.get("proposed_solution")!.value! != this.desviationCause?.proposed_solution){
      editado.proposed_solution = this.general.get("proposed_solution")!.value!;
    }

    if(this.general.get("solution_state")!.value! != this.desviationCause?.solution_state?.id){
      editado.solution_state_id = this.general.get("solution_state")!.value!;
    }

   

    if(editado != {}){
      editado.user_updates_id = JSON.parse(localStorage.user).id;
      this._desviationCausesService.updateDesviationCausesId(editado, this.data.idCausal!)
      .subscribe( data =>{
        this.openSnackBar(true, "Cusal de desviación editada", "")
        this.emitClose.emit('close');
        }
      );
    }else{
      this.openSnackBar(true, "Nada que editar", "");
      this.emitClose.emit('close');
    }
    environment.consoleMessage(editado, ">>> EDITADO")
    
  }

  getMessageError(formGroup: FormGroup, field: string): string {
    let message!: string;
    if (formGroup.get(field)?.errors?.required) {
      message = `Campo ${this.labels[field]} es requerido`
    }
    if (formGroup.get(field)?.errors?.max) {
      message = `Máximo ${formGroup.get(field)?.errors?.max.max}`
    }
    if (formGroup.get(field)?.errors?.min) {
      message = `Mínimo ${formGroup.get(field)?.errors?.min.min}`
    }

    return message;
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

  onReset(){
    var controllers = Object.keys(this.labels);
    for (let index = 0; index < controllers.length; index++) {
      this.general.get(controllers[index])?.setValue(null);
    }
    this.causesIDs = [];
    this.causes = []
  }

}
