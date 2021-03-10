import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Typification } from 'src/app/models/typification';
import { TypificationsService } from 'src/app/services/typifications.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-typifications-form',
  templateUrl: './typifications-form.component.html',
  styleUrls: ['./typifications-form.component.scss']
})
export class TypificationsFormComponent implements OnInit {
  showBtnClose: boolean = true;
  typificationsGroup!: FormGroup;
  pluralOption: string = "Tipificaciones";
  singularOption: string = "Tipificación";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  typification!: Typification;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private typificationsService: TypificationsService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    // environment.consoleMessage(this.data, "++++++++++");
    this.typificationsGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.typificationsService.getTypificationsId(this.data.id)
        .subscribe((res: Typification) => {
          this.typification = res;
          this.typificationsGroup.patchValue({
            title: this.typification.title,
            description: this.typification.description,            
            is_active: this.typification.is_active
          });
        });
    }
  }
  
  onSubmit() {
    // environment.consoleMessage(this.typificationsGroup, "OnSubmit tipo de compañias: ");
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
    this.typificationsGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    // environment.consoleMessage(this.typificationsGroup.value, "createRegister: ");
    this.typificationsService.addTypifications(this.typificationsGroup.value)
      .subscribe((res) => {
        // environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'created') {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
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
          // environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    // environment.consoleMessage(this.typificationsGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.typificationsService.updateTypificationsId(
      this.typificationsGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        // environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          // environment.consoleMessage(err, "Error: ");
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.typificationsGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
