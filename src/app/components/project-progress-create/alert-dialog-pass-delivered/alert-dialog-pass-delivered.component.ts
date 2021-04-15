import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsDeliveredService } from 'src/app/services/products-delivered.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { environment } from 'src/environments/environment';

// MODELS
import { AlertDialog } from '../../../models/alert-dialog';

@Component({
  selector: 'tecno-alert-confirm-pass-delivered',
  templateUrl: './alert-dialog-pass-delivered.component.html',
  styleUrls: ['./alert-dialog-pass-delivered.component.scss']
})
export class AlertConfirmPassDeliveredComponent {
  productInProgressGroup!: FormGroup;
  infoProduct: any;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public dialogRef: MatDialogRef<AlertConfirmPassDeliveredComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialog,
    private productsToBeDeliveredService:ProductsToBeDeliveredService,
    private productsDeliveredService:ProductsDeliveredService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    environment.consoleMessage(this.data, "DATAAAAAAAAAAAAA");
    this.infoProduct = this.data;
  }

  onSiClick() {
    let delivered: any = {
      project_id: this.infoProduct.project_id,
      external_company_id: 1,
      description: this.infoProduct.description,
      date: this.infoProduct.date,
      is_visible: this.infoProduct.is_visible
    }
    this.productsDeliveredService.addProductDelivered(delivered)
      .subscribe(delivered => {
        this.productsToBeDeliveredService.deleteProductToBeDelivered(this.infoProduct.idProduct)
          .subscribe(toBeDelivered =>{
            if(delivered != null) {
              this.openSnackBar(true, "El producto se ha registrado como entregado", "");
              this.emitClose.emit('close');
            }
          })
      }
      ,(err) => {
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }
  
        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
          true;//environment.consoleMessage(err, "Error: ");
        })
  
        this.openSnackBar(false, "Ya existe un registro en Productos Entregados con esta descripción", "");
      });
  }

  onNoClick(): void {
    this.emitClose.emit('close');
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
