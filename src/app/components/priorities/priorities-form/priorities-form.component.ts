import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Priority } from 'src/app/models/priority';
import { PrioritiesService } from 'src/app/services/priorities.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-priorities-form',
  templateUrl: './priorities-form.component.html',
  styleUrls: ['./priorities-form.component.scss']
})
export class PrioritiesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  prioritiesGroup!: FormGroup;
  pluralOption: string = "Prioridades";
  singularOption: string = "Prioridad";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  priority!: Priority;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private prioritysService: PrioritiesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.prioritiesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.prioritysService.getPrioritiesId(this.data.id)
        .subscribe((res: Priority) => {
          this.priority = res;
          this.prioritiesGroup.patchValue({
            title: this.priority.title,
            description: this.priority.description,            
            is_active: this.priority.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.prioritiesGroup, "OnSubmit prioridades: ");
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
    this.prioritiesGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.prioritiesGroup.value, "createRegister: ");
    this.prioritysService.addPriorities(this.prioritiesGroup.value)
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    environment.consoleMessage(this.prioritiesGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.prioritysService.updatePrioritiesId(
      this.prioritiesGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          environment.consoleMessage(err, "Error: ");
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

    if (this.prioritiesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
