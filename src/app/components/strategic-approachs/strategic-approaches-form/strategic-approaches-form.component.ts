import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StrategicApproach } from 'src/app/models/strategic-approach';
import { StrategicApproachesService } from 'src/app/services/strategic-approaches.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-strategic-approaches-form',
  templateUrl: './strategic-approaches-form.component.html',
  styleUrls: ['./strategic-approaches-form.component.scss']
})
export class StrategicApproachesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  strategicApproachesGroup!: FormGroup;
  pluralOption: string = "Enfoques Estratégicos";
  singularOption: string = "Enfoque Estratégico";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  strategicApproach!: StrategicApproach;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private strategicApproachesService: StrategicApproachesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    // environment.consoleMessage(this.data, "++++++++++");
    this.strategicApproachesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.strategicApproachesService.getStrategicApproachesId(this.data.id)
        .subscribe((res: StrategicApproach) => {
          this.strategicApproach = res;
          this.strategicApproachesGroup.patchValue({
            title: this.strategicApproach.title,
            description: this.strategicApproach.description,            
            is_active: this.strategicApproach.is_active
          });
        });
    }
  }
  
  onSubmit() {
    // environment.consoleMessage(this.strategicApproachesGroup, "OnSubmit tipo de compañias: ");
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
    this.strategicApproachesGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    // environment.consoleMessage(this.strategicApproachesGroup.value, "createRegister: Strategic Approchaes");
    this.strategicApproachesService.addStrategicApproaches(this.strategicApproachesGroup.value)
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
    // environment.consoleMessage(this.strategicApproachesGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.strategicApproachesService.updateStrategicApproachesId(
      this.strategicApproachesGroup.value,
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

    if (this.strategicApproachesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
