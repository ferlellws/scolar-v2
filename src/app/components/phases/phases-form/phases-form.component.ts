import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Phase } from 'src/app/models/phase';
import { PhasesService } from 'src/app/services/phases.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-phases-form',
  templateUrl: './phases-form.component.html',
  styleUrls: ['./phases-form.component.scss']
})
export class PhasesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  phasesGroup!: FormGroup;
  pluralOption: string = "Fases";
  singularOption: string = "Fase";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  phase!: Phase;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private phasesService: PhasesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    // environment.consoleMessage(this.data, "++++++++++");
    this.phasesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    
    if (this.data.mode == 'edit') {

      this.phasesService.getPhasesId(this.data.id)
        .subscribe((res: Phase) => {
          this.phase = res;
          this.phasesGroup.patchValue({
            title: this.phase.title,
            description: this.phase.description,            
            is_active: this.phase.is_active
          });
        });
    }
  }
  
  onSubmit() {
    // environment.consoleMessage(this.phasesGroup, "OnSubmit fases: ");
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
    this.phasesGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    // environment.consoleMessage(this.phasesGroup.value, "createRegister: ");
    this.phasesService.addPhases(this.phasesGroup.value)
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
    // environment.consoleMessage(this.phasesGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.phasesService.updatePhaseId(
      this.phasesGroup.value,
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

    if (this.phasesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
