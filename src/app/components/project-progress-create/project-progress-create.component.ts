import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Project } from 'src/app/models/project';
import { AlertConfirmPassOverdueComponent } from './alert-dialog-pass-overdue/alert-dialog-pass-overdue.component';
import { AlertConfirmPassDeliveredComponent } from './alert-dialog-pass-delivered/alert-dialog-pass-delivered.component';
import { DeliveredEditComponent } from './delivered-edit/delivered-edit.component';
import { InProgressFormComponent } from './in-progress-form/in-progress-form.component';
import { OverdueFormComponent } from './overdue-form/overdue-form.component';
import { ValoremFormComponent } from './valorem-form/valorem-form.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tecno-project-progress-create',
  templateUrl: './project-progress-create.component.html',
  styleUrls: ['./project-progress-create.component.scss']
})
export class ProjectProgressCreateComponent implements OnInit {

  actions!: Actions;
  idRegEdit!: number;
  idEditProdDelivery!: number;
  idEditProdOverdue!: number;
  idEditProdInProgress!: number;
  idPassToOverdueProdInProgress!: number;
  flagModeProdDelivery: string = 'create';
  flagModeProdOverdue: string = 'create';
  flagModeProdInProgress: string = 'create';
  labels: any;
  label_visible: string;
  valorem!: Valorem;
  dataInitial!: DataInitial;
  dataProjectProgressReport!: any;
  dataDeliveryStatuses: any = {};
  project!: Project;
  isButtonReset: boolean = false;
  isButtonResetProdDelivery: boolean = false;
  isButtonResetProdInProgress: boolean = false;
  isButtonResetProdOverdue: boolean = false;
  showBtnClose: boolean = true;
  fButtonDisabled: boolean = false;
  fButtonDisabledProdDelivery: boolean = false;
  fButtonDisabledProdOverdue: boolean = false;
  fButtonDisabledProdInProgess: boolean = false;
  valoremGroup!: FormGroup;
  productDeliveryGroup!: FormGroup;
  productInProgressGroup!: FormGroup;
  productOverdueGroup!: FormGroup;
  pluralOption: string = "Reportes Valorem";
  singularOption: string = "Reporte Valorem";
  bttnStatus: string = "create";
  productsDelivered: ProductDelivered[] = [];
  productsToBeDelivered: ProductToBeDelivered[] = [];
  productsOverdue: ProductOverdue[] = [];
  items: Valorem[] = [];
  selectStatusValorem: ValoremState [] = [];
  selectScheduleValorem: ValoremSchedule [] = [];
  userID: any;
  profileID: any;

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
      dueDate: 'Fecha de Finalizaci??n',
      statusDetail: 'Detalle de Estado',
      labelBox: 'Detalle de Cronograma',
    },
    this.label_visible = '??Se visualiza en el reporte Valorem?'
  } 

  async ngOnInit(): Promise<void> {
    this.data.mode = 'create'
    this.bttnStatus = "create"
    this.flagModeProdDelivery = "create"
    this.flagModeProdOverdue = "create"
    this.flagModeProdInProgress = "create"

    this.userID = JSON.parse(localStorage.user).person_id;
    this.profileID = JSON.parse(localStorage.user).profile_id;

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

    this.productDeliveryGroup = this.fb.group({
      description: [null, Validators.required],
      date: [null, Validators.required],
      is_visible: [true, Validators.required]
    });

    this.productInProgressGroup = this.fb.group({
      description: [null, Validators.required],
      date: [null, Validators.required],
      cause_of_delay: [null],
      is_visible: true
    });

    this.productOverdueGroup = this.fb.group({
      description: [null, Validators.required],
      date: [null, Validators.required],
      cause_of_delay: [null, Validators.required],
      is_visible: true
    });
    
  }
  
  onSubmit() {
    if (!this.isButtonReset) {
      this.fButtonDisabled = true;
      this.fButtonDisabledProdDelivery = true;
      this.fButtonDisabledProdInProgess = true;
      this.fButtonDisabledProdOverdue = true;
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
  }

  onCancel() {
    this.onReset();
    this.data.mode = 'create'
  }

  getReports() {
    this.route.data.subscribe(project =>{
      this.project = project.projectProgressCreateResolver;
      this.valoremService.getValoremSelect()
        .subscribe((res: Valorem[]) => {
          this.items = res.filter((valorem) =>{
            return valorem.project?.id == this.project.id;
          })
          this.items.map(data => {
            data.start_date = this.getToStringDate(new Date(`${(data.start_date!).substring(0,10)}:00:00`));
            if (data.start_date != null && this.data.mode == 'create') {
              this.valoremGroup.get('start_date')?.setValue(new Date(`${(data.due_date!).substring(0,10)}:00:00`));
            }
            data.due_date = this.getToStringDate(new Date(`${(data.due_date!).substring(0,10)}:00:00`));
            
          });

          this.projectProgressReport.getDataInitial()
          .subscribe((data: DataInitial) => {
            this.dataInitial = data;

            this.projectProgressReport.getDataProjectProgressReport(this.project.strategic_guideline!.id)
              .subscribe((data: any) => {
                let filterReg:any = [];
                let dataAll:any = {}
                for (let index = 0; index < data.dataChart.length; index++) {
                  if(data.dataChart[index].projectName == this.project.title){ 
                    filterReg.push(data.dataChart[index]);
                  }                  
                }
                dataAll = {
                  strategicGuideline: data.strategicGuideline,
                  dataChart: filterReg
                }

                this.dataProjectProgressReport = this.getFormatData(dataAll);

                this.projectProgressReport.getDeliveryStatuses()
                  .subscribe((data: any) => {
                    this.productsDelivered = [];
                    this.productsOverdue = [];
                    this.productsToBeDelivered = [];
                    for (let index = 0; index < data.ecDeliveredProducts.length; index++) {
                      if(data.ecDeliveredProducts[index].project.id == this.project.id) {
                        data.ecDeliveredProducts.map((d:any) => d.date = this.getToStringDate(new Date(`${(d.date).substring(0,10)}:00:00`)));
                        this.productsDelivered.push(data.ecDeliveredProducts[index]);
                      }
                    }
                    for (let index = 0; index < data.ecOverdueProducts.length; index++) {
                      if(data.ecOverdueProducts[index].project.id == this.project.id) {
                        data.ecOverdueProducts.map((d:any) => d.date = this.getToStringDate(new Date(`${(d.date).substring(0,10)}:00:00`)));
                        this.productsOverdue.push(data.ecOverdueProducts[index]);
                      }
                    }
                    for (let index = 0; index < data.ecProductsInProgresses.length; index++) {
                      if(data.ecProductsInProgresses[index].project.id == this.project.id) {
                        data.ecProductsInProgresses.map((d:any) => d.date = this.getToStringDate(new Date(`${(d.date).substring(0,10)}:00:00`)));
                        this.productsToBeDelivered.push(data.ecProductsInProgresses[index]);
                      }
                    }
                  });
              });
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
    this.valorem = this.valoremGroup.value;
    this.valorem.project_id = this.project.id;
    this.valorem.external_company_id = 1;
    
    await this.valoremService.addValorem(this.valorem)
    .subscribe((res) => {
      this.fButtonDisabled = false;
      if (res != null) {
        this.openSnackBar(true, "Registro creado satisfactoriamente", "");
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
    this.valoremService.updateValoremId(this.valoremGroup.value, this.idRegEdit)
      .subscribe((res) => {
        this.fButtonDisabled = false;
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

    if (this.productDeliveryGroup.get(field)?.errors?.required) {
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
    let reg  = this.items.filter(v => v.id == id);
   
    const dialogRef = this.dialog.open(ValoremFormComponent, {
      width: environment.widthFormsModal,
      data: {
        valoremId: id,
        project_id: this.project.id,
        external_company_state_id: reg[0].external_company_state?.id,
        external_company_schedule_id: reg[0].external_company_schedule?.id,
        status_detail: reg[0].status_detail,
        label_box: reg[0].label_box,
        start_date: reg[0].start_date,
        due_date: reg[0].due_date,
        is_active: reg[0].is_active,
        mode: 'edit'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onReset();
        dialogRef.close();
        this.valoremService.getValoremSelect()
        .subscribe((res: Valorem[]) => {
          this.items = res.filter((valorem) =>{
            return valorem.project?.id == this.project.id;
          });
          this.items.map(data => {
            data.start_date = this.getToStringDate(new Date(`${(data.start_date!).substring(0,10)}:00:00`));
            if (data.start_date != null && this.data.mode == 'create') {
              this.valoremGroup.get('start_date')?.setValue(new Date(`${(data.due_date!).substring(0,10)}:00:00`));
            }
            data.due_date = this.getToStringDate(new Date(`${(data.due_date!).substring(0,10)}:00:00`));
            
          });
        });
      }
    });
  }

  deleteReg(id:any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmaci??n para eliminar registro",
        info: "??Est?? seguro que desea eliminar este registro?",
        value: this.items.filter(i => i.id == id)
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.valoremService.deleteValorem(id)
          .subscribe(res => {
            this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
            this.getReports();
            dialogRef.close();
          });
      } else {
        dialogRef.close();
      }
    });
  }

  onCreateDelivered() {
    const dialogRef = this.dialog.open(DeliveredEditComponent, {
      width: environment.widthFormsLittleModal,
      data: {
        project_id: this.project.id,
        mode: 'create'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create';
        dialogRef.close();
      }
    });
  }

  onCreateInProgress() {
    const dialogRef = this.dialog.open(InProgressFormComponent, {
      width: environment.widthFormsLittleModal,
      data: {
        project_id: this.project.id,
        mode: 'create'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create';
        dialogRef.close();
      }
    });
  }

  onCreateOverdue() {
    const dialogRef = this.dialog.open(OverdueFormComponent, {
      width: environment.widthFormsLittleModal,
      data: {
        project_id: this.project.id,
        mode: 'create'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create';
        dialogRef.close();
      }
    });
  }

  //Para Productos Entregados.........................
  onResetProdDelivery() {
    this.isButtonResetProdDelivery = true;
    this.productDeliveryGroup.patchValue({
      description: null,
      date: null,
      is_visible: true,
    });
  }

  editProductDelivery(id:any){
    let reg = this.productsDelivered.filter(pd => pd.id == id);

    const dialogRef = this.dialog.open(DeliveredEditComponent, {
      width: environment.widthFormsLittleModal,
      data: {
        idProduct: id,
        project_id: this.project.id,
        description: reg[0].description,
        date: reg[0].date,
        is_visible: reg[0].is_visible,
        mode: 'edit'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.onResetProdDelivery();
        this.flagModeProdInProgress = 'create';
        this.flagModeProdDelivery = 'create';
        dialogRef.close();
      }
    });
  }

  deleteProductDelivery(id:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmaci??n para eliminar registro",
        info: "??Est?? seguro que desea eliminar este registro?",
        value: this.items.filter(i => i.id == id)
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.productsDeliveredService.deleteProductDelivered(id)
          .subscribe(res => {
            this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
            this.onResetProdDelivery();
            this.getReports();
            this.flagModeProdDelivery = 'create'
            dialogRef.close();
          });
      } else {
        dialogRef.close();
      }
    });
  }

  onCancelProdDelivery() {
    this.onResetProdDelivery();
    this.flagModeProdDelivery = 'create'
  }

  createProdDelivery() {
    let productDelivery = this.productDeliveryGroup.value;
    productDelivery.project_id = this.project.id;
    productDelivery.external_company_id = 1;

    this.productsDeliveredService.addProductDelivered(productDelivery)
      .subscribe(res => {
        this.fButtonDisabledProdDelivery = false;
        if (res != null) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
          this.getReports();
          this.onResetProdDelivery();
        }
      });
  }

  updateProdDelivery() {
    let productDelivery = this.productDeliveryGroup.value;
    this.productsDeliveredService.updateProductDeliveredId(productDelivery, this.idEditProdDelivery)
    .subscribe((res) => {
      this.fButtonDisabledProdDelivery = false;
      if (res.length != 0) {
        this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
        this.getReports();
        this.onResetProdDelivery();
        this.flagModeProdDelivery = 'create'
      }
    });
  }  


  //Para Productos Atrasados.........................
  onResetProdOverdue() {
    this.isButtonResetProdOverdue = true;
    this.productOverdueGroup.patchValue({
      description: null,
      date: null,
      cause_of_delay: null,
      is_visible: true,
    });
  }

  editProdOverdue(id:any){
    let reg = this.productsOverdue.filter(pd => pd.id == id);

    const dialogRef = this.dialog.open(OverdueFormComponent, {
      width: environment.widthFormsLittleModal,
      data: {
        idProduct: id,
        project_id: this.project.id,
        description: reg[0].description,
        date: reg[0].date,
        cause_of_delay: reg[0].cause_of_delay,
        is_visible: reg[0].is_visible,
        mode: 'edit'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.onResetProdDelivery();
        this.flagModeProdInProgress = 'create';
        this.flagModeProdDelivery = 'create';
        dialogRef.close();
      }
    });    
  }

  deleteProdOverdue(id:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmaci??n para eliminar registro",
        info: "??Est?? seguro que desea eliminar este registro?",
        value: this.items.filter(i => i.id == id)
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.productsOverdueService.deleteProductOverdue(id)
          .subscribe(res => {
            this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
            this.onResetProdOverdue();
            this.getReports();
            this.flagModeProdOverdue = 'create'
            dialogRef.close();
          });
      } else {
        dialogRef.close();
      }
    });    
  }

  onCancelProdOverdue() {
    this.onResetProdOverdue();
    this.flagModeProdOverdue = 'create'
  }

  createProdOverdue() {
    let productOverdue = this.productOverdueGroup.value;
    productOverdue.project_id = this.project.id;
    productOverdue.external_company_id = 1;

    this.productsOverdueService.addProductOverdue(productOverdue)
      .subscribe(res => {
        this.fButtonDisabledProdInProgess = false;
        if (res != null) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
          this.getReports();
          this.onResetProdOverdue();
        }
      });
  }

  updateProdOverdue() {
    let productOverdue = this.productOverdueGroup.value;

    this.productsOverdueService.updateProductOverdueId(productOverdue, this.idEditProdOverdue)
    .subscribe((res) => {
      this.fButtonDisabledProdOverdue = false;
      if (res.length != 0) {
        this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
        this.getReports();
        this.onResetProdOverdue();
        this.flagModeProdOverdue = 'create'
      }
    });
  }

  //Para Productos Por Entregar.........................
  onResetProdInProgress() {
    this.isButtonResetProdInProgress = true;
    this.productInProgressGroup.patchValue({
      description: null,
      date: null,
      is_visible: true,
    });
  }

  editProdInProgress(id:any){
    let reg = this.productsToBeDelivered.filter(pd => pd.id == id);

    const dialogRef = this.dialog.open(InProgressFormComponent, {
      width: environment.widthFormsLittleModal,
      data: {
        idProduct: id,
        project_id: this.project.id,
        description: reg[0].description,
        date: reg[0].date,
        is_visible: reg[0].is_visible,
        mode: 'edit'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create';
        dialogRef.close();
      }
    });
  }

  deleteProdInProgress(id:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmaci??n para eliminar registro",
        info: "??Est?? seguro que desea eliminar este registro?",
        value: this.items.filter(i => i.id == id)
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.productsToBeDeliveredService.deleteProductToBeDelivered(id)
          .subscribe(res => {
            this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
            this.onResetProdInProgress();
            this.getReports();
            this.flagModeProdInProgress = 'create'
            dialogRef.close();
          });
      } else {
        dialogRef.close();
      }
    });
  }

  onCancelProdInProgress() {
    this.onResetProdInProgress();
    this.flagModeProdInProgress = 'create'
  }

  createProdInProgress() {
    let productInProgress = this.productInProgressGroup.value;
    productInProgress.project_id = this.project.id;
    productInProgress.external_company_id = 1;

    this.productsToBeDeliveredService.addProductToBeDelivered(productInProgress)
      .subscribe(res => {
        this.fButtonDisabledProdInProgess = false;
        if (res != null) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
          this.getReports();
          this.onResetProdInProgress();
        }
      });
  }

  updateProdInProgress() {
    let productInProgress = this.productInProgressGroup.value;

    this.productsToBeDeliveredService.updateProductToBeDeliveredId(productInProgress, this.idEditProdInProgress)
    .subscribe((res) => {
      this.fButtonDisabledProdInProgess = false;
      if (res.length != 0) {
        this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create'
      }
    });
  }

  passToDelivered(id:any) {
    this.flagModeProdInProgress = 'passToOverdue';
    this.idPassToOverdueProdInProgress = id;
    let reg = this.productsToBeDelivered.filter(pd => pd.id == id);

    const dialogRef = this.dialog.open(AlertConfirmPassDeliveredComponent, {
        width: '750px',
        data: {
          idProduct: id,
          project_id: this.project.id,
          description: reg[0].description,
          date: reg[0].date,
          is_visible: reg[0].is_visible
        }
    });
    dialogRef.componentInstance.emitClose.subscribe((data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create';
        dialogRef.close();
      }
    });
  }

  passToOverdue(id:any) {
    this.flagModeProdInProgress = 'passToOverdue';
    this.idPassToOverdueProdInProgress = id;
    let reg = this.productsToBeDelivered.filter(pd => pd.id == id);

    const dialogRef = this.dialog.open(AlertConfirmPassOverdueComponent, {
        width: '750px',
        data: {
          idProduct: id,
          project_id: this.project.id,
          description: reg[0].description,
          date: reg[0].date,
          is_visible: reg[0].is_visible
        }
      });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'close'){
        this.getReports();
        this.onResetProdInProgress();
        this.flagModeProdInProgress = 'create';
        dialogRef.close();
      }
    });
  }

  updateToOverdue(){
  }
  
  onCancelPassToOverdue() {
    this.onResetProdInProgress();
    this.flagModeProdInProgress = 'create'
  }
}