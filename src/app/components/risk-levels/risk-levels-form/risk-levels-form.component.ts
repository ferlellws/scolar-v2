import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RiskLevel } from 'src/app/models/risk-level';
import { RiskLevelsService } from 'src/app/services/risk-levels.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-risk-levels-form',
  templateUrl: './risk-levels-form.component.html',
  styleUrls: ['./risk-levels-form.component.scss']
})
export class RiskLevelsFormComponent implements OnInit {
  showBtnClose: boolean = true;
  riskLevelsGroup!: FormGroup;
  pluralOption: string = "Niveles de Riesgo";
  singularOption: string = "Nivel de Riesgo";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  riskLevel!: RiskLevel;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private riskLevelsService: RiskLevelsService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    true;//environment.consoleMessage(this.data, "++++++++++");
    this.riskLevelsGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.riskLevelsService.getRiskLevelsId(this.data.id)
        .subscribe((res: RiskLevel) => {
          this.riskLevel = res;
          this.riskLevelsGroup.patchValue({
            title: this.riskLevel.title,
            description: this.riskLevel.description,            
            is_active: this.riskLevel.is_active
          });
        });
    }
  }
  
  onSubmit() {
    true;//environment.consoleMessage(this.riskLevelsGroup, "OnSubmit niveles de riesgo: ");
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
    this.riskLevelsGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    true;//environment.consoleMessage(this.riskLevelsGroup.value, "createRegister: ");
    this.riskLevelsService.addRiskLevels(this.riskLevelsGroup.value)
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
    true;//environment.consoleMessage(this.riskLevelsGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.riskLevelsService.updateRiskLevelsId(
      this.riskLevelsGroup.value,
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

    if (this.riskLevelsGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
