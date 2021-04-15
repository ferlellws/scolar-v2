import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialog } from 'src/app/models/alert-dialog';
import { Valorem } from 'src/app/models/valorem';
import { ValoremSchedule } from 'src/app/models/valorem-schedule';
import { ValoremState } from 'src/app/models/valorem-state';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { ProjectProgressReportService } from 'src/app/services/project-progress-report.service';
import { ValoremSchedulesService } from 'src/app/services/valorem-schedules.service';
import { ValoremStatesService } from 'src/app/services/valorem-states.service';
import { ValoremService } from 'src/app/services/valorem.service';
import { environment } from 'src/environments/environment';
import { DialogData } from '../../applications/applications-form/applications-form.component';

@Component({
  selector: 'tecno-valorem-form',
  templateUrl: './valorem-form.component.html',
  styleUrls: ['./valorem-form.component.scss']
})
export class ValoremFormComponent implements OnInit {

  idRegEdit!: number;
  labels: any;
  label_visible: string;
  valorem!: Valorem;
  isButtonReset: boolean = false;
  showBtnClose: boolean = true;
  fButtonDisabled: boolean = false;
  valoremGroup!: FormGroup;
  pluralOption: string = "Reportes Valorem";
  singularOption: string = "Reporte Valorem";
  bttnStatus: string = "create";
  items: Valorem[] = [];
  selectStatusValorem: ValoremState [] = [];
  selectScheduleValorem: ValoremSchedule [] = [];
  infoValorem!: any;
  
  @Output() emitClose: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private valoremService: ValoremService,
    private valoremStatesService: ValoremStatesService,
    private valoremSchedulesService: ValoremSchedulesService,
    private productsDeliveredService: ProductsDeliveredService,
    private productsToBeDeliveredService: ProductsToBeDeliveredService,
    private productsOverdueService: ProductsOverdueService,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private projectProgressReport: ProjectProgressReportService,
  ) {
    this.labels = {
      startDate: 'Fecha de Inicio',
      dueDate: 'Fecha de Finalización',
      statusDetail: 'Detalle de Estado',
      labelBox: 'Detalle de Cronograma',
    },
    this.label_visible = '¿Se visualiza en el reporte Valorem?'
  }

  ngOnInit(): void {
    this.infoValorem = this.data;
    environment.consoleMessage(this.infoValorem, "<<<<<<<<<<<<<<<<<<<<")
    this.data.mode = 'edit'
    this.bttnStatus = "edit"

    this.valoremGroup = this.fb.group({
      external_company_state_id: [null, Validators.required],
      external_company_schedule_id: [null, Validators.required],
      status_detail: [null, Validators.required],
      label_box: [null],
      start_date: [null, Validators.required],
      due_date: [null, Validators.required],
      is_active: this.infoValorem.is_active
    });

    this.valoremStatesService.getValoremStatesSelect()
      .subscribe((res: ValoremState []) => {
        this.selectStatusValorem = res
        this.valoremGroup.get('external_company_state_id')?.setValue(this.infoValorem.external_company_state_id);
      });
    
    this.valoremSchedulesService.getValoremSchedulesSelect()
      .subscribe((res: ValoremSchedule []) => {
        this.selectScheduleValorem = res
        this.valoremGroup.get('external_company_schedule_id')?.setValue(this.infoValorem.external_company_schedule_id);
      });
    

    this.valoremGroup.get('start_date')?.setValue(new Date(this.infoValorem.start_date + ":00:00"));
    this.valoremGroup.get('due_date')?.setValue(new Date(this.infoValorem.due_date + ":00:00"));
    this.valoremGroup.get('status_detail')?.setValue(this.infoValorem.status_detail);
    this.valoremGroup.get('label_box')?.setValue(this.infoValorem.label_box);
  }

  onReset() {
    this.isButtonReset = true;
    this.valoremGroup.patchValue({
      external_company_state_id: null,
      external_company_schedule_id: null,
      status_detail: null,
      label_box: null,
      start_date: null,
      due_date: null,
      is_active: true
    });
  }

  onCancel() {
    this.onReset();
    this.emitClose.emit('close');
  }

  updateRegister() {
    this.valoremService.updateValoremId(this.valoremGroup.value, this.infoValorem.valoremId)
      .subscribe((res) => {
        this.fButtonDisabled = false;
        if (res.length != 0) {
          this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
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
    this.emitClose.emit('close');
  }

  onClickSelectStatusValorem(ev: boolean) {
    if(ev){
      this.getSelectStatusValorem();
    }
  }

  onClickSelectScheduleValorem() {
    this.getSelectScheduleValorem();
  }

  getSelectStatusValorem() {
    this.valoremStatesService.getValoremStatesSelect()
      .subscribe((res: ValoremState []) => this.selectStatusValorem = res);
  }

  getSelectScheduleValorem() {
    this.valoremSchedulesService.getValoremSchedulesSelect()
      .subscribe((res: ValoremSchedule []) => this.selectScheduleValorem = res);
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
    message = `Campo ${labelField} es requerido`
    return message;
  }

  getToStringDate(date: any): string {
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

}
