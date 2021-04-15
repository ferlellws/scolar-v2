import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialog } from 'src/app/models/alert-dialog';
import { ProductsOverdueService } from 'src/app/services/products-overdue.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-overdue-form',
  templateUrl: './overdue-form.component.html',
  styleUrls: ['./overdue-form.component.scss']
})
export class OverdueFormComponent implements OnInit {

  flagModeProdOverdue: string = 'create';
  productOverdueGroup!: FormGroup;
  label_visible!: string;
  idEditProdOverdue!: number;
  isButtonResetProdOverdue: boolean = false;
  fButtonDisabledProdOverdue: boolean = false;
  infoProduct: any;
  labelTitle!: string;

  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private productsOverdueService: ProductsOverdueService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialog,
  ) {
    this.label_visible = '¿Se visualiza en el reporte Valorem?'
   }

  ngOnInit(): void {
    this.infoProduct = this.data;
    this.flagModeProdOverdue = this.infoProduct.mode;
    if(this.flagModeProdOverdue == 'create') {
      this.labelTitle = "Agregar nuevo producto atrasado"
    } else{
      this.labelTitle = "Editar producto atrasado"
    }

    if (this.flagModeProdOverdue == 'create') {
      this.productOverdueGroup = this.fb.group({
        description: [null, Validators.required],
        date: [null, Validators.required],
        cause_of_delay: [null, Validators.required],
        is_visible: [true, Validators.required]
      });
    } else {
      this.productOverdueGroup = this.fb.group({
        description: [this.infoProduct.description, Validators.required],
        date: [new Date(this.infoProduct.date + ":00:00"), Validators.required],
        cause_of_delay: [this.infoProduct.cause_of_delay, Validators.required],
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

  onResetProdOverdue() {
    this.isButtonResetProdOverdue = true;
    this.productOverdueGroup.patchValue({
      description: null,
      date: null,
      cause_of_delay: null,
      is_visible: true,
    });
  }

  onCancelProdOverdue() {
    this.onResetProdOverdue();
    this.flagModeProdOverdue = 'create'
    this.emitClose.emit('close');
  }

  createProdOverdue() {
    let productOverdue = this.productOverdueGroup.value;
    productOverdue.project_id = this.infoProduct.project_id;
    productOverdue.external_company_id = 1;
    environment.consoleMessage(productOverdue, "Obj Prod Overdue");

    this.productsOverdueService.addProductOverdue(productOverdue)
      .subscribe(res => {
        this.fButtonDisabledProdOverdue = false;
        if (res != null) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
        }
      });
    this.emitClose.emit('close');
  }

  updateProdOverdue() {
    let productOverdue = this.productOverdueGroup.value;

    this.productsOverdueService.updateProductOverdueId(productOverdue, this.infoProduct.idProduct)
    .subscribe((res) => {
      this.fButtonDisabledProdOverdue = false;
      if (res.length != 0) {
        this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
      }
    });
    this.emitClose.emit('close');
  }
}
