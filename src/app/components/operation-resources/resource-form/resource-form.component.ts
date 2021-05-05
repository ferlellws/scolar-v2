import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationFront } from 'src/app/models/operation-front';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  showBtnClose: boolean = true;
  pluralOption: string = "Recurso de Soporte";
  singularOption: string = "Recursos de Soporte";
  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;

  resorucesGroup!: FormGroup;

  selectOperationFronst: OperationFront [] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.resorucesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      manager_id: [null],
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
    this.resorucesGroup.patchValue({
     

    });
  }

  createRegister() {

  }

  updateRegister() {
    
  }

  onClickSelectFront() {

  }
  
  getMessageError(field: string, labelField: string): string {
    let message!: string;
    if (this.resorucesGroup.get(field)?.errors?.pattern) {
      message = `Por favor, ingrese ${labelField} válido`
    }

    if (this.resorucesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
