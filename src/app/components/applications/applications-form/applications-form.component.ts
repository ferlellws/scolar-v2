import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Application } from 'src/app/models/application';
import { ApplicationsService } from 'src/app/services/applications.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-applications-form',
  templateUrl: './applications-form.component.html',
  styleUrls: ['./applications-form.component.scss']
})
export class ApplicationsFormComponent implements OnInit {
  showBtnClose: boolean = true;
  applicationsGroup!: FormGroup;
  pluralOption: string = "Aplicativos";
  singularOption: string = "Aplicativo";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  application!: Application;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private applicationsService: ApplicationsService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.applicationsGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    
    if (this.data.mode == 'edit') {

      this.applicationsService.getApplicationsId(this.data.id)
        .subscribe((res: Application) => {
          this.application = res;
          this.applicationsGroup.patchValue({
            title: this.application.title,
            description: this.application.description,            
            is_active: this.application.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.applicationsGroup, "OnSubmit fases: ");
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
    this.applicationsGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.applicationsGroup.value, "createRegister: ");
    this.applicationsService.addApplications(this.applicationsGroup.value)
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
    environment.consoleMessage(this.applicationsGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.applicationsService.updateApplicationId(
      this.applicationsGroup.value,
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

    if (this.applicationsGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
