import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface DialogData {
  idValorem: number;
  idProject: number;
  mode: string;
  labelAction: string;
}

export interface Indicator {
  balance: number;
  name: string;
  color: string;
}

@Component({
  selector: 'tecno-week-form',
  templateUrl: './week-form.component.html',
  styleUrls: ['./week-form.component.scss']
})
export class WeekFormComponent implements OnInit {

  @Output() emitClose: EventEmitter<string> = new EventEmitter();

  isButtonReset: boolean = false;
  pluralOption: string = "Seguimientos Semanales";
  singularOption: string = "Seguimiento Semanal";
  fButtonDisabled: boolean = false;
  showBtnClose: boolean = true;
  labels: any;
  indicator: Indicator | null = null;

  general!: FormGroup;

  goals: any[] = [];
  nextActivities: any[] = [];
  observations: string[] = []

  constructor(
    private _fbG: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.general = this._fbG.group({
      'start_date': [null, [Validators.required]],
      'end_date': [null, [Validators.required]],
      'advance_spected': [null, [Validators.required, Validators.max(100), Validators.min(0)]],
      'advance_real': [null, [Validators.required, Validators.max(100), Validators.min(0)]],
    });

    this.labels = {
      start_date: `Fecha de inicio`,
      end_date: `Fecha de finalización`,
      advance_spected: 'Avance esperado',
      advance_real: 'Avance real',
    }

  }

  ngOnInit(): void {
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

  changeAdvance(){
    if(this.general.get('advance_spected')!.value != null && this.general.get('advance_real')!.value != null){
      var diferencia: number = this.general.get('advance_spected')!.value - this.general.get('advance_real')!.value;
      diferencia < 0 ? diferencia = diferencia * (-1): true;
      if(diferencia >= 0 &&  diferencia <= 5){
        this.indicator = {
          balance: diferencia,
          color: '#8BC34A',
          name: 'Bajo'
        }
      } else if(diferencia > 5 &&  diferencia <= 9){
        this.indicator = {
          balance: diferencia,
          color: '#FFEB3B',
          name: 'Medio'
        }
      } else if(diferencia > 9 ){
        this.indicator = {
          balance: diferencia,
          color: '#FF5722',
          name: 'Alto'
        }
      }
    }else{
      this.indicator = null;
    }
    environment.consoleMessage("entre", "changeAdvance")
  }

  onGoal(data: any){
    environment.consoleMessage(data, "OnGoals");
  }
  onObservations(data: any){
    environment.consoleMessage(data, "onObservation");
  }
  onNextActivities(data: any){
    environment.consoleMessage(data, "onNextActivities");
  }

}
