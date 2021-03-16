import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DelayCause } from 'src/app/models/delay-cause';
import { DelaySource } from 'src/app/models/delay-source';
import { DelayTypification } from 'src/app/models/delay-typification';
import { DesviationCause } from 'src/app/models/desviation-cause';
import { SolutionState } from 'src/app/models/solution-state';
import { DesviationCausesService } from 'src/app/services/desviation-causes.service';

export interface DialogData {
  idProject: number;
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

  constructor(
    private snackBar: MatSnackBar,
    private _fbG: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public datepipe: DatePipe,
    private _desviationCausesService: DesviationCausesService,
  ) { }

  ngOnInit(): void {
    this.general = this._fbG.group({
      'date': [null, [Validators.required]],
      'deliverable': [null, [Validators.required]],

      'source': [null, [Validators.required]],
      'cause': [null, [Validators.required]],
      'delay_typification': [null, [Validators.required]],
      'cause_delay': [null, [Validators.required]],

      'impacts_critical_path': [null, [Validators.required]],
      'impacts_time': [null, [Validators.required, Validators.min(10)]],
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
      impacts_time: `Causa de atraso`,
      cost_variation: `Variación de costos`,
      schedule_activity_impacted: `Actividad cronograma impactada`,

      proposed_solution: `Solución Propuesta`,
      solution_state: `Estado de la solución`,
    }
  }

  _openSources(ev: boolean) {
    if (ev) {
      // this._stagesService.getStagesSelect()
      //   .subscribe((stages: Stage[]) => this.stages = stages);
    }
  }

  _openCauses(ev: boolean) {
    if (ev) {
      // this._stagesService.getStagesSelect()
      //   .subscribe((stages: Stage[]) => this.stages = stages);
    }
  }

  _openDelayTypification(ev: boolean) {
    if (ev) {
      // this._stagesService.getStagesSelect()
      //   .subscribe((stages: Stage[]) => this.stages = stages);
    }
  }

  _openSolutionState(ev: boolean) {
    if (ev) {
      // this._stagesService.getStagesSelect()
      //   .subscribe((stages: Stage[]) => this.stages = stages);
    }
  }

  async crear(){
    true; //environment.consoleMessage("crear")
    var desviation: DesviationCause = {
      project_id: this.data.idProject,
      date: this.parseDate(this.general.get('date')!.value),
      deliverable: this.general.get('deliverable')!.value,

      delay_cause_by_sources_id: this.delay_cause_by_sources_id,
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
      this.openSnackBar(true, "Seguimiento creado", "");
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
    var controllers = Object.keys(this.general);
    for (let index = 0; index < controllers.length; index++) {
      this.general.get(controllers[index])?.setValue(null);
    }
  }

}
