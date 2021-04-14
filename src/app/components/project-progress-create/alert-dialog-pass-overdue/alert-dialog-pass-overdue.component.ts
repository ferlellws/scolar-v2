import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { ProductsToBeDeliveredService } from 'src/app/services/products-to-be-delivered.service';
import { environment } from 'src/environments/environment';

// MODELS
import { AlertDialog } from '../../../models/alert-dialog';

@Component({
  selector: 'tecno-alert-pass-overdue-confirm',
  templateUrl: './alert-dialog-pass-overdue.component.html',
  styleUrls: ['./alert-dialog-pass-overdue.component.scss']
})
export class AlertConfirmPassOverdueComponent {
  productInProgressGroup!: FormGroup;
  infoProduct: any;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public dialogRef: MatDialogRef<AlertConfirmPassOverdueComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialog,
    private productsToBeDeliveredService: ProductsToBeDeliveredService,
    private productsOverdueService: ProductsOverdueService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    environment.consoleMessage(this.data, "DATAAAAAAAAAAAAA");
    this.infoProduct = this.data;

    this.productInProgressGroup = this.fb.group({
      cause_of_delay: [null, Validators.required],
      is_visible: true
    });
  }

  onSiClick() {
    let overdue: any = {
      project_id: this.infoProduct.project_id,
      external_company_id: 1,
      description: this.infoProduct.description,
      date: this.infoProduct.date,
      cause_of_delay: this.productInProgressGroup.get('cause_of_delay')?.value,
      is_visible: this.infoProduct.is_visible
    }
    this.productsOverdueService.addProductOverdue(overdue)
      .subscribe(res =>{
        this.productsToBeDeliveredService.deleteProductToBeDelivered(this.infoProduct.idProduct)
          .subscribe(toBeDelivered =>{
            if(res != null) {
              this.openSnackBar(true, "El producto se ha registrado como atraado", "");
            }
          })
      })
    this.emitClose.emit('close');
  }

  onNoClick(): void {
    this.emitClose.emit('close');
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
}
