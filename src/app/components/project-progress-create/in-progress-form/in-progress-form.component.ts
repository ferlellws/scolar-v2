import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { runInThisContext } from 'node:vm';
import { AlertDialog } from 'src/app/models/alert-dialog';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-in-progress-form',
  templateUrl: './in-progress-form.component.html',
  styleUrls: ['./in-progress-form.component.scss']
})
export class InProgressFormComponent implements OnInit {

  flagModeProdInProgress: string = 'create';
  productInProgressGroup!: FormGroup;
  label_visible!: string;
  idEditProdInProgress!: number;
  isButtonResetProdInProgress: boolean = false;
  fButtonDisabledProdInProgress: boolean = false;
  infoProduct: any;
  labelTitle!: string;

  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private productsToBeDeliveredService: ProductsToBeDeliveredService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialog,
  ) {
    this.label_visible = '¿Se visualiza en el reporte Valorem?'
   }

  ngOnInit(): void {
    this.infoProduct = this.data;
    this.flagModeProdInProgress = this.infoProduct.mode;
    if(this.flagModeProdInProgress == 'create') {
      this.labelTitle = "Agregar nuevo producto por entregar"
    } else{
      this.labelTitle = "Editar producto por entregar"
    }

    if (this.flagModeProdInProgress == 'create') {
      this.productInProgressGroup = this.fb.group({
        description: [null, Validators.required],
        date: [null, Validators.required],
        is_visible: [true, Validators.required]
      });
    } else {
      this.productInProgressGroup = this.fb.group({
        description: [this.infoProduct.description, Validators.required],
        date: [new Date(this.infoProduct.date + ":00:00"), Validators.required],
        is_visible: [this.infoProduct.is_visible, Validators.required]
      });
    }
  }

  getMessageError(field: string, labelField: string): string {
    let message!: string;
    message = `Campo ${labelField} es requerido`
    return message;
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

  onResetProdInProgress() {
    this.isButtonResetProdInProgress = true;
    this.productInProgressGroup.patchValue({
      description: null,
      date: null,
      is_visible: true,
    });
  }

  onCancelProdInProgress() {
    this.onResetProdInProgress();
    this.flagModeProdInProgress = 'create'
    this.emitClose.emit('close');
  }

  createProdInProgress() {
    let productInProgress = this.productInProgressGroup.value;
    productInProgress.project_id = this.infoProduct.project_id;
    productInProgress.external_company_id = 1;
    environment.consoleMessage(productInProgress, "Obj Prod InProgress");

    this.productsToBeDeliveredService.addProductToBeDelivered(productInProgress)
      .subscribe(res => {
        this.fButtonDisabledProdInProgress = false;
        if (res != null) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
        }
      });
    this.emitClose.emit('close');
  }

  updateProdInProgress() {
    let productInProgress = this.productInProgressGroup.value;

    this.productsToBeDeliveredService.updateProductToBeDeliveredId(productInProgress, this.infoProduct.idProduct)
    .subscribe((res) => {
      this.fButtonDisabledProdInProgress = false;
      if (res.length != 0) {
        this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
      }
    });
    this.emitClose.emit('close');
  }
}
