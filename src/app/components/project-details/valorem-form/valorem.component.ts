import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Valorem } from 'src/app/models/valorem';
import { ValoremSchedule } from 'src/app/models/valorem-schedule';
import { ValoremState } from 'src/app/models/valorem-state';
import { ValoremSchedulesService } from 'src/app/services/valorem-schedules.service';
import { ValoremStatesService } from 'src/app/services/valorem-states.service';
import { ValoremService } from 'src/app/services/valorem.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-valorem-form',
  templateUrl: './valorem.component.html',
  styleUrls: ['./valorem.component.scss']
})
export class ValoremFormComponent implements OnInit {
  showBtnClose: boolean = true;
  
  valoremGroup!: FormGroup;
  pluralOption: string = "Reportes Valorem";
  singularOption: string = "Reporte Valorem";
  isButtonReset: boolean = false;

  selectStatusValorem!: ValoremState [];
  selectScheduleValorem!: ValoremSchedule [];
  
  fButtonDisabled: boolean = false;

  valorem!: Valorem;

  labels: any;
  productDelivered: string[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private valoremService: ValoremService,
    private valoremStatesService: ValoremStatesService,
    private valoremSchedulesService: ValoremSchedulesService,
    private snackBar: MatSnackBar,
  ) { 
    this.labels = {
      startDate: 'Fecha de Inicio',
      dueDate: 'Fecha de Finalización',
      statusDetail: 'Detalle de Estado',
    }
  } 

  async ngOnInit(): Promise<void> { 
    environment.consoleMessage(this.data, "++++++++++");
    this.valoremGroup = this.fb.group({
      valorem_state_id: [null, Validators.required],
      valorem_schedule_id: [null, Validators.required],
      status_details: [null, Validators.required],
      start_date: [null, Validators.required],
      due_date: [null, Validators.required],
      is_active: true
    });
  }
  
  onSubmit() {
    environment.consoleMessage(this.valoremGroup, "OnSubmit compañias: ");
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
    
  }

  createRegister() {
    
  }

  updateRegister() {
    
  }

  onClickSelectStatusValorem() {
    
  }

  onClickSelectScheduleValorem() {
    
  }

  getSelectStatusValorem() {
    
  }

  getSelectScheduleValorem() {
    
  }

  onProductDelivered(productDelivered: string[]){
    this.productDelivered = productDelivered;
    environment.consoleMessage(this.productDelivered, "Productos Entregados Padre")
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

    if (this.valoremGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
