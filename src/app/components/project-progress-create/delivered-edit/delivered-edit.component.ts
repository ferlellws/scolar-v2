import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { runInThisContext } from 'node:vm';
import { AlertDialog } from 'src/app/models/alert-dialog';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-delivered-edit',
  templateUrl: './delivered-edit.component.html',
  styleUrls: ['./delivered-edit.component.scss']
})
export class DeliveredEditComponent implements OnInit {

  flagModeProdDelivery: string = 'create';
  productDeliveryGroup!: FormGroup;
  label_visible: string;
  idEditProdDelivery!: number;
  isButtonResetProdDelivery: boolean = false;
  fButtonDisabledProdDelivery: boolean = false;
  infoProduct: any;
  labelTitle!: string;
  
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private fb: FormBuilder,
    private productsDeliveredService: ProductsDeliveredService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialog,
  ) {
    this.label_visible = '¿Se visualiza en el reporte Valorem?'
   }

  ngOnInit(): void {
    this.infoProduct = this.data;
    this.flagModeProdDelivery = this.infoProduct.mode;
    if(this.flagModeProdDelivery == 'create') {
      this.labelTitle = "Agregar nuevo producto entregado"
    } else{
      this.labelTitle = "Editar producto entregado"
    }

    if (this.flagModeProdDelivery == 'create') {
      this.productDeliveryGroup = this.fb.group({
        description: [null, Validators.required],
        date: [null, Validators.required],
        is_visible: [true, Validators.required]
      });
    } else {
      this.productDeliveryGroup = this.fb.group({
        description: [this.infoProduct.description, Validators.required],
        date: [new Date(this.infoProduct.date + ":00:00"), Validators.required],
        is_visible: [this.infoProduct.is_visible, Validators.required]
      });
    }
  }

  onClickCancel(): void {
    this.emitClose.emit('close');
  }

  getMessageError(field: string, labelField: string): string {
    let message!: string;
    message = `Campo ${labelField} es requerido`
    return message;
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

  onCancelProdDelivery() {
    this.onResetProdDelivery();
    this.flagModeProdDelivery = 'create'
    this.emitClose.emit('close');
  }

  createProdDelivery() {
    let productDelivery = this.productDeliveryGroup.value;
    productDelivery.project_id = this.infoProduct.project_id;
    productDelivery.external_company_id = 1;
    environment.consoleMessage(productDelivery, "Obj Prod Delivery");

    this.productsDeliveredService.addProductDelivered(productDelivery)
      .subscribe(res => {
        this.fButtonDisabledProdDelivery = false;
        if (res != null) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
          this.emitClose.emit('close');
        }
      },(err) => {
        this.fButtonDisabledProdDelivery = false;
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

  updateProdDelivery() {
    let productDelivery = this.productDeliveryGroup.value;
    this.productsDeliveredService.updateProductDeliveredId(productDelivery, this.infoProduct.idProduct)
    .subscribe((res) => {
      this.fButtonDisabledProdDelivery = false;
      if (res.length != 0) {
        this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
        this.emitClose.emit('close');
      }
    },(err) => {
      this.fButtonDisabledProdDelivery = false;
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
}
