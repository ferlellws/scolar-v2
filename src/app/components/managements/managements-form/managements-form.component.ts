import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Management } from 'src/app/models/management';
import { ManagementsService } from 'src/app/services/managements.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-managements-form',
  templateUrl: './managements-form.component.html',
  styleUrls: ['./managements-form.component.scss']
})
export class ManagementsFormComponent implements OnInit {
  showBtnClose: boolean = true;
  managementsGroup!: FormGroup;
  pluralOption: string = "Gestiones";
  singularOption: string = "Gestión";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  management!: Management;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private managementsService: ManagementsService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    true;//environment.consoleMessage(this.data, "++++++++++");
    this.managementsGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.managementsService.getManagementsId(this.data.id)
        .subscribe((res: Management) => {
          this.management = res;
          this.managementsGroup.patchValue({
            title: this.management.title,
            description: this.management.description,            
            is_active: this.management.is_active
          });
        });
    }
  }
  
  onSubmit() {
    true;//environment.consoleMessage(this.managementsGroup, "OnSubmit Gestiones: ");
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
    this.managementsGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    true;//environment.consoleMessage(this.managementsGroup.value, "createRegister: ");
    this.managementsService.addManagements(this.managementsGroup.value)
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    true;//environment.consoleMessage(this.managementsGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.managementsService.updateManagementsId(
      this.managementsGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.managementsGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
