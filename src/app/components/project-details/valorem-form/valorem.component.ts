import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDelivered } from 'src/app/models/product-delivered';
import { ProductOverdue } from 'src/app/models/product-overdue';
import { ProductToBeDelivered } from 'src/app/models/product-to-be-delivered';
import { Valorem } from 'src/app/models/valorem';
import { ValoremSchedule } from 'src/app/models/valorem-schedule';
import { ValoremState } from 'src/app/models/valorem-state';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { ValoremSchedulesService } from 'src/app/services/valorem-schedules.service';
import { ValoremStatesService } from 'src/app/services/valorem-states.service';
import { ValoremService } from 'src/app/services/valorem.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  idValorem: number;
  idProject: number;
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

  selectStatusValorem: ValoremState [] = [];
  selectScheduleValorem: ValoremSchedule [] = [];
  
  fButtonDisabled: boolean = false;

  labels: any;

  valorem!: Valorem;
  productsDelivered: ProductDelivered[] = [];
  productsToBeDelivered: ProductToBeDelivered[] = [];
  productsOverdue: ProductOverdue[] = [];

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
      external_company_state_id: [null, Validators.required],
      external_company_schedule_id: [null, Validators.required],
      status_detail: [null, Validators.required],
      start_date: [null, Validators.required],
      due_date: [null, Validators.required],
      is_active: true
    });

    if (this.data.mode == 'edit') {
      environment.consoleMessage(this.data.idValorem);
      // Peticion del Formulario segun id del proyecto?
      this.valoremService.getValoremId(this.data.idValorem)
        .subscribe((res: Valorem) => {
          this.valorem = res;
          this.valoremGroup.patchValue({
            external_company_state_id: this.valorem.external_company_state_id,
            external_company_schedule_id: this.valorem.external_company_schedule_id,
            status_detail: this.valorem.status_detail,
            start_date: this.valorem.start_date,
            due_date: this.valorem.due_date,
            is_active: this.valorem.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.valoremGroup, "OnSubmit Valorem: ");
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
    this.isButtonReset = true;
    this.valoremGroup.patchValue({
      external_company_state_id: null,
      external_company_schedule_id: null,
      status_detail: null,
      start_date: null,
      due_date: null,
      is_active: true
    });
    this.productsDelivered = [];
    this.productsToBeDelivered = [];
    this.productsOverdue = [];
  }

  async createRegister() {
    environment.consoleMessage(this.valoremGroup)
    this.valoremGroup.setValue({
      external_company_state_id: this.valoremGroup.value.external_company_state_id,
      external_company_schedule_id: this.valoremGroup.value.external_company_schedule_id,
      status_detail: this.valoremGroup.value.status_detail,
      start_date: this.getToStringDate(this.valoremGroup.value.start_date),
      due_date: this.getToStringDate(this.valoremGroup.value.due_date),
      is_active: this.valoremGroup.value.is_active,
    });
    
    this.valorem = this.valoremGroup.value;
    this.valorem.project_id = this.data.idProject;
    this.valorem.external_company_id = 1;
    
    environment.consoleMessage(this.valorem, "VALOREM");

    await this.valoremService.addValorem(this.valorem)
    .subscribe((res) => {
      environment.consoleMessage(res, "<<<<<<<<>>>>>>");
      this.fButtonDisabled = false;
      if (res != null) {
        this.openSnackBar(true, "Registro creado satisfactoriamente", "");
        var id = res.id;

        this.productsDelivered.map(data => {data.external_company_tracing_id = id});
        this.productsToBeDelivered.map(data => {data.external_company_tracing_id = id});
        this.productsOverdue.map(data => {data.external_company_tracing_id = id});
        
        var main_tables: any = {
          e_c_delivered_products: this.productsDelivered,
          e_c_products_in_progresses: this.productsToBeDelivered,
          e_c_overdue_products: this.productsOverdue
        };

        environment.consoleMessage(main_tables, "MAIN TABLE: ");

        this.valoremService.addProductsDetails(main_tables)
          .subscribe((res) => {
            environment.consoleMessage(res, "Registro Productos Creado: ");
          })
        
        this.valoremService.emitClose.subscribe((res: any) => {
          this.dialog.closeAll();
        })
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
    });
  }

  updateRegister() {
    environment.consoleMessage(this.valoremGroup, `updateRegister para registro con id ${this.data.idValorem}: `);

    this.valoremService.updateValoremId(
      this.valoremGroup.value,
      this.data.idValorem
    )
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'updated') {
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
          environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  onClickSelectStatusValorem(ev: boolean) {
    if(ev){
      environment.consoleMessage("", "Cargar info de Status");
      this.getSelectStatusValorem();
    }
  }

  onClickSelectScheduleValorem() {
    environment.consoleMessage("", "Cargar info de Schedules");
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

  onProductDelivered(productDelivered: ProductDelivered[]){
    this.productsDelivered = productDelivered;
    environment.consoleMessage(this.productsDelivered, "Productos Entregados Padre")
  }

  onProductToBeDelivered(productToBeDelivered: ProductToBeDelivered[]){
    this.productsToBeDelivered = productToBeDelivered;
    environment.consoleMessage(this.productsToBeDelivered, "Productos Por Entregar Padre")
  }

  onProductOverdue(productOverdue: ProductOverdue[]){
    this.productsOverdue = productOverdue;
    environment.consoleMessage(this.productsOverdue, "Productos Atrasados Padre")
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

  getToStringDate(date: Date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

}
