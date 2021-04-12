import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { env } from 'node:process';
import { Actions } from 'src/app/models/actions';
import { ProductDelivered } from 'src/app/models/product-delivered';
import { ProductOverdue } from 'src/app/models/product-overdue';
import { ProductToBeDelivered } from 'src/app/models/product-to-be-delivered';
import { Valorem } from 'src/app/models/valorem';
import { ValoremSchedule } from 'src/app/models/valorem-schedule';
import { ValoremState } from 'src/app/models/valorem-state';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { ProjectProgressReportService, DataInitial } from 'src/app/services/project-progress-report.service';
import { ValoremSchedulesService } from 'src/app/services/valorem-schedules.service';
import { ValoremStatesService } from 'src/app/services/valorem-states.service';
import { ValoremService } from 'src/app/services/valorem.service';
import { environment } from 'src/environments/environment';
import { DialogData } from '../applications/applications-form/applications-form.component';
import { ProjectProgressReport } from 'src/app/models/project-progress-report';

@Component({
  selector: 'tecno-project-progress-create',
  templateUrl: './project-progress-create.component.html',
  styleUrls: ['./project-progress-create.component.scss']
})
export class ProjectProgressCreateComponent implements OnInit {

  actions!: Actions;
  bttnStatus: string = "create";
  idRegEdit: any;
  
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

  items: Valorem[] = [];

  @Output() emitClose: EventEmitter<string> = new EventEmitter();

  dataInitial!: DataInitial;
  dataProjectProgressReport!: any;

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
    }
  } 

  async ngOnInit(): Promise<void> {
    this.data.mode = 'create'
    this.bttnStatus = "create"

    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    
    this.getReports();

    this.valoremGroup = this.fb.group({
      external_company_state_id: [null, Validators.required],
      external_company_schedule_id: [null, Validators.required],
      status_detail: [null, Validators.required],
      label_box: [null],
      start_date: [null, Validators.required],
      due_date: [null, Validators.required],
      is_active: true
    });
  }
  
  onSubmit() {
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
      label_box: null,
      start_date: null,
      due_date: null,
      is_active: true
    });
    this.productsDelivered = [];
    this.productsToBeDelivered = [];
    this.productsOverdue = [];
  }

  onCancel() {
    this.onReset();
    this.data.mode = 'create'
  }

  getReports() {
    this.valoremService.getValoremSelect()
      .subscribe((res: Valorem[]) => {
        this.items = res.filter((valorem) =>{
          return valorem.project?.id == 2;
        })
        this.items.map(data => {
          data.start_date = this.getToStringDate(new Date(`${(data.start_date!).substring(0,10)}:00:00`));
          data.due_date = this.getToStringDate(new Date(`${(data.due_date!).substring(0,10)}:00:00`));
          if (data.start_date != null) {
            this.valoremGroup.get('due_date')?.setValue(data.due_date);
          }
        });

        this.projectProgressReport.getDataInitial()
        .subscribe((data: DataInitial) => {
          this.dataInitial = data;

          this.projectProgressReport.getDataProjectProgressReportByProjectId(this.dataInitial.strategicGuidelines[0].id)
            .subscribe((data: ProjectProgressReport) => {
              this.dataProjectProgressReport = this.getFormatData(data);
              environment.consoleMessage(this.dataProjectProgressReport, "DATAAAAAA");
            });
        });

      });
  }

  getFormatData(dataReport: ProjectProgressReport): any {
    let dataTable: any;

    dataTable = {
      strategicGuideline: dataReport.strategicGuideline,
      dataChart: []
    }
    dataReport.dataChart.forEach((data: any) => {
      dataTable.dataChart.push([
        data.projectName,
        data.textBox,
        data.color,
        data.statusDetail == "" ? null : `<div style='margin: 10px; font-size: 1.2em;'><strong>Detalle de Estado: </strong> ${data.statusDetail} </div>`,
        new Date(data.startDate.year, data.startDate.month, data.startDate.day),
        new Date(data.dueDate.year, data.dueDate.month, data.dueDate.day)
      ])

    });
    return dataTable;
  }

  async createRegister() {
    this.valoremGroup.setValue({
      external_company_state_id: this.valoremGroup.value.external_company_state_id,
      external_company_schedule_id: this.valoremGroup.value.external_company_schedule_id,
      status_detail: this.valoremGroup.value.status_detail,
      label_box: this.valoremGroup.value.label_box,
      start_date: this.getToStringDate(this.valoremGroup.value.start_date),
      due_date: this.getToStringDate(this.valoremGroup.value.due_date),
      is_active: this.valoremGroup.value.is_active,
    });
    
    this.valorem = this.valoremGroup.value;
    this.valorem.project_id = 2;
    this.valorem.external_company_id = 1;
    
    await this.valoremService.addValorem(this.valorem)
    .subscribe((res) => {
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

        this.valoremService.addProductsDetails(main_tables)
          .subscribe((res) => {
            true;
          })

        this.getReports();
        this.onReset();
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
    });
  }

  updateRegister() {
    environment.consoleMessage("EDIIIIIIIIIIIIIIIIIIIT");
    this.valoremService.updateValoremId(this.valoremGroup.value, this.idRegEdit)
      .subscribe((res) => {
        this.fButtonDisabled = false;
        environment.consoleMessage(res, "RESSSSSSSSSSSSSSSS");
        if (res.length != 0) {
          this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");

          this.getReports();
          this.onReset();
          this.data.mode = 'create'
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

  onProductDelivered(productDelivered: ProductDelivered[]){
    this.productsDelivered = productDelivered;
  }

  onProductToBeDelivered(productToBeDelivered: ProductToBeDelivered[]){
    this.productsToBeDelivered = productToBeDelivered;
  }

  onProductOverdue(productOverdue: ProductOverdue[]){
    this.productsOverdue = productOverdue;
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


  editReg(id:any) {
    this.idRegEdit = id;
    this.data.mode = 'edit'
    let reg  = this.items.filter(v => v.id == id)

    this.valoremStatesService.getValoremStatesSelect()
      .subscribe((res: ValoremState []) => {
        this.selectStatusValorem = res
        this.valoremGroup.get('external_company_state_id')?.setValue(reg[0].external_company_state?.id);
      });
    
    this.valoremSchedulesService.getValoremSchedulesSelect()
      .subscribe((res: ValoremSchedule []) => {
        this.selectScheduleValorem = res
        this.valoremGroup.get('external_company_schedule_id')?.setValue(reg[0].external_company_schedule?.id);
      });
    
    this.valoremGroup.get('start_date')?.setValue(new Date(reg[0].start_date + ":00:00"));
    this.valoremGroup.get('due_date')?.setValue(new Date(reg[0].due_date + ":00:00"));
    this.valoremGroup.get('status_detail')?.setValue(reg[0].status_detail);
    this.valoremGroup.get('label_box')?.setValue(reg[0].label_box);
  }

  deleteReg(id:any) {
    environment.consoleMessage(id, "ID DELETE");
    this.valoremService.deleteValorem(id)
      .subscribe(res => {
        this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
        this.getReports();
      });
  }

  
}
