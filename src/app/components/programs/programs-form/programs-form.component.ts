import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Program } from 'src/app/models/program';
import { ProgramsService } from 'src/app/services/programs.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-programs-form',
  templateUrl: './programs-form.component.html',
  styleUrls: ['./programs-form.component.scss']
})
export class ProgramsFormComponent implements OnInit {
  showBtnClose: boolean = true;
  programsGroup!: FormGroup;
  pluralOption: string = "Programas";
  singularOption: string = "Programa";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  program!: Program;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private programsService: ProgramsService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.programsGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.programsService.getProgramsId(this.data.id)
        .subscribe((res: Program) => {
          this.program = res;
          this.programsGroup.patchValue({
            title: this.program.title,
            description: this.program.description,            
            is_active: this.program.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.programsGroup, "OnSubmit programas: ");
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
    this.programsGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.programsGroup.value, "createRegister: ");
    this.programsService.addPrograms(this.programsGroup.value)
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
    environment.consoleMessage(this.programsGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.programsService.updateProgramsId(
      this.programsGroup.value,
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

    if (this.programsGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
